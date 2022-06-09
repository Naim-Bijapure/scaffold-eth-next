import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";

import transcactor, { ContractTransactionType } from "../functions/transcaction";
import useAppLoadContract from "../hooks/useAppLoadContract";

const Home: NextPage = () => {
    // const { data, isLoading } = useAccount();
    const [purpose, setPurpose] = useState<string>("");
    const [contractPurpose, setContractPurpose] = useState<string>("");

    // const { data, isLoading } = useAccount();

    const YourContract = useAppLoadContract({
        contractName: "YourContract1",
    });

    const getPurpose = async () => {
        let purpose = await YourContract?.purpose();
        console.log("YourContract: ", YourContract);
        setContractPurpose(purpose as string);
    };

    const updateContractPurpose = async () => {
        let rcpt = await transcactor(YourContract?.setPurpose as ContractTransactionType, [purpose]);
        console.log("rcpt: ", rcpt);
        setContractPurpose(purpose);
    };

    useEffect(() => {
        void getPurpose();
    }, [YourContract]);

    const onTest = async () => {
        let propose = YourContract && (await YourContract.purpose());
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
    // const notify = () => toast(<NotificationMsg />, { autoClose: false });
    return (
        <>
            <main className="flex flex-col justify-center  items-center ">
                <div className="m-2 card shadow-md w-1/3 border-2">
                    <div className="card-body ">
                        <span className="card-title ">YourContract</span>
                        <span>purpose: {contractPurpose && contractPurpose}</span>
                        <input
                            type={"text"}
                            className=" input input-primary"
                            placeholder="set purpose"
                            value={purpose}
                            onChange={(event) => setPurpose(event.target.value)}
                        />

                        <div className="card-actions">
                            <button className="btn btn-primary" onClick={updateContractPurpose}>
                                submit
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Home;
