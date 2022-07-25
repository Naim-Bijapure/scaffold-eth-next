import { ethers } from "ethers";
import { formatEther } from "ethers/lib/utils";
import React, { useEffect, useState } from "react";
import Blockies from "react-blockies";
import CopyToClipBoard from "react-copy-to-clipboard";
import { FaDollarSign, FaEthereum } from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";

interface IAddress {
  address: string;
  price: number;
  isBalance: boolean;
  provider: ethers.providers.BaseProvider;
}
const Address = ({ address, price, isBalance, provider }: IAddress): any => {
  const [toggleBalance, setToggleBalance] = useState(false);
  const [usdBalance, setUsdBalance] = useState(0);
  const [ethBalance, setEthBalance] = useState(0);

  const loadBalance = async (): Promise<any> => {
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
      <div className="flex items-center justify-between p-1 border-2 border-base-200 rounded-xl">
        <div className="rounded-xl blockies">
          <Blockies seed={address ? address?.toLowerCase() : "aaaaa"} size={11} />
        </div>
        <div className="m-2 ">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </div>
        <div className="">
          <CopyToClipBoard text={address}>
            {/* <button className="text-xl btn btn-ghost tooltip tooltip-top tooltip-info tooltip--open" data-tip={address}> */}
            <button className="text-xl btn btn-ghost">
              <IoCopyOutline />
            </button>
          </CopyToClipBoard>
        </div>

        {isBalance && (
          <div
            className="flex items-center self-stretch justify-center w-24 cursor-pointer  bg-base-200"
            onClick={(): any => setToggleBalance(!toggleBalance)}>
            <div className="flex items-center justify-center   ">
              <span className="mb-1 text-xs">{toggleBalance === false ? <FaEthereum /> : <FaDollarSign />}</span>
              {toggleBalance === false ? ethBalance.toFixed(2) : usdBalance.toFixed(2)}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Address;
