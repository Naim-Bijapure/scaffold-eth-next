import React, { createContext, useEffect, useReducer } from "react";
// import useDexPrice from "../../hooks/useDexPrice";
// import { IStoreState } from "../../types/storeTypes";

export interface IDebugState {
  refreshContract?: boolean;
}
export type dispatch = React.Dispatch<{ payload: any }>;

export type TypeStoreState = [IDebugState, dispatch]; // <-- define your states types

const initialState: IDebugState = { refreshContract: false }; // <--- initial states

const state = [initialState, (): void => undefined];

export const DebugContractContext = createContext([...state] as TypeStoreState);

// global reducer state that can override the properties with payload
const Reducer = (state: IDebugState, action: { payload: any }): any => {
  return { ...state, ...action.payload };
};

const DebugContractProvider: React.FC<any> = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return <DebugContractContext.Provider value={[state, dispatch]}>{children}</DebugContractContext.Provider>;
};

export default DebugContractProvider;
