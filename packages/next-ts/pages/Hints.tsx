import { BigNumberish } from "ethers";
import { formatEther } from "ethers/lib/utils";
import type { NextPage } from "next";
import Link from "next/link";
import { useAccount, useBalance } from "wagmi";
import Address from "../components/EthComponents/Address";
import AddressInput from "../components/EthComponents/AddressInput";

const Help: NextPage = () => {
    const { data: accountData, isLoading } = useAccount();
    const { data } = useBalance({ addressOrName: accountData?.address });
    return (
        <>
            <main className="m-2 lg:mx-4 flex flex-col items-start justify-center ">
                <div className="m-2">
                    <span className="m-2">👷</span>
                    Edit your <b>contract</b> in
                    <span className="highlight">packages/foundry-hardat-ts/src</span>
                </div>

                <div className="m-2">
                    <span className="mx-2">🛰</span>
                    <b>compile/deploy</b> with
                    <span className="highlight">yarn run deploy</span>
                </div>

                <div className="m-2">
                    <span className="mx-2">🚀</span>
                    Your <b>contract artifacts</b> are automatically injected into your frontend at
                    <span className="highlight">packages/next-ts/generated/hardhat_contracts.json</span>
                </div>

                <div className="m-2">
                    <span className="mx-2">🎛</span>
                    Edit your <b>frontend</b> in
                    <span className="highlight">packages/next-ts/pages</span>
                </div>

                <div className="m-2">
                    <span className="mx-2">🔭</span>
                    explore the
                    <span className="highlight">
                        🖇{" "}
                        <a
                            href={"https://wagmi.sh/docs/getting-started"}
                            target="_blank"
                            rel="noreferrer"
                            className="link link-primary"
                        >
                            wagmi hooks
                        </a>
                    </span>
                    and
                    <span className="highlight">📦 components</span>
                </div>

                <div className="m-2">
                    <span className="mx-2">🪝</span>
                    for example, the
                    <span className="highlight">useBalance()</span> hook keeps track of your balance:{" "}
                    <b>{formatEther(data?.value as BigNumberish)}</b>
                    and <span className="highlight">useAccount()</span> hook keeps track of your account address
                </div>

                <div className="m-2">
                    <span className="mx-2">#️⃣</span>
                    as you build your app you&apos;ll need web3 specific components like an
                    <span className="highlight">{"<AddressInput/>"}</span>
                    component:
                    <div className="mx-2">
                        <AddressInput value={accountData?.address as string} onChange={() => null} />
                    </div>
                    <div>(try putting in your address, an ens address, or scanning a QR code)</div>
                </div>

                {/* <div style={{ marginTop: 32 }}>
                    this balance could be multiplied by
                    <span className="highlight">price</span> that is loaded with the
                    <span
                        className="highlight"
                    >
                        usePrice
                    </span>{" "}
                    hook with the current value: <b>${price}</b>
                </div> */}

                <div className="m-2">
                    <span className="mx-2">💧</span>
                    use the <b>faucet</b> to send funds to
                    <span
                        className="highlight"
                        style={{
                            marginLeft: 4,
                            /* backgroundColor: "#f9f9f9", */ padding: 4,
                            borderRadius: 4,
                            fontWeight: "bolder",
                        }}
                    >
                        <Address address={accountData?.address as string} />
                    </span>
                </div>

                <div className="m-2">
                    <span className="mx-2">📡</span>
                    deploy to a testnet or mainnet by editing
                    <span className="highlight">packages/foundry-hardat-ts/hardhat.config.js</span>
                    and running
                    <span className="highlight">yarn run deploy</span>
                </div>

                <div className="m-2">
                    <span className="mx-2">🔑</span>
                    <span className="highlight">yarn run generate</span>
                    will create a deployer account in
                    <span className="highlight">packages/foundry-hardat-ts</span>
                    <div className="mx-2">
                        (use <span className="highlight">yarn run account</span> to display deployer address and
                        balance)
                    </div>
                </div>

                <div className="m-2">
                    <span className="mx-2">⚙️</span>
                    build your app with
                    <span className="highlight">yarn run build</span>
                </div>

                <div style={{ marginTop: 32 }}>
                    <span style={{ marginRight: 8 }}>🚢</span>
                    ship it!
                    <span
                        className="highlight"
                        style={{
                            marginLeft: 4,
                            /* backgroundColor: "#f1f1f1", */ padding: 4,
                            borderRadius: 4,
                            fontWeight: "bolder",
                        }}
                    >
                        yarn run surge
                    </span>
                    or
                    <span
                        className="highlight"
                        style={{
                            marginLeft: 4,
                            /* backgroundColor: "#f1f1f1", */ padding: 4,
                            borderRadius: 4,
                            fontWeight: "bolder",
                        }}
                    >
                        yarn run s3
                    </span>
                    or
                    <span
                        className="highlight"
                        style={{
                            marginLeft: 4,
                            /* backgroundColor: "#f1f1f1", */ padding: 4,
                            borderRadius: 4,
                            fontWeight: "bolder",
                        }}
                    >
                        yarn run ipfs
                    </span>
                </div>

                <div style={{ marginTop: 32 }}>
                    <span style={{ marginRight: 8 }}>💬</span>
                    for support, join this
                    <span
                        className="highlight"
                        style={{
                            marginLeft: 4,
                            /* backgroundColor: "#f9f9f9", */ padding: 4,
                            borderRadius: 4,
                            fontWeight: "bolder",
                        }}
                    >
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA"
                        >
                            Telegram Chat
                        </a>
                    </span>
                </div>
                <div style={{ padding: 128 }}>
                    🛠 Check out your browser&apos;s developer console for more... (inspect console) 🚀
                </div>
            </main>
        </>
    );
};

export default Help;
