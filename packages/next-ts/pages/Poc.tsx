import { ethers } from "ethers";
import { formatEther, parseEther } from "ethers/lib/utils";
import React, { ReactElement, useEffect } from "react";
import { useAccount, useFeeData, useProvider } from "wagmi";

import Balance from "../components/EthComponents/Balance";
import useAppLoadContract from "../hooks/useAppLoadContract";
import useDexPrice from "../hooks/useDexPrice";
import { useStore } from "../store/useStore";

//   TO GET ENS NAME FROM ADDRESS
//     const mainnetScaffoldEthProvider = new StaticJsonRpcProvider("https://rpc.scaffoldeth.io:48544");
//     const addressname = await mainnetScaffoldEthProvider.lookupAddress("0x378D26155E4F3a5c24240aB2199616aadfbD4bCa");
//     console.log("addressname: ", addressname);

export default function PocPage(): ReactElement {
  // const { ethPrice, usdPrice } = useDexPrice();
  // console.log("ethPrice: ", ethPrice, usdPrice);
  const { data, isSuccess } = useAccount();
  const provider = useProvider();
  const [state, dispatch] = useStore();
  console.log("state: ", state);
  const { ethPrice } = state;

  // const loadBalance = async (): Promise<any> => {
  //   const balance = await provider.getBalance(data?.address as string);
  //   console.log("balance: ", formatEther(balance.toString()));
  //   const bl = +formatEther(balance.toString());
  //   console.log("in doller: ", bl * ethPrice);
  // };
  // useEffect(() => {
  //   void loadBalance();
  // }, [ethPrice]);

  // create a randome wallet and send money
  const { data: feeData, isSuccess: feeIsSuccess } = useFeeData({ formatUnits: "ether" });
  console.log("feeData: ", feeData?.gasPrice?._hex);
  const YourContract = useAppLoadContract({ contractName: "YourContract" });
  const { data: accountData } = useAccount();

  const test = async (): Promise<void> => {
    // const estimateGasfee = (await YourContract?.estimateGas.setPurpose("cool")) as BigNumberish;
    // console.log("estimateGasfee: ", estimateGasfee);
    // // console.log("data: ", ethers.utils.formatUnits(data, "ether"));
    // const gasPrice = BigNumber.from(estimateGasfee);
    // console.log("gasPrice: ", formatEther(gasPrice));
    // const txGas = ethers.utils.formatEther(gasPrice.add(BigNumber.from(feeData?.gasPrice?._hex)));
    // console.log("txGas: ", txGas);
    // const tx = await YourContract?.setPurpose("cool");
    // console.log("gasPrice: ", gasPrice.mul(BigNumber.from(feeData?.gasPrice?._hex)));
    // const gasUnit = parseInt(ethers.utils.formatUnits(data, "gwai"));
    // const estimateGas = parseFloat(feeData?.formatted.gasPrice as string);
    // console.log("feeData?.formatted.gasPrice: ", estimateGas * gasUnit);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div>eth price : {ethPrice}</div>
        <div>
          {isSuccess && <Balance price={ethPrice as number} address={data?.address as string} provider={provider} />}
        </div>
      </div>
    </>
  );
}
