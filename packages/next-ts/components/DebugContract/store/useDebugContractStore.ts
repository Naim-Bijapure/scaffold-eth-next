import { useContext } from "react";

import { TypeStoreState, DebugContractContext } from "./DebugContractProvider";

export const useDebugContractStore = (): TypeStoreState => useContext(DebugContractContext);
