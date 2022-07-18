/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useProvider } from "wagmi";

import { YourContract__factory } from "../../contracts/contract-types";
import useAppLoadContract from "../../hooks/useAppLoadContract";
import Address from "../EthComponents/Address";

import { useDebugContractStore } from "./store/useDebugContractStore";

interface IFunctionInputForm {
  methodName;
  inputData: any[];
  loadedContract: any;
  isPayable: boolean;
}

const FunctionInputForm: React.FC<IFunctionInputForm> = ({ methodName, inputData, loadedContract, isPayable }) => {
  const [state, dispatch] = useDebugContractStore();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<any>();

  const [outputData, setOutputData] = useState<any>();

  //   call contract function
  const onSubmit: SubmitHandler<any> = async (data) => {
    /** ----------------------
     * on method call
     * ---------------------*/
    const value = data["txValue"];
    delete data["txValue"];
    const argumets = Object.values(data as { any });
    console.log("argumets: ", argumets, value);
    let tx, rcpt;

    if (isPayable) {
      tx = await loadedContract[methodName](
        ...argumets,
        value !== undefined && { value: ethers.utils.parseEther(String(value)) }
      );
      rcpt = await tx.wait();
      setOutputData({ [methodName]: JSON.stringify(rcpt, null, 4) });
    }

    if (isPayable === false) {
      tx = await loadedContract[methodName](...argumets);
      if (tx.wait) {
        rcpt = await tx.wait();
        setOutputData({ [methodName]: JSON.stringify(rcpt, null, 4) });
      } else {
        setOutputData({ [methodName]: JSON.stringify(tx, null, 4) });
      }
    }

    reset();
    dispatch({ payload: { refreshContract: !state.refreshContract } });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        // className="flex flex--col border--2 form-control card card-body card-bordered shadow-sm border-base-300">
        className="flex flex-row items-start justify-between  form-control  card card-body card-bordered">
        {/* <div className={`card--title `}>{methodName}</div> */}
        <div className={`mt-2 opacity-70 font-bold`}>{methodName}</div>
        {/* if the input is function */}
        <div className="flex flex-col  justify-end">
          <div className="flex flex-col items-end justify-end ">
            {inputData.map((data, index) => {
              return (
                <div key={index}>
                  <label className="mt-2 input-group">
                    <input
                      type={data.type.includes("uint") ? "number" : "text"}
                      placeholder={data.type}
                      {...register(data.name, { required: true, valueAsNumber: data.type.includes("uint") })}
                      className="max-w-xs  input input-bordered"
                    />
                    <span>{data.name}</span>
                  </label>
                  <div>{errors[data.name] && <span className="text-red-500">This field is required</span>}</div>

                  {outputData && outputData[methodName] && (
                    <div
                      tabIndex={0}
                      className="mt-2 border collapse collapse-arrow border-base-300 bg-base-100 rounded-box">
                      <div className="text-xl font-medium collapse-title">Output </div>
                      <div className="collapse-content">
                        <p>
                          <div className="mockup-code">
                            <pre data-prefix=">">
                              <code>{outputData[methodName]}</code>
                            </pre>
                          </div>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div>
            {isPayable && (
              <>
                <label className="mt-2 input-group">
                  <input
                    type="number"
                    step={0.00001}
                    placeholder={"Enter transaction value in eth"}
                    {...register("txValue", { required: true, valueAsNumber: true })}
                    className="w-full max-w-xs input input-bordered"
                  />
                  <span>Eth</span>
                </label>
                <div>{errors["txValue"] && <span className="text-red-500">This field is required</span>}</div>
              </>
            )}
          </div>

          <div className="justify-end my-2 card-actions">
            <button type="submit" className="btn btn-primary ">
              Send
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

interface IDictInput {
  methodName;
  inputData: any[];
  loadedContract: any;
}
const DictInput: React.FC<IDictInput> = ({ methodName, inputData, loadedContract }) => {
  const [state, dispatch] = useDebugContractStore();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<any>();

  const [dictValue, setDictValue] = useState<any>();
  const [outputData, setOutputData] = useState<any>();

  //   call contract function
  const onSubmit: SubmitHandler<any> = async (data) => {
    /** ----------------------
     * on dictionary  or array value fetch
     * ---------------------*/
    try {
      const argumets = Object.values(data as { any });
      const value = await loadedContract[methodName](...argumets);

      setDictValue(value.toString());
    } catch (error) {
      console.log("error: ", error);
    }

    reset();
    dispatch({ payload: { refreshContract: !state.refreshContract } });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col  form-control card card-body card-bordered shadow-sm ">
        {inputData.map((data, index) => {
          return (
            <React.Fragment key={index}>
              <div className="form-control ">
                <label className="input-group input-group-vertical">
                  <span className="justify-center p-2">{methodName}</span>
                  <input
                    type="text"
                    placeholder={`Enter ${data.type} value`}
                    {...register(methodName, { required: true })}
                    className="w-full max-w-xs input input-bordered "
                  />
                  <input
                    type="text"
                    value={dictValue}
                    className={`input input-bordered ${dictValue ? "block" : "hidden"}`}
                    disabled
                  />
                  <button type="submit" className="btn btn-primary ">
                    Send
                  </button>
                </label>
              </div>
            </React.Fragment>
          );
        })}
      </form>
    </>
  );
};

const Index: React.FC = () => {
  // type abiType = typeof YourContract__factory.abi;

  type abiType = any;
  const yourContractAbi = YourContract__factory.abi;
  const contractName = "YourContract";
  const loadedContract = useAppLoadContract({
    contractName: contractName,
  });

  const [state, dispatch] = useDebugContractStore();
  const provider = useProvider();

  const [contractInputData, setContractInputData] = useState<abiType>();
  const [contractViewData, setContractsViewData] = useState<Record<string, string>>();

  const fetchAllViews = async (viewsInputs: abiType): Promise<any> => {
    // const balance = await provider.getBalance(loadedContract?.address as string);
    // console.log("balance: ", balance.toString());

    const viewsData = {};
    for (const inputObj of viewsInputs) {
      const viewValue = await loadedContract![inputObj.name]();
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

  //  1. display view data
  //  2. display function with input

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
    <div className="flex flex-col lg:justify-around lg-:w-[100%] lg-:flex-row ">
      {/* <button
        className="btn btn-primary"
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        onClick={async () => {
          const tx = await loadedContract?.setPurpose5("cool");
          console.log("tx: ", tx);
        }}>
        test
      </button> */}

      <div className="w-auto bd--red lg-:w-[40%]">
        {/* contract info */}
        <div className="flex items-center justify-around">
          <div className="text-xl font-bold flex--1">{contractName}</div>
          <div className="">
            <Address address={loadedContract?.address as string} />
          </div>
          {/* <div className="mx-2">
            <Balance className="text-xs" address={loadedContract?.address as string} price={1000} provider={provider} />
          </div> */}
        </div>

        {/* variables */}
        <div className="mt-2 border--4 border-base-300  card card-body card--bordered">
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
          <div className="card-title">Dictionary and array</div>
          {/* <div>dictionary and array</div> */}

          <div className="flex flex-wrap w-96  ">
            {contractDicts &&
              contractDicts.map((data, index) => {
                return (
                  <div key={index} className="w-full mt-2">
                    {/* <div>{data.name}</div> */}
                    <DictInput methodName={data.name} inputData={data.inputs} loadedContract={loadedContract} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      {/* <div className="divider lg:divider-horizontal "></div> */}

      {/* functions */}
      <div className="w-auto lg-:w-[45%] bd--red">
        <div className="card card-body card-bordered">
          <div className="card-title">Methods</div>
          {contractFunctions &&
            contractFunctions.map((data, index) => {
              return (
                <div key={index} className="card- card--body card--bordered">
                  {/* <div className="card-title">{data.name}</div> */}
                  <FunctionInputForm
                    methodName={data.name}
                    inputData={data.inputs}
                    loadedContract={loadedContract}
                    isPayable={data.stateMutability === "payable"}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default Index;
