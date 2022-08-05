import { utils } from "ethers";
import { NextPage } from "next";
import React, { useState, useEffect, useCallback } from "react";
import { ImSpinner } from "react-icons/im";
import { useAccount, useBalance, useProvider, useEnsName } from "wagmi";

import { Address, AddressInput, Balance, EtherInput, PunkBlockie } from "../components/EthComponents";
import useAppLoadContract from "../hooks/useAppLoadContract";
import { useStore } from "../store/useStore";
import { Transactor } from "../functions";
import { parseEther } from "ethers/lib/utils";

const ExampleUI: NextPage = () => {
  const { address } = useAccount();
  const [contractPurpose, setContractPurpose] = useState<string>("");
  const [addressValue, setAddressValue] = useState<string>("");
  const [ethValue, setEthValue] = useState<number>();
  const provider = useProvider();

  const [state, dispatch] = useStore();

  const { ethPrice } = state;

  const YourContract = useAppLoadContract({
    contractName: "YourContract",
  });


  const { data, isError, isLoading } = useEnsName({
    address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
  })

  const getPurpose = useCallback(async () => {
    const purpose = await YourContract?.purpose();
    setContractPurpose(purpose as string);
  }, [YourContract]);

  useEffect(() => {
    void getPurpose();
  }, [YourContract, getPurpose]);

  return (
    <>
      <div>
        <div className="flex flex-col items-center justify-center p-4 m-auto mt-16 border border-gray-400 border-solid prose">
          <h2>Example UI:</h2>
          <h4>purpose: {contractPurpose}</h4>
          <div className="divider"></div>
          <input type="text" placeholder="Purpose" className="w-full max-w-xs input input-bordered input-secondary"
            onChange={(e: React.ChangeEvent<HTMLInputElement>): any => {
              setContractPurpose(e.currentTarget.value);
            }} 
          />
          <button 
            className="mt-8 btn"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={async () => {
              void YourContract?.setPurpose(contractPurpose);
            }}
          >Set Purpose!</button>
          <div className="divider"></div>
          <div className="flex items-center">
            Your Address:
            <Address
              provider={provider}
              address={address as string}
              price={ethPrice as number}
              isBalance={true}
            />
          </div>
          <div className="divider"></div>
          <div className="flex items-center">
            ENS Address Example:
            {data}
          </div>
          <div className="divider"></div>
          {/* Balance component */}
          <Balance address={address as string} provider={provider} price={ethPrice as number} />
          <div className="divider"></div>
          <div>🐳 Example Whale Balance:</div>
          <Balance balance={utils.parseEther("1000")} provider={provider} price={ethPrice as number} />
          <div className="divider"></div>
          {/* Address component */}
          <div className="flex items-center">
            Your Contract Address:&nbsp;
            <Address
            address={YourContract?.address as string}
            provider={provider}
            isBalance={false}
            />
          </div>
          <div className="divider"></div>
          {/* Address input component */}
          <div className="flex items-center">
              Address Input:&nbsp;
              <AddressInput value={addressValue} onChange={setAddressValue} />
          </div>
          <div className="divider"></div>
          {/* Ether input component */}
          <div className="flex items-center">
              Ether Input:&nbsp;
              <EtherInput value={ethValue as number} onChange={setEthValue} price={ethPrice as number} />
          </div>
          <div className="divider"></div>
          {/* QR Code component */}
          <div className="flex flex-col items-center justify-center">
            <h2>QR Code</h2>
            <PunkBlockie address={address as string} scale={20} />
          </div>
          <div className="divider"></div>
          <div style={{ margin: 8 }}>
            <button 
              className="mt-8 btn"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={async () => {
                void YourContract?.setPurpose("🍻 Cheers");
              }}
            >
            Set Purpose to &quot;🍻 Cheers&quot;
            </button>
          </div>
          <div style={{ margin: 8 }}>
            <button 
              className="mt-8 btn"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={async () => {
                void YourContract?.fallback({value: utils.parseEther("0.001")})}
              }
            >
            Send Value
            </button>
          </div>
          <div style={{ margin: 8 }}>
            <button 
              className="mt-8 btn"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={async () => {
                const data = YourContract?.interface.encodeFunctionData("setPurpose",["🤓 Whoa so 1337!"])
                void YourContract?.signer.sendTransaction({to: YourContract.address ,data: data , value: utils.parseEther("0.001")})
              }}
            >
            Set Purpose With Value
            </button>
          </div>
          <div style={{ margin: 8 }}>
            <button 
              className="mt-8 btn"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={async () => {
                void YourContract?.setPurpose("💵 Paying for this one!", {
                  value: utils.parseEther("0.001"),
                });
              }}
            >
            Another Example
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center p-4 m-auto mt-16 border border-gray-400 border-solid prose">
          <div>
            There are tons of generic components included from{" "}
            <a href="https://daisyui.com/components/" target="_blank" rel="noopener noreferrer">
            🌼 daisyUI
            </a>{" "}
            too!
          </div>
          <div className="mt-8">
            <button className="btn btn-primary">Button</button>
          </div>
          <div className="flex flex-row items-center mt-8">
            <ImSpinner size="2em" className="animate-spin"/>Icons
          </div>
          <div className="mt-8">
            <input type="range" min="0" max="100" value="40" className="range range-primary" readOnly/>
          </div>
          <div className="mt-8 form-control">
            <label className="cursor-pointer label">
              <input type="checkbox" className="toggle toggle-primary" defaultChecked/>
            </label>
          </div>
          <div>
            <progress className="w-56 progress progress-primary" value="70" max="100"></progress>
          </div>
        </div>
      </div>
    </>
  );
};
export default ExampleUI;
