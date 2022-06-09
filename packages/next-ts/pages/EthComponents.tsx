import { NextPage } from "next";

import { useAccount } from "wagmi";
import Blockies from "react-blockies";
import { IoCopyOutline } from "react-icons/io5";
import { FaEthereum, FaDollarSign } from "react-icons/fa";
import CopyToClipBoard from "react-copy-to-clipboard";
import { useState } from "react";
import { AiOutlineSwap } from "react-icons/ai";

interface IAddress {
    address: string;
}
const Address = ({ address }: IAddress) => {
    //   <Blockies
    //     seed="Jeremy" {/* the only required prop; determines how the image is generated */}
    //     size={10} {/* number of squares wide/tall the image will be; default = 15 */}
    //     scale={3} {/* width/height of each square in pixels; default = 4 */}
    //     color="#dfe" {/* normal color; random by default */}
    //     bgColor="#ffe" {/* background color; random by default */}
    //     spotColor="#abc" {/* color of the more notable features; random by default */}
    //     className="identicon" {/* optional class name for the canvas element; "identicon" by default */}
    //   />

    return (
        <>
            <div className="flex justify-between items-center bd--red border-2 rounded-xl p-1">
                <div className="rounded-xl blockies">
                    <Blockies seed={address.toLowerCase()} size={11} />
                </div>
                <div className="m-2 ">
                    {address.slice(0, 6)}...{address.slice(-4)}
                </div>
                <div className="">
                    <CopyToClipBoard text={address}>
                        <button className="btn btn-ghost text-xl tooltip  tooltip-top" data-tip={address}>
                            <IoCopyOutline />
                        </button>
                    </CopyToClipBoard>
                </div>
            </div>
        </>
    );
};

interface IAddressInput {
    value: string;
    onChange: (arg: any) => void;
}
const AddressInput = ({ value, onChange }: IAddressInput) => {
    return (
        <>
            <div className="form-control">
                <label className="input-group input-group-sm ">
                    <input
                        type="text"
                        placeholder="Enter address"
                        className="input input-bordered input-sm p-1  my-1 placeholder:p-3 "
                        value={value}
                        onChange={(event) => onChange(event.target.value)}
                    />

                    <span className="rounded-md w-10 p-0 bg-base-100 ">
                        <Blockies seed={value.toLowerCase()} size={10} />
                    </span>
                </label>
            </div>
        </>
    );
};

interface IBalance {
    address: string;
}
const Balance = ({ address }: IBalance) => {
    const [toggleBalance, setToggleBalance] = useState(false);
    return (
        <>
            <div className="stats shadow" onClick={() => setToggleBalance(!toggleBalance)}>
                <div className="stat flex flex-col items-center justify-center ">
                    <div className="stat-title text-2xl">
                        {toggleBalance === false ? <FaEthereum /> : <FaDollarSign />}
                    </div>
                    <div className="stat-value">{toggleBalance === false ? 100 : 2000}</div>
                    <div className="stat-desc">
                        {address.slice(0, 6)}...{address.slice(-4)}
                    </div>
                </div>
            </div>
        </>
    );
};

interface IEtherInput {
    value: number;
    onChange: (arg: any) => void;
}
const EtherInput = ({ value, onChange }: IEtherInput) => {
    const [toggleBalance, setToggleBalance] = useState(false);
    return (
        <>
            <div className="form-control ">
                <div className="input-group ">
                    <input
                        type="text"
                        placeholder="Enter eth amount"
                        className="input input-bordered"
                        onChange={(e) => onChange(+e.target.value)}
                        value={value}
                    />
                    <button className="btn  btn-secondary ">
                        <AiOutlineSwap />
                        eth
                    </button>
                </div>
            </div>
        </>
    );
};
interface IBlockie {
    address: string;
    scale: number;
}
const Blockie = ({ address, scale }: IBlockie) => {
    return (
        <>
            <div className=" blockies ">
                <Blockies seed={address.toLowerCase()} size={scale} />
            </div>
        </>
    );
};

const EthComponents: NextPage = () => {
    const { data } = useAccount();
    const [addressValue, setAddressValue] = useState<string>("");
    const [ethValue, setEthValue] = useState<number>(0);
    return (
        <>
            <h1 className="m-2 text-2xl font-medium ml-[40%]">Eth Components</h1>
            <div className="flex flex--col justify-start items-center flex-wrap">
                {/* Address component */}
                <div className="card  card-bordered shadow-md border-base-200 w-[30%]">
                    <h2 className="card-title justify-center">Address</h2>
                    <div className="card-body">
                        <Address address={data?.address as string} />
                    </div>
                </div>

                {/* Address input component */}
                <div className="m-4 card  card-bordered shadow-md border-base-200 w-[30%]">
                    <h2 className="card-title justify-center">Address Input</h2>
                    <div className="card-body">
                        <AddressInput value={addressValue} onChange={setAddressValue} />
                    </div>
                </div>

                {/* Balance component */}
                <div className="m-4 card  card-bordered shadow-md border-base-200 w-[30%] ">
                    <h2 className="card-title justify-center">Balance</h2>
                    <div className="card-body">
                        <Balance address={data?.address as string} />
                    </div>
                </div>

                {/* Ether input component */}
                <div className="m-4 card  card-bordered shadow-md border-base-200 w-[30%] ">
                    <h2 className="card-title justify-center">Ether Input</h2>
                    <div className="card-body">
                        <EtherInput value={ethValue} onChange={setEthValue} />
                    </div>
                </div>

                {/*Blockie component */}
                <div className="m-4 card  card-bordered shadow-md border-base-200 w-[30%]   ">
                    <h2 className="card-title justify-center">Blockie</h2>
                    <div className="card-body  flex flex-col items-center justify-end">
                        <div className="w-12 ">
                            <Blockie address={data?.address as string} scale={20} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default EthComponents;
