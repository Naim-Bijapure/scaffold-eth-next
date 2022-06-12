import { Chain, chain } from "wagmi";
import { YourContract__factory } from "../../contracts/contract-types";
import foundryContracts from "../../contracts/foundry_contracts.json";

// import { Chain, chain, configureChains, createClient, WagmiConfig } from "wagmi";

/**----------------------
 * define your contracts like   YourContract: { factory: YourContract__factory, json: foundryContracts }
 * inside ContractsConfig
 * ---------------------*/
export let ContractsConfig = {
    YourContract: { factory: YourContract__factory, json: foundryContracts },
} as const;

/**----------------------
 * add targeted chain names
 * ---------------------*/
// let TARGATED_CHAINS = ["hardhat", "rinkeby", "mainnet"];
let TARGATED_CHAINS = ["hardhat", "rinkeby"];

export type contractNameType = keyof typeof ContractsConfig;

export const targetNetowrks = (requiredChains: string[]) => {
    let targetedChains: Chain[] = [];
    type chainNameType = keyof typeof chain;
    Object.keys(chain).forEach((chainName: string) => {
        if (requiredChains.includes(chainName)) {
            targetedChains.push(chain[chainName]);
        }
    });
    return targetedChains;
};

export const targedChains = targetNetowrks([...TARGATED_CHAINS]);
