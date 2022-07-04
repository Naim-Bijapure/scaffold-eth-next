import React, { createContext, useEffect, useReducer } from "react";

import useDexPrice from "../hooks/useDexPrice";
import { dispatch, IStoreState } from "../types/storeTypes";

export type TypeStoreState = [IStoreState, dispatch]; // <-- define your states types

const initialState: IStoreState = { ethPrice: 0 }; // <--- initial states

const state = [initialState, (): void => undefined];

export const StoreContext = createContext([...state] as TypeStoreState);

// global reducer state that can override the properties with payload
const Reducer = (state: IStoreState, action: { payload: any }): any => {
  return { ...state, ...action.payload };
};

const StoreProvider: React.FC<any> = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const { ethPrice, usdPrice } = useDexPrice();

  useEffect(() => {
    dispatch({ payload: { ethPrice } }); // <---- eg: dispatch global states with payload and state properties
  }, [ethPrice]);

  return <StoreContext.Provider value={[state, dispatch]}>{children}</StoreContext.Provider>;
};

export default StoreProvider;
