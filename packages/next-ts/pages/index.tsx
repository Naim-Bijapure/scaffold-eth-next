import { BigNumberish } from "ethers";
import { formatEther } from "ethers/lib/utils";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";

import useAppLoadContract from "../hooks/useAppLoadContract";

const Home: NextPage = () => {
    // const { data, isLoading } = useAccount();
    const [purpose, setPurpose] = useState<string>("");
    const [contractPurpose, setContractPurpose] = useState<string>("");

    const { data: accountData, isLoading } = useAccount();
    const { data } = useBalance({ addressOrName: accountData?.address });

    const YourContract = useAppLoadContract({
        contractName: "YourContract1",
    });

    const getPurpose = async () => {
        let purpose = await YourContract?.purpose();
        console.log("YourContract: ", YourContract);
        setContractPurpose(purpose as string);
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
            <main className="m-2 lg:mx-4 flex flex-col items-start justify-center ">
                <div className="m-2">
                    <span className="mx-2">📝</span>
                    This Is Your App Home. You can start editing it in
                    <span className="highight">/pages </span> folder
                </div>

                <div className="m-2">
                    <span className="mx-2">✏️</span>
                    Edit your smart contract <span className="bg-base-200 mx-2">YourContract.sol</span> in{" "}
                    <span className="highight">packages/foundry-hardat-ts/src</span>
                </div>
                {!contractPurpose ? (
                    <div className="m-2">
                        <span className="mx-2">👷‍♀️</span>
                        You haven't deployed your contract yet, run
                        <span className="bg-base-200 mx-2">yarn chain</span> and{" "}
                        <span className="bg-base-200 mx-2">yarn deploy</span> to deploy your first contract!
                    </div>
                ) : (
                    <div className="m-2">
                        <span className="mx-2">🤓</span>
                        The "purpose" variable from your contract is{" "}
                        <span className="bg-base-200 mx-2">{contractPurpose}</span>
                    </div>
                )}

                <div className="m-2">
                    <span className="mx-2">🤖</span>
                    An example to get your balance from wagmi hooks for your account address
                    <span className="bg-base-200 mx-2">{accountData?.address}</span>
                    balance :{" "}
                    <span className="bg-base-200 mx-2">{data && formatEther(data?.value as BigNumberish)} eth</span>
                </div>
                <div className="m-2">
                    <span className="mx-2">💭</span>
                    Check out the{" "}
                    <Link href={"/Hints"}>
                        <span className="link link-primary">Hints</span>
                    </Link>{" "}
                    tab for more tips.
                </div>
                <div className="m-2">
                    <span className="m-2">🛠</span>
                    Tinker with your smart contract using the
                    <Link href={"/Debug"}>
                        <span className="link link-primary mx-2">Debug</span>
                    </Link>{" "}
                    tab.
                </div>
            </main>
        </>
    );
};

export default Home;
