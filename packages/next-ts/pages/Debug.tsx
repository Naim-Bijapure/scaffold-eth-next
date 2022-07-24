import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { DebugContract } from "debug-eth-contract";

// import DebugContract from "../components/DebugContract";
import useAppLoadContract from "../hooks/useAppLoadContract";

import { YourContract } from "../contracts/contract-types";

const Debug: NextPage = () => {
  const [purpose, setPurpose] = useState<string>("");
  const [loadedContracts, setLoadedContracts] = useState<any[]>();
  const [contractPurpose, setContractPurpose] = useState<string>("");

  const contractName = "YourContract";
  const loadedContract = useAppLoadContract({
    contractName: contractName,
  });

  const contractsData = [
    { contractName: "YourContract", contract: loadedContract as YourContract },
    { contractName: "YourContract", contract: loadedContract as YourContract },
  ];

  useEffect(() => {
    if (loadedContract !== undefined) {
      setLoadedContracts(contractsData);
    }
  }, [loadedContract]);

  return (
    <>
      <main className="flex items-center justify-center flex--col">
        <div className="w-[70%]">
          <DebugContract contracts={loadedContract as any} />
        </div>
      </main>
    </>
  );
};

export default Debug;
