import { formatEther } from "ethers/lib/utils";
import { useEffect } from "react";
import { useAccount, useProvider } from "wagmi";

import Balance from "../components/EthComponents/Balance";
import useDexPrice from "../hooks/useDexPrice";

export default function PocPage(): JSX.Element {
  const { ethPrice, usdPrice } = useDexPrice();
  console.log("ethPrice: ", ethPrice, usdPrice);
  const { data, isSuccess } = useAccount();
  const provider = useProvider();
  const loadBalance = async (): Promise<any> => {
    const balance = await provider.getBalance(data?.address as string);
    console.log("balance: ", formatEther(balance.toString()));
    const bl = +formatEther(balance.toString());
    console.log("in doller: ", bl * ethPrice);
  };
  useEffect(() => {
    void loadBalance();
  }, [ethPrice]);
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div>eth price : {ethPrice}</div>
        <div>{isSuccess && <Balance address={data?.address as string} />}</div>
      </div>
    </>
  );
}
