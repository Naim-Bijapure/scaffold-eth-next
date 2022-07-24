import { ethers } from "ethers";
import Collapse, { Panel } from "rc-collapse";
import React from "react";
import "rc-collapse/assets/index.css";

import ContractData from "./ContractData";
import DebugContractProvider, { contractsType } from "./store/DebugContractProvider";
import { useDebugContractStore } from "./store/useDebugContractStore";

const LoadContractList: React.FC = () => {
  const [state, dispatch] = useDebugContractStore();

  return (
    <>
      <Collapse accordion={true} className="w-full ">
        {state.contracts.map((contractData, index) => {
          return (
            <React.Fragment key={`${index}_${contractData.contractName}`}>
              <Panel header={contractData.contractName} headerClass="-" className="w-full">
                <ContractData contractName={contractData.contractName} loadedContract={contractData.contract} />
              </Panel>
            </React.Fragment>
          );
        })}
      </Collapse>
    </>
  );
};

const Index: React.FC<{ contracts: contractsType }> = ({ contracts }) => {
  console.log("contracts: ", contracts);
  return (
    <div>
      <DebugContractProvider contracts={contracts}>
        <LoadContractList />
      </DebugContractProvider>
    </div>
  );
};
export default Index;
