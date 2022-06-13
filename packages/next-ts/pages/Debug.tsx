import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";

import transcactor, { ContractTransactionType } from "../functions/transcactor";
import useAppLoadContract from "../hooks/useAppLoadContract";
import Address from "../components/EthComponents/Address";

const Debug: NextPage = () => {
    const [purpose, setPurpose] = useState<string>("");
    const [contractPurpose, setContractPurpose] = useState<string>("");

    // const { data, isLoading } = useAccount();

    const YourContract = useAppLoadContract({
        contractName: "YourContract",
    });

    const getPurpose = useCallback(async () => {
        let purpose = await YourContract?.purpose();
        setContractPurpose(purpose as string);
    }, [YourContract]);

    const updateContractPurpose = async () => {
        let rcpt = await transcactor(YourContract?.setPurpose as ContractTransactionType, [purpose]);
        console.log("rcpt: ", rcpt);
        setContractPurpose(purpose);
    };

    useEffect(() => {
        void getPurpose();
    }, [YourContract, getPurpose]);

    return (
        <>
            <main className="flex flex-col justify-center  items-center ">
                <div className="m-2 card shadow-md lg:w-1/3 border-2 ">
                    <div className="card-body ">
                        <span className="card-title flex justify-between ">
                            <div>YourContract</div>
                            <div className="text-sm">
                                <Address address={YourContract?.address as string} />
                            </div>
                        </span>
                        <input
                            type={"text"}
                            className=" input input-primary"
                            placeholder="set purpose"
                            value={purpose}
                            onChange={(event) => setPurpose(event.target.value)}
                        />

                        <span className="m-2 w-full flex items-center justify-start   ">
                            <span className="font-medium lg:w-[30%]">PURPOSE :</span>
                            <span className="bg-base-200 p-1 lg:w-[70%] text-center rounded-lg  ">
                                {contractPurpose && contractPurpose}
                            </span>
                        </span>

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

export default Debug;
