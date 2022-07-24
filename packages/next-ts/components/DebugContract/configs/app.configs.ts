import { StaticJsonRpcProvider } from "@ethersproject/providers";
const RPC_MAINNET = "https://rpc.scaffoldeth.io:48544";
export const mainProvider = new StaticJsonRpcProvider(RPC_MAINNET);
