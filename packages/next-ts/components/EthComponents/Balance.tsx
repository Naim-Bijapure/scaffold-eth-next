import { ethers } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { useEffect, useState } from "react";
import { FaDollarSign, FaEthereum } from "react-icons/fa";

interface IBalance {
  address: string;
  price: number;
  provider: ethers.providers.BaseProvider;
}
const Balance = ({ address, price, provider }: IBalance): any => {
  const [toggleBalance, setToggleBalance] = useState(false);
  const [usdBalance, setUsdBalance] = useState(0);
  const [ethBalance, setEthBalance] = useState(0);

  const loadBalance = async (): Promise<any> => {
    console.log("address: ", address);
    if (address !== undefined) {
      const ethBalance = await provider.getBalance(address);
      const formatedBalance = +formatEther(ethBalance.toString());
      setEthBalance(formatedBalance);
      const usdBalance = formatedBalance * price;
      setUsdBalance(usdBalance);
    }
  };
  useEffect(() => {
    void loadBalance();
  }, [price]);

  return (
    <>
      <div className="shadow cursor-pointer stats" onClick={(): any => setToggleBalance(!toggleBalance)}>
        <div className="flex flex-col items-center justify-center stat">
          <div className="text-2xl stat-title">{toggleBalance === false ? <FaEthereum /> : <FaDollarSign />}</div>
          <div className=" stat-value">{toggleBalance === false ? ethBalance.toFixed(2) : usdBalance.toFixed(2)}</div>
          <div className="stat-desc">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Balance;
