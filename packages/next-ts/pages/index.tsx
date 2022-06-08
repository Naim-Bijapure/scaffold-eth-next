import type { NextPage } from "next";
import { useEffect, useState } from "react";
import {
    useAccount,
    useFeeData,
    useContractRead,
    useContract,
    useProvider,
    useSigner,
    useSendTransaction,
    useNetwork,
} from "wagmi";
import { BigNumber, ethers } from "ethers";

import { YourContract } from "../generated/contract-types";
import contracts from "../generated/hardhat_contracts.json";

const Home: NextPage = () => {
    // const { data, isLoading } = useAccount();
    const [purpose, setPurpose] = useState<string>("");
    const [readContract, setReadContract] = useState<any>();

    // const { data, isError, isLoading } = useFeeData();
    // console.log("data: ", data);

    // on individual read
    // const { data, isError, isLoading } = useContractRead(
    //     {
    //         addressOrName: contracts[31337][0]["contracts"].YourContract.address,
    //         contractInterface: contracts[31337][0]["contracts"].YourContract.abi,
    //     },
    //     "purpose"
    // );

    const provider = useProvider();
    const signer = useSigner();

    const yourContract = useContract<YourContract>({
        addressOrName: contracts[31337][0]["contracts"].YourContract.address,
        contractInterface: contracts[31337][0]["contracts"].YourContract.abi,
        signerOrProvider: signer.data,
    });

    const { data } = useAccount();
    console.log("data: ", data?.address);

    // const sendTx = useSendTransaction({ request: { to: data?.address, value: BigNumber.from("1000000000000000000") } });
    // console.log("sendTx: ", sendTx);
    // useEffect(() => {}, []);

    const { activeChain, chains, error, isLoading, pendingChainId, switchNetwork } = useNetwork();
    console.log("activeChain: ", activeChain);

    const onTest = async () => {
        // let balance = await burner.signer?.getBalance();
        // console.log("balance: ", balance);
        // let localProvider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
        // let burnerSigner = localProvider.getSigner(0);
        // console.log("data: ", await burnerSigner.getAddress());
        // let balance = await burnerSigner.getBalance();
        // console.log("balance: ", balance.toString());
        // await burnerSigner.sendTransaction({ to: data?.address, value: ethers.utils.parseEther("1") });
        // window.location.reload();
    };

    return (
        <>
            <main className="flex justify-center ">
                <div className="m-2 card shadow-md w-1/3 border-2">
                    <div className="card-body ">
                        <span className="card-title ">YourContract</span>
                        <input
                            type={"text"}
                            className=" input input-primary"
                            placeholder="set purpose"
                            value={purpose}
                            onChange={(event) => setPurpose(event.target.value)}
                        />

                        <div className="card-actions">
                            <button
                                className="btn btn-primary"
                                onClick={async () => {
                                    console.log("purpose", purpose);
                                    let data = await yourContract.purpose();
                                    console.log("data: ", data);
                                    // const tx = await yourContract.setPurpose(purpose);
                                    // const rcpt = await tx.wait();
                                    // console.log('rcpt: ', rcpt);
                                }}
                            >
                                submit
                            </button>

                            <button className="btn btn-primary" onClick={onTest}>
                                Test
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Home;
