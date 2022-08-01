import { utils, BigNumber } from "ethers";
import { NextPage } from "next";
import { useState } from "react";
import { useAccount, useProvider } from "wagmi";

import { Address, AddressBalance, AddressInput, Balance, Blockie, EtherInput, PunkBlockie } from "../components/EthComponents";

import { useStore } from "../store/useStore";
// import { Transactor } from "../functions";

const ExampleUI: NextPage = () => {
  const { data } = useAccount();
  const [addressValue, setAddressValue] = useState<string>("");
  const [ethValue, setEthValue] = useState<number>();
  const provider = useProvider();

  const [state, dispatch] = useStore();

  const { ethPrice } = state;

  // Change this to actual properties
  const purpose = "Hello";
  const [newPurpose, setNewPurpose] = useState("loading...");
  const yourLocalBalance = BigNumber.from("1000000000000000000");
  // ---


  return (
    <>
      <div>
        <div className="flex flex-col items-center justify-center p-4 m-auto mt-16 border border-gray-400 border-solid prose">
          <h2>Example UI:</h2>
          <h4>purpose: {purpose}</h4>
          <div className="divider"></div>
          <input type="text" placeholder="Purpose" className="w-full max-w-xs input input-bordered input-secondary" />
          <button 
            className="mt-8 btn"
          >Set Purpose!</button>
          <div className="divider"></div>
          <div className="flex items-center">
            Your Address:
            <Address
              provider={provider}
              address={data?.address as string}
              price={ethPrice as number}
              isBalance={true}
            />
          </div>
          <div className="divider"></div>
          <div className="flex items-center">
            ENS Address Example:
            <Address
              address="0x34aA3F359A9D614239015126635CE7732c18fDF3" /* this will show as austingriffith.eth */
              provider={provider}
              price={ethPrice as number}
              isBalance={false}
            />
          </div>
          <div className="divider"></div>
          <h2>Your Balance: {yourLocalBalance ? utils.formatEther(yourLocalBalance) : "..."}</h2>
          <div>OR</div>
          <Balance address={data?.address as string} provider={provider} price={ethPrice as number} />
          <div className="divider"></div>
          <div>🐳 Example Whale Balance:</div>
          <Balance balance={utils.parseEther("1000")} provider={provider} price={ethPrice as number} />
          <div className="divider"></div>
          <div className="flex items-center">
            Your Contract Address:
            <Address
            address={data?.address as string}
            provider={provider}
            isBalance={false}
            />
          </div>
          <div className="divider"></div>
          <div style={{ margin: 8 }}>
            <button 
              className="mt-8 btn"
            >
            Set Purpose to &quot;🍻 Cheers&quot;
            </button>
          </div>
          <div style={{ margin: 8 }}>
            <button 
              className="mt-8 btn"
            >
            Send Value
            </button>
          </div>
          <div style={{ margin: 8 }}>
            <button 
              className="mt-8 btn"
            >
            Set Purpose With Value
            </button>
          </div>
          <div style={{ margin: 8 }}>
            <button 
              className="mt-8 btn"
            >
            Another Example
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ExampleUI;
