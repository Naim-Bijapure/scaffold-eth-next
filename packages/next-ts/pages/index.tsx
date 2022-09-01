import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";

import useAppLoadContract from "../hooks/useAppLoadContract";

const Home: NextPage = () => {
  const [contractPurpose, setContractPurpose] = useState<string>("");
  const { address } = useAccount();
  const { data } = useBalance({ addressOrName: address });

  const YourContract = useAppLoadContract({
    contractName: "YourContract",
  });

  const getPurpose = useCallback(async () => {
    const purpose = await YourContract?.purpose();
    console.log("Purpose", purpose);
    setContractPurpose(purpose as string);
  }, [YourContract]);

  useEffect(() => {
    void getPurpose();
  }, [YourContract, getPurpose]);

  return (
    <>
      <main className="flex flex-col items-center">
        {/* <div className="flex flex-col flex-no-wrap items-center content-center justify-center">
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
          {contractPurpose ? (
            <div className="m-8">
              <span className="mr-2">🤓</span>
              The &quot;purpose&quot; variable from your contract is{" "}
              <span className="font-bold bg-primary-content">{contractPurpose}</span>
            </div>
          ) : (
            <div className="m-8">
              <span className="mr-2">👷‍♀️</span>
              You haven&apos;t deployed your contract yet, run{" "}
              <span className="font-bold bg-primary-content">yarn chain</span> and{" "}
              <span className="font-bold bg-primary-content">yarn deploy</span> to deploy your first contract!
            </div>
          )}
          <div className="m-8">
            <span className="mr-2">🤖</span>
            An example to get your balance:{" "}
            <span className="font-bold text-green-900">{data && formatEther(data?.value as BigNumberish)}</span> for
            address <span className="font-bold bg-primary-content">{address}</span> from wagmi hooks!
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
        </div> */}

        <section className="">
          <div className="container flex flex-col items-center px-6 py-10 mx-auto ">
            <h1 className="self-start text-2xl font-semibold text-gray-800 lg:text-3xl">Scaffold-eth-next 2.0</h1>
            <p className="self-start text-gray-500 mt--1 xl:mt-1">
              Build unstoppable web3 apps with scaffold-eth-next 2.0
            </p>
            <div className="mt-5 grid grid-cols-1 gap-8 xl:mt-5 xl:gap-12 md:grid-cols-3 xl:grid-cols-3 ">
              <div className="p-8 border-2 border-blue-400 space-y-3 dark:border-blue-300 rounded-xl">
                <span className="inline-block text-blue-500 dark:text-blue-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                    />
                  </svg>
                </span>

                <h1 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white">Nextjs </h1>

                <p className="text-gray-500 dark:text-gray-300">
                  This repo uses the nextjs at front end.
                  <br />
                  You can create views inside
                  <br />
                  <span className="font-bold bg-primary-content">packages/next-ts/pages</span> folder
                </p>

                <a
                  href="https://nextjs.org/docs"
                  target={"_blank"}
                  rel="noreferrer"
                  className="inline-flex p-2 text-blue-500 capitalize bg-blue-100 rounded-full transition-colors duration-300 transform rtl:-scale-x-100 dark:bg-blue-500 dark:text-white hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </a>
              </div>

              <div className="p-8 border-2 border-blue-400 space-y-3 dark:border-blue-300 rounded-xl">
                <span className="inline-block text-blue-500 dark:text-blue-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                    />
                  </svg>
                </span>

                <h1 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white">Foundry</h1>

                <p className="text-gray-500 dark:text-gray-300">
                  for smart contract development foundry is configured with all batteries included. <br />
                  checkout <span className="font-bold bg-primary-content">packages/foundry-ts/src</span> folder for
                  solidity files.
                </p>

                <a
                  href="https://book.getfoundry.sh/"
                  target={"_blank"}
                  rel="noreferrer"
                  className="inline-flex p-2 text-blue-500 capitalize bg-blue-100 rounded-full transition-colors duration-300 transform rtl:-scale-x-100 dark:bg-blue-500 dark:text-white hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </a>
              </div>

              <div className="p-8 border-2 border-blue-400 space-y-3 dark:border-blue-300 rounded-xl">
                <span className="inline-block text-blue-500 dark:text-blue-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </span>

                <h1 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white">
                  Rainbowkit & wagmi hooks
                </h1>

                <p className="text-gray-500 dark:text-gray-300">
                  To connect with different wallets rainbowkit is configured. <br />
                  added wagmi hook support to communicate with different chain networks. <br />
                </p>

                <a
                  href="http://rainbowkit.com/"
                  target={"_blank"}
                  rel="noreferrer"
                  className="inline-flex p-2 text-blue-500 capitalize bg-blue-100 rounded-full transition-colors duration-300 transform rtl:-scale-x-100 dark:bg-blue-500 dark:text-white hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div className="opacity-50">Checkout Hints page for more info</div>
            <a className="m-2 btn btn-primary" href="/Hints">
              Hints
            </a>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
