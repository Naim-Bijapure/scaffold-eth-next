import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { AiOutlineSwap } from "react-icons/ai";
import { useAccount, useNetwork } from "wagmi";
const FaucetModal: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [ethValue, setEthValue] = useState<number>(0);
    const [toAddress, setToAddress] = useState<string | null>(null);
    const [isFaucetVisible, setIsFaucetVisible] = useState<boolean>(false);

    const { activeChain, chains, error, isLoading, pendingChainId, switchNetwork } = useNetwork();

    const { data } = useAccount();
    useEffect(() => {
        setToAddress(data?.address as string);

        // check localhost and enable faucet modal
        if (["Hardhat", "Localhost"].includes(activeChain?.name as string)) {
            setIsFaucetVisible(true);
        } else {
            setIsFaucetVisible(false);
        }
    }, [data?.address, activeChain?.name]);

    const onReceiveFaucet = async () => {
        let localProvider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
        let burnerSigner = localProvider.getSigner(0);
        let balance = await burnerSigner.getBalance();
        console.log("balance: ", balance.toString());
        if (ethValue > 0) {
            await burnerSigner.sendTransaction({ to: data?.address, value: ethers.utils.parseEther(`${ethValue}`) });
            window.location.reload();
        }
    };
    return (
        <>
            <div className={`${isFaucetVisible === false ? "hidden" : "block"}`}>
                <label
                    htmlFor="faucetModal"
                    className="fixed bottom-[15%] lg:bottom-[10%] left-[80%] lg:left-[93%]  bg-base-300 p-3 rounded-full text-orange-500 text-4xl shadow-md cursor-pointer"
                    onClick={() => setModalOpen(true)}
                >
                    {/* <GiBurningEmbers /> */}
                    🔥
                </label>

                <input
                    type="checkbox"
                    id="faucetModal"
                    className="modal-toggle"
                    checked={modalOpen}
                    onChange={() => null}
                />
                <div
                    className="modal modal-bottom sm:modal-middle "
                    //
                >
                    <div className="modal-box flex flex-col items-center justify-center">
                        <label
                            // htmlFor="my-modal-3"
                            className="btn btn-sm btn-warning btn-circle absolute right-2 top-2"
                            onClick={() => setModalOpen(false)}
                        >
                            ✕
                        </label>

                        <h3 className="font-bold text-lg">Get some burning faucets!!! 🔥🔥🔥</h3>

                        {/* eth input */}
                        <div className="form-control mt-2">
                            <div className="input-group ">
                                <input
                                    type="text"
                                    placeholder="Enter eth amount"
                                    className="input input-bordered"
                                    onChange={(e) => setEthValue(+e.target.value)}
                                />
                                <button className="btn  btn-secondary ">
                                    <AiOutlineSwap />
                                    eth
                                </button>
                            </div>
                        </div>

                        <div className="modal-action justify-start">
                            {/* <label htmlFor="faucetModall" className="btn btn-primary">
                                receive
                            </label> */}
                            <button className="btn btn-primary" onClick={onReceiveFaucet}>
                                receive
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FaucetModal;
