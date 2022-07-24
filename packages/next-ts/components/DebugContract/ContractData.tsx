/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { ethers } from "ethers";
import React, { useEffect, useState } from "react";

import Address from "./components/Address";
import DictInput from "./components/DictInput";
import FunctionInputForm from "./components/FunctionInputForm";
import { mainProvider } from "./configs/app.configs";
import { useDebugContractStore } from "./store/useDebugContractStore";

interface IContractData {
  contractName: string;
  loadedContract: ethers.BaseContract;
}
const ContractData: React.FC<IContractData> = ({ contractName, loadedContract }) => {
  // type abiType = typeof YourContract__factory.abi;
  // const yourContractAbi = YourContract__factory.abi;
  // console.log("loadedContract.contractName: ", loadedContract);

  type abiType = any;
  // const contractName = "YourContract";
  // const loadedContract = useAppLoadContract({
  //   contractName: contractName,
  // });

  const [state, dispatch] = useDebugContractStore();

  const [contractInputData, setContractInputData] = useState<abiType>();
  const [contractViewData, setContractsViewData] = useState<Record<string, string>>();

  const fetchAllViews = async (viewsInputs: abiType): Promise<any> => {
    const viewsData = {};
    for (const inputObj of viewsInputs) {
      const viewValue = await loadedContract[inputObj.name]();
      viewsData[inputObj.name as string] = viewValue;
    }

    setContractsViewData({ ...viewsData });
  };

  useEffect(() => {
    if (loadedContract !== undefined) {
      const functions: typeof loadedContract.interface.functions = loadedContract.interface.functions;
      const inputData: any[] = [];
      // storing inputs in a array
      Object.keys(functions).map((key) => {
        inputData.push(functions[key]);
      });

      // const filteredFunctions: abiType = yourContractAbi.filter((abiData) => abiData.type === "function");
      const filteredFunctions: any = inputData.filter((abiData) => abiData.type === "function");

      setContractInputData(filteredFunctions);

      fetchAllViews(
        filteredFunctions.filter(
          (data) =>
            ["view", "pure"].includes(data.stateMutability as string) && data.inputs && data.inputs?.length === 0
        )
      ).catch((err) => {});
    }
  }, [loadedContract, state.refreshContract]);

  /** ----------------------
   * filtering input data to variables, dicts or arrays, functions/methods
   * ---------------------*/
  const contractVariables: any[] = contractInputData
    ?.sort((dataA, dataB) => dataA.inputs?.length - dataB.inputs?.length)
    .filter(
      (data) =>
        ["view", "pure"].includes(data.stateMutability as string) &&
        data.inputs !== undefined &&
        data.inputs?.length === 0
    );

  const contractDicts: any[] = contractInputData
    ?.sort((dataA, dataB) => dataA.inputs?.length - dataB.inputs?.length)
    .filter(
      (data) =>
        data.inputs !== undefined && data.inputs?.length > 0 && data.inputs.some((data) => Boolean(data.name) === false)
    );

  const contractFunctions: any[] = contractInputData
    ?.sort((dataA, dataB) => dataA.inputs?.length - dataB.inputs?.length)
    .filter(
      (data) =>
        data.inputs !== undefined && data.inputs?.length > 0 && data.inputs.some((data) => data.name?.length > 0)
    );

  return (
    <div className="flex flex-col w-[100%] lg-:w-1/2  ">
      <div className="w-auto bd--red lg-:w-[40%]">
        {loadedContract === undefined && (
          <div className="text-center  ">
            <progress className="w-1/2  progress progress-primary"></progress>
          </div>
        )}
        {/* contract info */}
        <div className="flex items-center justify-around">
          <div className="text-xl font-bold flex--1">{contractName}</div>
          <div className="">
            {loadedContract?.address && (
              <Address
                address={loadedContract?.address}
                provider={loadedContract?.provider as any}
                price={state.ethPrice}
                isBalance={true}
              />
            )}
          </div>
        </div>

        {/* variables */}
        <div className="mt-2 border--4 border-base-300  card card-body card-bordered">
          <div className="card-title">Variables</div>
          <div className="overflow-x-auto">
            <table className="table w-full text-sm table-">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {contractVariables &&
                  contractVariables.map((data, index) => {
                    return (
                      <tr className="" key={index}>
                        <td>{data.name}</td>
                        <td>
                          <span className="p-2 rounded-lg bg-base-300">
                            {contractViewData !== undefined && contractViewData[data.name as string]}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center mt-2 border--4 border-base-300 card card-body card-bordered">
          <div className="self-start card-title">Dictionary and array</div>
          {/* <div>dictionary and array</div> */}

          <div className="flex flex-wrap w-96  ">
            {contractDicts &&
              contractDicts.map((data, index) => {
                return (
                  <div key={index} className="w-full mt-2">
                    {/* <div>{data.name}</div> */}
                    <DictInput
                      methodName={data.name}
                      inputData={data.inputs}
                      loadedContract={loadedContract}
                      mainProvider={mainProvider}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      {/* <div className="divider lg:divider-horizontal "></div> */}

      {/* functions */}
      <div className="w-auto mt-2 lg-:w-[45%]">
        <div className="card card-body card-bordered ">
          <div className="card-title">Methods</div>
          {contractFunctions &&
            contractFunctions.map((data, index) => {
              return (
                <div key={index} className="card- card--body card--bordered">
                  <FunctionInputForm
                    methodName={data.name}
                    inputData={data.inputs}
                    loadedContract={loadedContract}
                    isPayable={data.stateMutability === "payable"}
                    mainProvider={mainProvider}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default ContractData;
