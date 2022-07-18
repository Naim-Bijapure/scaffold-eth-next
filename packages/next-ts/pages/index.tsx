import type { NextPage } from "next";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";

import useAppLoadContract from "../hooks/useAppLoadContract";

const Home: NextPage = () => {
  const [contractPurpose, setContractPurpose] = useState<string>("");

  const { data: accountData, isLoading, isSuccess, status, isFetched } = useAccount();
  console.log("isSuccess: ", accountData, isSuccess, isFetched);
  const { data } = useBalance({ addressOrName: accountData?.address });

  const YourContract = useAppLoadContract({
    contractName: "YourContract",
  });

  const getPurpose = useCallback(async () => {
    const purpose = await YourContract?.purpose();
    setContractPurpose(purpose as string);
  }, [YourContract]);

  useEffect(() => {
    void getPurpose();
  }, [YourContract, getPurpose]);


  return (
    <>
      <main>
        <div className="flex flex-col flex-no-wrap items-center content-center justify-center">
        <div className="m-8">
          <span className="mr-2">📝</span>
          This Is Your App Home. You can start editing it in{" "}
          <span className="font-bold bg-primary-content">packages/next-ts/pages/index.tsx</span> folder
        </div>

        <div className="m-8">
          <span className="mr-2">✏️</span>
          Edit your smart contract <span className="font-bold bg-primary-content">YourContract.sol</span> in{" "}
          <span className="font-bold bg-primary-content">packages/foundry-ts/src</span>
        </div>
        {!contractPurpose ? (
          <div className="m-8">
            <span className="mr-2">👷‍♀️</span>
            You haven&apos;t deployed your contract yet, run{" "}
            <span className="font-bold bg-primary-content">yarn chain</span> and{" "}
            <span className="font-bold bg-primary-content">yarn deploy</span> to deploy your first contract!
          </div>
        ) : (
          <div className="m-8">
            <span className="mr-2">🤓</span>
            The &quot;purpose&quot; variable from your contract is{" "}
            <span className="font-bold bg-primary-content">{contractPurpose}</span>
          </div>
        )}

        <div className="m-8">
          <span className="mr-2">🤖</span>
          An example to get your balance:{" "}
          <span className="font-bold text-green-900">{data && formatEther(data?.value as BigNumberish)}</span>{" "}for address{" "}
          <span className="font-bold bg-primary-content">{accountData?.address}</span>
          {" "}from wagmi hooks!
        </div>
        <div className="m-8">
          <span className="mr-2">💭</span>
          Check out the{" "}
          <Link href={"/Hints"}>
            <span className="link link-primary">Hints</span>
          </Link>{" "}
          tab for more tips.
        </div>
        <div className="m-8">
          <span className="mr-2">🛠</span>
          Tinker with your smart contract using the
          <Link href={"/Debug"}>
            <span className="mx-2 link link-primary">Debug</span>
          </Link>{" "}
          tab.
        </div>
        </div>
      </main>
    </>
  );
};

export default Home;
