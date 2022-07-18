import React, { createContext, useEffect, useReducer, useState } from "react";

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
  const [mounted, setMounted] = useState(false);
  const [state, dispatch] = useReducer(Reducer, initialState);

  const { ethPrice, usdPrice } = useDexPrice();

  useEffect(() => {
    dispatch({ payload: { ethPrice } }); // <---- eg: dispatch global states with payload and state properties
  }, [ethPrice]);

  // default nextjs hydrtion issue managed
  useEffect(() => setMounted(true), []); // at init only
  if (!mounted) {
    return null;
  }

  return <StoreContext.Provider value={[state, dispatch]}>{children}</StoreContext.Provider>;
};

export default StoreProvider;
