import { Token } from "@uniswap/sdk-core";
// @ts-ignore
import IUniswapV3Pool from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
import { Pool } from "@uniswap/v3-sdk";
import { ContractInterface, ethers } from "ethers";
import { useEffect, useRef, useState } from "react";

interface Immutables {
  factory: string;
  token0: string;
  token1: string;
  fee: number;
  tickSpacing: number;
  maxLiquidityPerTick: number;
}

interface State {
  liquidity: ethers.BigNumber;
  sqrtPriceX96: ethers.BigNumber;
  tick: number;
  observationIndex: number;
  observationCardinality: number;
  observationCardinalityNext: number;
  feeProtocol: number;
  unlocked: boolean;
}

const useDexPrice = (): { ethPrice: number; usdPrice: number } => {
  const [ethPrice, setEthPrice] = useState<number>(0);
  const [usdPrice, setUsdPrice] = useState<number>(0);
  const [toggle, setToggle] = useState<boolean>(false);

  const ethPriceRef = useRef<number>(0);
  const usdPriceRef = useRef<number>(0);

  async function getPoolState(poolContract: ethers.Contract): Promise<State> {
    const [liquidity, slot] = await Promise.all([poolContract.liquidity(), poolContract.slot0()]);

    const PoolState: State = {
      liquidity,
      sqrtPriceX96: slot[0],
      tick: slot[1],
      observationIndex: slot[2],
      observationCardinality: slot[3],
      observationCardinalityNext: slot[4],
      feeProtocol: slot[5],
      unlocked: slot[6],
    };

    return PoolState;
  }

  async function getPoolImmutables(poolContract: ethers.Contract): Promise<Immutables> {
    const [factory, token0, token1, fee, tickSpacing, maxLiquidityPerTick] = await Promise.all([
      poolContract.factory(),
      poolContract.token0(),
      poolContract.token1(),
      poolContract.fee(),
      poolContract.tickSpacing(),
      poolContract.maxLiquidityPerTick(),
    ]);

    const immutables: Immutables = {
      factory,
      token0,
      token1,
      fee,
      tickSpacing,
      maxLiquidityPerTick,
    };
    return immutables;
  }

  const fetchEthPrice = async (): Promise<any> => {
    //     uniswap sdk

    // const poolAddress = process.env.NEXT_PUBLIC_UNISWAP_POOL_ADDRESS as string;
    const poolAddress = "0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8";

    const IUniswapV3PoolABI = IUniswapV3Pool.abi;

    const provider = new ethers.providers.JsonRpcProvider("https://rpc.scaffoldeth.io:48544");

    const poolContract = new ethers.Contract(poolAddress, IUniswapV3PoolABI as ContractInterface, provider);

    const [immutables, state] = await Promise.all([getPoolImmutables(poolContract), getPoolState(poolContract)]);

    const TokenA = new Token(3, immutables.token0, 6, "USDT", "USD Coin");

    const TokenB = new Token(3, immutables.token1, 18, "WETH", "Wrapped Ether");

    const WETH_USDC_POOL = new Pool(
      TokenA,
      TokenB,
      immutables.fee,
      state.sqrtPriceX96.toString(),
      state.liquidity.toString(),
      state.tick
    );
    const fetchedUsdPrice = +WETH_USDC_POOL.token0Price.toSignificant(6);
    const fetchedEthPrice = +WETH_USDC_POOL.token1Price.toSignificant(6);
    //     console.log("usdPrice: ", fetchedUsdPrice);
    //     console.log("ethPrice: ", fetchedEthPrice);

    /** ----------------------
     * update state only on price change
     * ---------------------*/
    if (fetchedEthPrice !== ethPriceRef.current) {
      // console.log("price changed... ");
      ethPriceRef.current = fetchedEthPrice;
      usdPriceRef.current = fetchedUsdPrice;
      setToggle((preToggle) => !preToggle);
      void fetchEthPrice();
    } else {
      // if no price changed call again same function recursively
      setTimeout(() => {
        void fetchEthPrice();
      }, 10000);
    }
  };

  const fetchPollInterval = (): any => {
    void fetchEthPrice();
  };

  /** ----------------------
   * update state on price change
   * ---------------------*/
  useEffect(() => {
    if (ethPriceRef.current !== 0) {
      setEthPrice(ethPriceRef.current);
      setUsdPrice(usdPriceRef.current);
      // caching the state in local storage
      localStorage.setItem(
        "dexPrice",
        JSON.stringify({ ethPrice: ethPriceRef.current, usdPrice: usdPriceRef.current })
      );
    }

    if (ethPriceRef.current === 0) {
      // reusing the previous eth prices value if available
      const dexPriceLocaldata = localStorage.getItem("dexPrice");
      if (dexPriceLocaldata !== null) {
        const dexPrice: { ethPrice: number; usdPrice: number } = JSON.parse(dexPriceLocaldata);
        setEthPrice(dexPrice["ethPrice"]);
        setUsdPrice(dexPrice["usdPrice"]);
      }
    }
  }, [toggle]);

  /** ----------------------
   * call polling interval
   * ---------------------*/
  useEffect(() => {
    fetchPollInterval();
  }, []);

  return { ethPrice, usdPrice };
};

export default useDexPrice;
