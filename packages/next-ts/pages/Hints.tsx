import { BigNumberish } from "ethers";
import { formatEther } from "ethers/lib/utils";
import type { NextPage } from "next";
import { BsCreditCard2Front } from "react-icons/bs";
import { GrDeploy } from "react-icons/gr";
import { TbShip } from "react-icons/tb";
import { useAccount, useBalance } from "wagmi";

import Address from "../components/EthComponents/Address";
import AddressInput from "../components/EthComponents/AddressInput";

const Help: NextPage = () => {
  const { data: accountData, isLoading } = useAccount();
  const { data } = useBalance({ addressOrName: accountData?.address });
  return (
    <>
      <main className="flex flex-col items-start justify-center m-2 lg:mx-4">
        <section className="bg-base-300 text--gray-100">
          <div className="container flex flex-col p-6 mx-auto">
            <h2 className="py-4 text-3xl font-bold text-center">Hints</h2>
            <div className="divide-y divide-gray-700">
              <div className="justify-center p-8 mx-auto grid grid-cols-4 space-y-8 lg:space-y-0">
                <div className="flex items-center justify-center text-5xl lg:col-span-1 col-span-full">
                  <BsCreditCard2Front />
                </div>
                <div className="flex flex-col justify-center max-w-3xl text-center col-span-full lg:col-span-3 lg:text-left">
                  <span className="text-xl font-bold md:text-2xl">Front end setup</span>
                  <span className="info-block">
                    <div>
                      <span>🎛</span>
                      Edit your <b>frontend</b> in
                      <span className="highlight">packages/next-ts/pages</span>
                    </div>

                    <div>
                      <span>🔭</span> explore the
                      <span className="highlight">
                        <a
                          href={"https://wagmi.sh/docs/getting-started"}
                          target="_blank"
                          rel="noreferrer"
                          className="link link-primary">
                          wagmi hooks
                        </a>
                      </span>
                      and
                      <span className="highlight">📦 components</span>
                    </div>

                    <div>
                      <span>🪝</span>
                      for example, the
                      <span className="highlight">useBalance()</span> hook keeps track of your balance:{" "}
                      <b> {data && formatEther(data?.value as BigNumberish)}</b>
                      and <span className="highlight">useAccount()</span> hook keeps track of your account address
                    </div>

                    <div>
                      <span>#️⃣</span>
                      as you build your app you&apos;ll need web3 specific components like an
                      <span className="highlight">{"<AddressInput/>"}</span>
                      component like below
                      <span className=" ">
                        <AddressInput value={accountData?.address as string} onChange={(): any => null} />
                      </span>
                      <span>(try putting in your address, an ens address, or scanning a QR code)</span>
                    </div>

                    <div>
                      <span>💧</span>
                      use the <b>faucet</b> to send funds to
                      <span className="highlight ">
                        <div className="w-5 ">
                          <Address address={accountData?.address as string} />
                        </div>
                      </span>
                    </div>
                  </span>
                </div>
              </div>
              <div className="justify-center p-8 mx-auto grid grid-cols-4 space-y-8 lg:space-y-0">
                <div className="flex items-center justify-center text-5xl lg:col-span-1 col-span-full">
                  <GrDeploy />
                </div>
                <div className="flex flex-col justify-center max-w-3xl text-center col-span-full lg:col-span-3 lg:text-left">
                  <span className="text-xl font-bold md:text-2xl">Deploy</span>
                  <span className="mt-4 info-block ">
                    <div>
                      <span>📡</span>
                      deploy to a testnet or mainnet by editing
                      <span className="highlight">packages/foundry-hardat-ts/hardhat.config.js</span>
                      and running
                      <span className="highlight">yarn run deploy</span>
                    </div>

                    <div>
                      <span>🔑</span>
                      <span className="highlight">yarn run generate</span>
                      will create a deployer account in
                      <span className="highlight">packages/foundry-hardat-ts</span>
                      <div>
                        (use <span className="highlight">yarn run account</span> to display deployer address and
                        balance)
                      </div>
                    </div>

                    <div>
                      <span>⚙️</span>
                      build your app with
                      <span className="highlight">yarn run build</span>
                    </div>
                  </span>
                </div>
              </div>
              <div className="justify-center p-8 mx-auto grid grid-cols-4 space-y-8 lg:space-y-0">
                <div className="flex items-center justify-center text-5xl lg:col-span-1 col-span-full">
                  <TbShip />
                </div>
                <div className="flex flex-col justify-center max-w-3xl text-center col-span-full lg:col-span-3 lg:text-left">
                  <span className="text-xl font-bold md:text-2xl">Ship your app</span>
                  <span className="mt-4 info-block">
                    <div>
                      <span>🚢</span>
                      ship it!
                      <span className="highlight">yarn run surge</span>
                      or
                      <span className="highlight">yarn run s3</span>
                      or
                      <span className="highlight">yarn run ipfs</span>
                    </div>

                    <div>
                      <span>💬</span>
                      for support, join this
                      <span className="highlight">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA">
                          Telegram Chat
                        </a>
                      </span>
                    </div>
                    <div>
                      <span>🛠</span>
                      <span>Check out your browser&apos;s developer console for more... (inspect console) 🚀</span>
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Help;
