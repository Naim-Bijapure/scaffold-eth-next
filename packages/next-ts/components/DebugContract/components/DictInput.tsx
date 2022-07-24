/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { StaticJsonRpcProvider } from "@ethersproject/providers";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Sleep } from "../configs/utils";
import { useDebugContractStore } from "../store/useDebugContractStore";

interface IDictInput {
  methodName: any;
  inputData: any[];
  loadedContract: any;
  mainProvider: StaticJsonRpcProvider;
}
const DictInput: React.FC<IDictInput> = ({ methodName, inputData, loadedContract, mainProvider }) => {
  const [state, dispatch] = useDebugContractStore();

  const [dictValue, setDictValue] = useState<any>();
  const [isEnsLoading, setIsEnsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm<any>();

  const isAddress = inputData.findIndex((data) => data.type === "address");

  useEffect(() => {
    let watchSubscribe;
    if (isAddress !== -1) {
      watchSubscribe = watch(async (data, { name, type }) => {
        if (data[name as string]?.includes(".eth")) {
          await Sleep(500);
          setValue(methodName, "");
          setIsEnsLoading(() => true);
          const ensName = data[name as string];
          const ensAddress = await mainProvider.resolveName(ensName as string);
          setValue(methodName, ensAddress);
          setIsEnsLoading(() => false);
        }
      });
    }

    return () => watchSubscribe?.unsubscribe();
  }, []);

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
                    placeholder={
                      isEnsLoading === false
                        ? `Enter ${data.type === "address" ? "ens" : data.type} value`
                        : "Loading ens"
                    }
                    {...register(methodName, { required: true })}
                    className="w-full max-w-xs input input-bordered "
                    disabled={isEnsLoading}
                  />
                  <input
                    type="text"
                    value={dictValue}
                    className={`input input-bordered ${dictValue ? "block" : "hidden"}`}
                    disabled
                  />
                  <button type="submit" className="btn btn-primary " disabled={isEnsLoading}>
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

export default DictInput;
