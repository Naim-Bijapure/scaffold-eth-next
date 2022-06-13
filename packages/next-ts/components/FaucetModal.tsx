/* eslint-disable @typescript-eslint/no-misused-promises */
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

  const onReceiveFaucet = async (): Promise<any> => {
    const localProvider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
    const burnerSigner = localProvider.getSigner(0);
    const balance = await burnerSigner.getBalance();
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
          className="fixed p-3 text-4xl text-orange-500 rounded-full shadow-md cursor-pointer bottom-[15%] lg:bottom-[10%] left-[80%] lg:left-[93%] bg-base-300"
          onClick={(): any => setModalOpen(true)}>
          {/* <GiBurningEmbers /> */}
          🔥
        </label>

        <input
          type="checkbox"
          id="faucetModal"
          className="modal-toggle"
          checked={modalOpen}
          onChange={(): any => null}
        />
        <div
          className="modal modal-bottom sm:modal-middle "
          //
        >
          <div className="flex flex-col items-center justify-center modal-box">
            <label
              // htmlFor="my-modal-3"
              className="absolute btn btn-sm btn-warning btn-circle right-2 top-2"
              onClick={(): any => setModalOpen(false)}>
              ✕
            </label>

            <h3 className="text-lg font-bold">Get some burning faucets!!! 🔥🔥🔥</h3>

            {/* eth input */}
            <div className="mt-2 form-control">
              <div className="input-group ">
                <input
                  type="text"
                  placeholder="Enter eth amount"
                  className="input input-bordered"
                  onChange={(e): any => setEthValue(+e.target.value)}
                />
                <button className="btn  btn-secondary ">
                  <AiOutlineSwap />
                  eth
                </button>
              </div>
            </div>

            <div className="justify-start modal-action">
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
