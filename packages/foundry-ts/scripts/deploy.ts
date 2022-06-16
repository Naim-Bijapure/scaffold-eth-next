import fs from "fs";
import { spawn } from "node:child_process";
import path from "node:path";

import { NETWORKS } from "@scaffold-eth/common/src/constants/networks";
import { TNetworkNames } from "@scaffold-eth/common/src/models/TNetworkNames";
import chalk from "chalk";
import dotenv from "dotenv";
import { ethers } from "ethers";

import { DEPLOY_CONTRACTS } from "../configs";
// import account from "../generated/account.json";
import sendBalanceToLocalAddress from "../helpers/sendBalanceToLocalAddress";

type accountType = {
  address: string;
  publicKey: string;
  privateKey: string;
};

// load root .env file
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const args = process.argv.slice(2);

// check account.json file
const isAccountExist = fs.existsSync(path.resolve(__dirname, "../generated/account.json"));

if (isAccountExist === false) {
  console.log("--------");
  console.log(chalk.bgRedBright.white("account is not generated please run > yarn generate"));
  // @ts-ignore
  return false;
}

// read account.json file and convert to object
const accountData: string = fs.readFileSync(path.resolve(__dirname, "../generated/account.json")).toString();

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const account: accountType = JSON.parse(accountData);

const network = args.length === 0 ? ("localhost" as TNetworkNames) : (args[1] as TNetworkNames);
console.log(chalk.blueBright(`deploying to network => ${network}`));
const address = account.address;
const privateKey = account.privateKey;
// const CONTRACTS_FILE = "./generated/foundry_contracts.json";
const CONTRACTS_FILE = "../next-ts/contracts/foundry_contracts.json";

const deploy = async (contractName: string, { args }: { args: string[] }): Promise<any> => {
  const currentNetwork = NETWORKS[network];
  const networkUrl = currentNetwork.url;

  return new Promise((resolve, _reject) => {
    const deploy = spawn("forge", [
      "create",
      "--rpc-url",
      networkUrl,
      "--private-key",
      privateKey,
      `${contractName}`,
      "--constructor-args",
      ...args,
      network !== "localhost" ? "--verify" : "",
    ]);
    deploy.stdout.on("data", (data: string) => {
      if (data.toString().includes("Deployed to:")) {
        const output = data.toString();

        let deployedCotractAddress = output.split(":")[2];
        deployedCotractAddress = String(deployedCotractAddress).split("\n")[0].trim();
        console.log(`Contract => ${contractName} is Deployed at => ${deployedCotractAddress}`);
        const contractData = {
          [currentNetwork.chainId]: {
            contracts: { [contractName]: { address: deployedCotractAddress } },
          },
        };

        const isExists = fs.existsSync(CONTRACTS_FILE);
        if (isExists === false) {
          fs.writeFileSync(CONTRACTS_FILE, JSON.stringify(contractData, null, 4), "utf8");
        }

        if (isExists) {
          const oldFileData = fs.readFileSync(CONTRACTS_FILE);
          const contractsData = JSON.parse(oldFileData.toString()) as Record<string, any>;
          //     console.log("contractsData: ", JSON.stringify(contractsData));
          const currentContractData = {
            [contractName]: { address: deployedCotractAddress },
          };
          const isChainIdExist = contractsData[currentNetwork.chainId] ? true : false;
          if (isChainIdExist) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            contractsData[currentNetwork.chainId]["contracts"] = {
              ...contractsData[currentNetwork.chainId]["contracts"],
              ...currentContractData,
            };
          } else {
            contractsData[currentNetwork.chainId] = {};
            contractsData[currentNetwork.chainId]["contracts"] = {
              ...currentContractData,
            };
          }

          fs.writeFileSync(CONTRACTS_FILE, JSON.stringify(contractsData, null, 4), "utf8");
        }
      }
    });

    deploy.stderr.on("data", (data: string) => {
      console.log("data: ", data.toString());
    });
    deploy.on("exit", (code) => {
      if (code === 0) {
        resolve(true);
      }
      if (code !== 0) {
        console.log(chalk.yellowBright("something went wrong"));
        console.warn(chalk.redBright(`Try providing funds to generated account address => ${address}`));
        console.log(chalk.blue.bgWhiteBright("goto https://punkwallet.io/"));
      }
    });
  });
};

async function run(): Promise<any> {
  console.log(chalk.blueBright(`deploying...`));

  try {
    if (network === "localhost") {
      const localProvider = new ethers.providers.StaticJsonRpcProvider(process.env.STATIC_LOCAL_RPC);
      const balanceBigNumber = await localProvider.getBalance(address);
      const balance = ethers.utils.formatEther(balanceBigNumber).toString();
      // if initial balance is zero at start
      if (Number(balance) === 0) {
        await sendBalanceToLocalAddress(address);
      }

      // const balanceBigNumber1 = await localProvider.getBalance(address);
      // const balance1 = ethers.utils.formatEther(balanceBigNumber1).toString();
    }

    for (const contract of DEPLOY_CONTRACTS) {
      await deploy(contract.contractName, { args: [...contract.args] });
    }
  } catch (error) {
    if (network === "localhost") {
      console.log("--------");
      console.log(chalk.white.bgRedBright("please start foundry anvil server in new terminal run => yarn chain"));
    }
  }
}
run().catch((error) => {
  console.log("error: ", error);
});
