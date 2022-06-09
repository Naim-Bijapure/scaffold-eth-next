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
import { BigNumber, ContractFactory, ContractInterface, ethers } from "ethers";

import {
    YourContract,
    YourContract1,
    YourContract1__factory,
    YourContract__factory,
} from "../generated/contract-types";
import contractsJson from "../generated/hardhat_contracts.json";

let ContractsConfig = {
    YourContract: { factory: YourContract__factory, json: contractsJson },
    YourContract1: { factory: YourContract1__factory, json: contractsJson },
} as const;

type contractNameType = keyof typeof ContractsConfig;

const useAppLoadContract = ({
    contractName,
    // signer,
    chainId,
}: {
    contractName: contractNameType;
    // signer: any;
    chainId: number;
}) => {
    type factoryConnectType = typeof ContractsConfig[typeof contractName]["factory"]["connect"];
    type contractType = NonNullable<ReturnType<factoryConnectType>>;

    const signer = useSigner();

    const contract = useContract<contractType>({
        addressOrName: ContractsConfig[contractName]["json"][chainId][0]["contracts"][contractName]["address"],
        contractInterface: ContractsConfig[contractName].factory.abi,
        signerOrProvider: signer.data,
    });

    return contract;
};

const Home: NextPage = () => {
    // const { data, isLoading } = useAccount();
    const [purpose, setPurpose] = useState<string>("");
    const [readContract, setReadContract] = useState<any>();

    const provider = useProvider();
    const signer = useSigner();

    const { data } = useAccount();

    // const sendTx = useSendTransaction({ request: { to: data?.address, value: BigNumber.from("1000000000000000000") } });

    const { activeChain, chains, error, isLoading, pendingChainId, switchNetwork } = useNetwork();
    const YourContract = useAppLoadContract({
        contractName: "YourContract1",
        chainId: Number(activeChain?.id),
    });

    const onTest = async () => {
        let propose = await YourContract.purpose();
        console.log("propose: ", propose);
        // let balance = await burner.signer?.getBalance();
        //
        // let localProvider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
        // let burnerSigner = localProvider.getSigner(0);
        //
        // let balance = await burnerSigner.getBalance();
        //
        // await burnerSigner.sendTransaction({ to: data?.address, value: ethers.utils.parseEther("1") });
        // window.location.reload();
        // if (switchNetwork) {
        //     switchNetwork(4);
        // }
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
                                    let data = await yourContract.purpose();

                                    // const tx = await yourContract.setPurpose(purpose);
                                    // const rcpt = await tx.wait();
                                    //
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
