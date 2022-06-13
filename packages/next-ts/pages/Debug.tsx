/* eslint-disable @typescript-eslint/no-misused-promises */
import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";

import Address from "../components/EthComponents/Address";
import transcactor, { ContractTransactionType } from "../functions/transcactor";
import useAppLoadContract from "../hooks/useAppLoadContract";

const Debug: NextPage = () => {
  const [purpose, setPurpose] = useState<string>("");
  const [contractPurpose, setContractPurpose] = useState<string>("");

  // const { data, isLoading } = useAccount();

  const YourContract = useAppLoadContract({
    contractName: "YourContract",
  });

  const getPurpose = useCallback(async () => {
    const purpose = await YourContract?.purpose();
    setContractPurpose(purpose as string);
  }, [YourContract]);

  const updateContractPurpose = async (): Promise<any> => {
    const rcpt = await transcactor(YourContract?.setPurpose as ContractTransactionType, [purpose]);
    console.log("rcpt: ", rcpt);
    setContractPurpose(purpose);
  };

  useEffect(() => {
    void getPurpose();
  }, [YourContract, getPurpose]);

  return (
    <>
      <main className="flex flex-col items-center justify-center">
        <div className="m-2 border-2 shadow-md card lg:w-1/3">
          <div className="card-body ">
            <span className="flex justify-between card-title">
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
              onChange={(event): any => setPurpose(event.target.value)}
            />

            <span className="flex items-center justify-start w-full m-2">
              <span className="font-medium lg:w-[30%]">PURPOSE :</span>
              <span className="p-1 text-center rounded-lg bg-base-200 lg:w-[70%]">
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
