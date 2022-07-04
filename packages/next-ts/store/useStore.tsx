import { useContext } from "react";
import { TypeStoreState, StoreContext } from "./StoreProvider";

export const useStore = (): TypeStoreState => useContext(StoreContext);
