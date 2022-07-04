import { Chain, chain } from "wagmi";

import { YourContract__factory } from "../../contracts/contract-types";
import foundryContracts from "../../contracts/foundry_contracts.json";

/** ----------------------
 * define your contracts like   YourContract: { factory: YourContract__factory, json: foundryContracts }
 * inside ContractsConfig
 * ---------------------*/
export const ContractsConfig = {
  YourContract: { factory: YourContract__factory, json: foundryContracts },
} as const;

/** ----------------------
 * add targeted chain names
 * ---------------------*/
const TARGATED_CHAINS = ["hardhat", "rinkeby", "mainnet"];
// define your target names in root .env file inside NEXT_PUBLIC_TARGET_NETWORKS variable
// const TARGATED_CHAINS = [...(process.env.NEXT_PUBLIC_TARGET_NETWORKS as string).split(",")];

export type contractNameType = keyof typeof ContractsConfig;

export const targetNetowrks = (requiredChains: string[]): Chain[] => {
  const targetedChains: Chain[] = [];
  //   type chainNameType = keyof typeof chain;

  Object.keys(chain).forEach((chainName: string) => {
    if (requiredChains.includes(chainName)) {
      targetedChains.push(chain[chainName] as Chain);
    }
  });
  return targetedChains;
};

export const targedChains = targetNetowrks([...TARGATED_CHAINS]);
