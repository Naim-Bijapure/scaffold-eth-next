import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { Chain, chain, configureChains, createClient } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { YourContract__factory } from "../../contracts/contract-types";
import foundryContracts from "../../contracts/foundry_contracts.json";

export type contractNameType = keyof typeof ContractsConfig;

/** ----------------------
 * define your contracts like   YourContract: { factory: YourContract__factory, json: foundryContracts }
 * inside ContractsConfig
 * ---------------------*/
export const ContractsConfig = {
  YourContract: { factory: YourContract__factory, json: foundryContracts },
} as const;

const TARGATED_CHAINS = ["hardhat", "rinkeby", "mainnet"]; // <---- define your target network

// disabled: define your target names in root .env file inside NEXT_PUBLIC_TARGET_NETWORKS variable
// const TARGATED_CHAINS = [...(process.env.NEXT_PUBLIC_TARGET_NETWORKS as string).split(",")];

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

/** ----------------------
 * RAINBOW KIT COFIGS
 * ---------------------*/
export const targedChains = targetNetowrks([...TARGATED_CHAINS]);

export const { chains, provider } = configureChains(
  [...targedChains],
  [alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }), publicProvider()]
); // <---- configure your custom chain

const { connectors } = getDefaultWallets({
  appName: "Scaffold-eth-next",
  chains,
});

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
