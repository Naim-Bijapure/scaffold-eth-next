import { Chain, chain } from "wagmi";
import { YourContract__factory, YourContract1__factory } from "../../contracts/contract-types";
import hardhatConfgJson from "../../contracts/hardhat_contracts.json";

// import { Chain, chain, configureChains, createClient, WagmiConfig } from "wagmi";

/**----------------------
 * define your contracts
 * ---------------------*/
export let ContractsConfig = {
    YourContract: { factory: YourContract__factory, json: hardhatConfgJson },
    YourContract1: { factory: YourContract1__factory, json: hardhatConfgJson },
} as const;

/**----------------------
 * add targeted chain names
 * ---------------------*/
let TARGATED_CHAINS = ["hardhat", "rinkeby", "mainnet"];

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
