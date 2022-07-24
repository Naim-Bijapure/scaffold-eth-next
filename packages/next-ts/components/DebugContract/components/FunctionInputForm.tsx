/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { StaticJsonRpcProvider } from "@ethersproject/providers";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Sleep } from "../configs/utils";
import { useDebugContractStore } from "../store/useDebugContractStore";

interface IFunctionInputForm {
  methodName: any;
  inputData: any[];
  loadedContract: any;
  isPayable: boolean;
  mainProvider: StaticJsonRpcProvider;
}

const FunctionInputForm: React.FC<IFunctionInputForm> = ({
  methodName,
  inputData,
  loadedContract,
  isPayable,
  mainProvider,
}) => {
  const [state, dispatch] = useDebugContractStore();
  const [isEnsLoading, setIsEnsLoading] = useState(false);
  const [outputData, setOutputData] = useState<any>();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm<any>();

  useEffect(() => {
    const multipleSubscriptions = {};
    inputData.map((data) => {
      if (data.type === "address") {
        multipleSubscriptions[data.name] = watch(async (data, { name, type }) => {
          if (data[name as string]?.includes(".eth")) {
            await Sleep(500);
            setValue(name as string, "");
            setIsEnsLoading(() => true);
            const ensName = data[name as string];
            const ensAddress = await mainProvider.resolveName(ensName as string);
            setValue(name as string, ensAddress);
            setIsEnsLoading(() => false);
          }
        });
      }
    });

    // console.log("multipleSubscriptions: ", multipleSubscriptions);

    return () => {
      inputData.map((data) => {
        if (data.type === "address") {
          multipleSubscriptions[data.name]?.unsubscribe();
        }
      });
    };
  }, []);

  //   call contract function
  const onSubmit: SubmitHandler<any> = async (data) => {
    // const ens = await mainProvider.resolveName("naimbijapure.eth");
    // console.log("ens: ", ens);

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
    <div className="card card-body card-bordered">
      <form
        onSubmit={handleSubmit(onSubmit)}
        // className="flex flex--col border--2 form-control card card-body card-bordered shadow-sm border-base-300">
        className="flex flex-row items-start justify-between  form-control   ">
        {/* <div className={`card--title `}>{methodName}</div> */}
        <div className={`mt-2 opacity-70 font-bold`}>{methodName}</div>
        {/* if the input is function */}
        <div className="flex flex-col  justify-end ">
          <div className="flex flex-col items-end justify-end ">
            {inputData.map((data, index) => {
              return (
                <div key={index} className="w-full">
                  <label className="mt-2 input-group  ">
                    <input
                      type={data.type.includes("uint") ? "number" : "text"}
                      placeholder={isEnsLoading === false ? data.type : "Loading ens"}
                      {...register(data.name, { required: true, valueAsNumber: data.type.includes("uint") })}
                      className="w-full input input-bordered"
                      disabled={isEnsLoading}
                    />
                    <span>{data.name}</span>
                  </label>
                  <div>{errors[data.name] && <span className="text-red-500">This field is required</span>}</div>
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
                    placeholder={"Enter tx value in eth"}
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
            <button type="submit" className="btn btn-primary " disabled={isEnsLoading}>
              Send
            </button>
          </div>
        </div>
      </form>
      <div className="w-full">
        {outputData && outputData[methodName] && (
          <div tabIndex={0} className="mt-2 border collapse collapse-arrow border-base-300 bg-base-100 rounded-box">
            <div className="text-xl font-medium collapse-title">Output </div>
            <div className="collapse-content">
              <p>
                <div className="mockup-code ">
                  <pre data-prefix=">">
                    <code className="">{outputData[methodName]}</code>
                  </pre>
                </div>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FunctionInputForm;
