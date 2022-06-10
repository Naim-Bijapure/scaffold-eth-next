import { NextPage } from "next";

import { useState } from "react";
import { useAccount } from "wagmi";
import Address from "../components/EthComponents/Address";
import AddressInput from "../components/EthComponents/AddressInput";
import Balance from "../components/EthComponents/Balance";
import Blockie from "../components/EthComponents/Blockie";
import EtherInput from "../components/EthComponents/EtherInput";
import PunkBlockie from "../components/EthComponents/PunkBlockie";

const EthComponents: NextPage = () => {
    const { data } = useAccount();
    const [addressValue, setAddressValue] = useState<string>("");
    const [ethValue, setEthValue] = useState<number>(0);
    return (
        <>
            <h1 className="m-2 text-2xl font-medium ml-[40%]">Eth Components</h1>
            <div className="flex flex--col justify-around items-center flex-wrap">
                {/* Address component */}
                <div className="card  card-bordered shadow-md border-base-200 lg:w-[30%]">
                    <h2 className="card-title  mx-4">Address</h2>
                    <div className="card-body">
                        <Address address={data?.address as string} />
                    </div>
                </div>

                {/* Address input component */}
                <div className="m-4 card  card-bordered shadow-md border-base-200 lg:w-[30%] ">
                    <h2 className="card-title mx-4">Address Input</h2>
                    <div className="card-body">
                        <AddressInput value={addressValue} onChange={setAddressValue} />
                    </div>
                </div>

                {/* Balance component */}
                <div className="m-4 card  card-bordered shadow-md border-base-200 lg:w-[30%] ">
                    <h2 className="card-title mx-4">Balance</h2>
                    <div className="card-body">
                        <Balance address={data?.address as string} />
                    </div>
                </div>

                {/* Ether input component */}
                <div className="m-4 card  card-bordered shadow-md border-base-200 lg:w-[30%]  ">
                    <h2 className="card-title mx-4">Ether Input</h2>
                    <div className="card-body">
                        <EtherInput value={ethValue} onChange={setEthValue} />
                    </div>
                </div>

                {/*Blockie component */}
                <div className="m-4 card  card-bordered shadow-md border-base-200  lg:w-[30%]  ">
                    <h2 className="card-title mx-4">Blockie</h2>
                    <div className="card-body  flex flex-col items-center justify-end">
                        <div className="w--12 ">
                            <Blockie address={data?.address as string} scale={20} />
                        </div>
                    </div>
                </div>

                {/*punk blockie component */}
                <div className="m-4 card  card-bordered shadow-md border-base-200  lg:w-[30%]  ">
                    <h2 className="card-title mx-4">Punk Blockie</h2>
                    <div className="card-body  flex flex-col items-center justify-center">
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
