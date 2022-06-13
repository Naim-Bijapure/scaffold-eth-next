import { Token } from "@uniswap/sdk-core";
import IUniswapV3Pool from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
import { Pool } from "@uniswap/v3-sdk";
import { ethers } from "ethers";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useEffect } from "react";

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

export default function PocPage({ data }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  //

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

  const loadProvider = async (): Promise<any> => {
    //   to get ens name from address
    //     const mainnetScaffoldEthProvider = new StaticJsonRpcProvider("https://rpc.scaffoldeth.io:48544");
    //     const addressname = await mainnetScaffoldEthProvider.lookupAddress("0x378D26155E4F3a5c24240aB2199616aadfbD4bCa");
    //     console.log("addressname: ", addressname);

    //     uniswap sdk

    const poolAddress = process.env.NEXT_PUBLIC_UNISWAP_POOL_ADDRESS as string;
    const IUniswapV3PoolABI = IUniswapV3Pool.abi;

    const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_MAINNET);

    const poolContract = new ethers.Contract(poolAddress, IUniswapV3PoolABI, provider);

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
    console.log("usdc price", WETH_USDC_POOL.token0Price.toSignificant(6));
    console.log("weth price", WETH_USDC_POOL.token1Price.toSignificant(6));
  };

  useEffect(() => {
    console.log("cool", (process.env.NEXT_PUBLIC_TARGET_NETWORKS as string).split(","));
    void loadProvider();
  }, []);
  return (
    <>
      <div>cool</div>
    </>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext): any {
  return {
    props: {
      data: "cool",
    },
  };
}
