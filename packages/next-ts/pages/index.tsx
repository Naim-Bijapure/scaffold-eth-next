import { BigNumberish } from "ethers";
import { formatEther } from "ethers/lib/utils";
import type { NextPage } from "next";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";

import useAppLoadContract from "../hooks/useAppLoadContract";
const Home: NextPage = () => {
  const [contractPurpose, setContractPurpose] = useState<string>("");

  const { data: accountData, isLoading } = useAccount();
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
      <main className="flex flex-col items-start justify-center m-2 lg:mx-4">
        <div className="m-2">
          <span className="mx-2">📝</span>
          This Is Your App Home. You can start editing it in
          <span className="highight">/pages </span> folder
        </div>

        <div className="m-2">
          <span className="mx-2">✏️</span>
          Edit your smart contract <span className="mx-2 bg-base-200">YourContract.sol</span> in{" "}
          <span className="highight">packages/foundry-hardat-ts/src</span>
        </div>
        {!contractPurpose ? (
          <div className="m-2">
            <span className="mx-2">👷‍♀️</span>
            You haven&apos;t deployed your contract yet, run
            <span className="mx-2 bg-base-200">yarn chain</span> and{" "}
            <span className="mx-2 bg-base-200">yarn deploy</span> to deploy your first contract!
          </div>
        ) : (
          <div className="m-2">
            <span className="mx-2">🤓</span>
            The &quot;purpose&quot; variable from your contract is{" "}
            <span className="mx-2 bg-base-200">{contractPurpose}</span>
          </div>
        )}

        <div className="m-2">
          <span className="mx-2">🤖</span>
          An example to get your balance from wagmi hooks for your account
          <span className="mx-2 bg-base-200">{accountData?.address}</span>
          balance : <span className="mx-2 bg-base-200">{data && formatEther(data?.value as BigNumberish)} eth</span>
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
            <span className="mx-2 link link-primary">Debug</span>
          </Link>{" "}
          tab.
        </div>
      </main>
    </>
  );
};

export default Home;
