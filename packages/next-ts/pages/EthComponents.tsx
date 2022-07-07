import { NextPage } from "next";
import { useState } from "react";
import { useAccount, useProvider } from "wagmi";

import Address from "../components/EthComponents/Address";
import AddressInput from "../components/EthComponents/AddressInput";
import Balance from "../components/EthComponents/Balance";
import Blockie from "../components/EthComponents/Blockie";
import EtherInput from "../components/EthComponents/EtherInput";
import PunkBlockie from "../components/EthComponents/PunkBlockie";
import { useStore } from "../store/useStore";

const EthComponents: NextPage = () => {
  const { data } = useAccount();
  const [addressValue, setAddressValue] = useState<string>("");
  const [ethValue, setEthValue] = useState<number>();
  const provider = useProvider();

  const [state, dispatch] = useStore();

  const { ethPrice } = state;

  return (
    <>
      <h1 className="m-2 text-2xl font-medium ml-[40%]">Eth Components</h1>
      <div className="flex flex-wrap items-center justify-around flex--col">
        {/* Address component */}
        <div className="shadow-md card card-bordered border-base-200 lg:w-[30%]">
          <h2 className="mx-4 card-title">Address</h2>
          <div className="card-body">
            <Address address={data?.address as string} />
          </div>
        </div>

        {/* Address input component */}
        <div className="m-4 shadow-md card card-bordered border-base-200 lg:w-[30%]">
          <h2 className="mx-4 card-title">Address Input</h2>
          <div className="card-body">
            <AddressInput value={addressValue} onChange={setAddressValue} />
          </div>
        </div>

        {/* Balance component */}
        <div className="m-4 shadow-md card card-bordered border-base-200 lg:w-[30%]">
          <h2 className="mx-4 card-title">Balance</h2>
          <div className="card-body">
            <Balance address={data?.address as string} provider={provider} price={ethPrice as number} />
          </div>
        </div>

        {/* Ether input component */}
        <div className="m-4 shadow-md card card-bordered border-base-200 lg:w-[30%]">
          <h2 className="mx-4 card-title">Ether Input</h2>
          <div className="card-body">
            <EtherInput value={ethValue as number} onChange={setEthValue} price={ethPrice as number} />
          </div>
        </div>

        {/* Blockie component */}
        <div className="m-4 shadow-md card card-bordered border-base-200 lg:w-[30%]">
          <h2 className="mx-4 card-title">Blockie</h2>
          <div className="flex flex-col items-center justify-end card-body">
            <div className="w--12 ">
              <Blockie address={data?.address as string} scale={20} />
            </div>
          </div>
        </div>

        {/* punk blockie component */}
        <div className="m-4 shadow-md card card-bordered border-base-200 lg:w-[30%]">
          <h2 className="mx-4 card-title">Punk Blockie</h2>
          <div className="flex flex-col items-center justify-center card-body">
            <div className=" ">
              <PunkBlockie address={data?.address as string} scale={20} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EthComponents;
