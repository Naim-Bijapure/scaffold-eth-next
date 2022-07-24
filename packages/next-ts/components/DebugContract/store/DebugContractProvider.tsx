import ethers from "ethers";
import React, { createContext, useEffect, useReducer, useState } from "react";

import useDexPrice from "../hooks/useDexPrice";
// import useDexPrice from "../../hooks/useDexPrice";
// import { IStoreState } from "../../types/storeTypes";

export type contractsType = { contractName: string; contract: ethers.BaseContract }[];
export interface IDebugState {
  refreshContract?: boolean;
  ethPrice: number;
  contracts: contractsType;
}
export type dispatch = React.Dispatch<{ payload: any }>;

export type TypeStoreState = [IDebugState, dispatch]; // <-- define your states types

const contracts: contractsType = [];

const initialState: IDebugState = { refreshContract: false, ethPrice: 0, contracts: contracts }; // <--- initial states

const state = [initialState, (): void => undefined];

export const DebugContractContext = createContext([...state] as TypeStoreState);

// global reducer state that can override the properties with payload
const Reducer = (state: IDebugState, action: { payload: any }): any => {
  return { ...state, ...action.payload };
};

interface IDebugContractProvider {
  children: any;
  contracts: contractsType;
}

const DebugContractProvider: React.FC<IDebugContractProvider> = ({ children, contracts }) => {
  const [mounted, setMounted] = useState(false);
  const [state, dispatch] = useReducer(Reducer, initialState);

  const { ethPrice, usdPrice } = useDexPrice();

  /** ----------------------
   * set eth price
   * ---------------------*/
  useEffect(() => {
    dispatch({ payload: { ethPrice } }); // <---- eg: dispatch global states with payload and state properties
  }, [ethPrice]);

  /** ----------------------
   * set contracts
   * ---------------------*/
  useEffect(() => {
    if (contracts && contracts.length > 0) {
      dispatch({ payload: { contracts } });
    }
  }, [contracts?.length]);

  // default nextjs hydrtion issue managed
  useEffect(() => setMounted(true), []); // at init only
  if (!mounted) {
    return null;
  }

  return <DebugContractContext.Provider value={[state, dispatch]}>{children}</DebugContractContext.Provider>;
};

export default DebugContractProvider;
