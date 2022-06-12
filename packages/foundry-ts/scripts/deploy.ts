import { spawn } from "node:child_process";
import { TNetworkNames } from "@scaffold-eth/common/src/models/TNetworkNames";
import chalk from "chalk";
import fs from "fs";

import { NETWORKS } from "@scaffold-eth/common/src/constants/networks";
import account from "../generated/account.json";
import { DEPLOY_CONTRACTS } from "../configs";

let args = process.argv.slice(2);

const network = args.length === 0 ? ("localhost" as TNetworkNames) : (args[1] as TNetworkNames);
console.log(chalk.blueBright(`deploying to network => ${network}`));
let address = account.address;
let privateKey = account.privateKey;
// const CONTRACTS_FILE = "./generated/foundry_contracts.json";
const CONTRACTS_FILE = "../next-ts/contracts/foundry_contracts.json";

const deploy = async (contractName: string, { args }: { args: string[] }) => {
    let currentNetwork = NETWORKS[network];
    let networkUrl = currentNetwork.url;

    return new Promise((resolve, reject) => {
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
        deploy.stdout.on("data", (data) => {
            if (data.toString().includes("Deployed to:")) {
                let output = data.toString();

                let deployedCotractAddress = output.split(":")[2];
                deployedCotractAddress = String(deployedCotractAddress).split("\n")[0].trim();
                console.log(`Contract => ${contractName} is Deployed at => ${deployedCotractAddress}`);
                let contractData = {
                    [currentNetwork.chainId]: { contracts: { [contractName]: { address: deployedCotractAddress } } },
                };

                const isExists = fs.existsSync(CONTRACTS_FILE);
                if (isExists == false) {
                    fs.writeFileSync(CONTRACTS_FILE, JSON.stringify(contractData, null, 4), "utf8");
                }

                if (isExists) {
                    let oldFileData = fs.readFileSync(CONTRACTS_FILE);
                    let contractsData = JSON.parse(oldFileData.toString());
                    //     console.log("contractsData: ", JSON.stringify(contractsData));
                    let currentContractData = { [contractName]: { address: deployedCotractAddress } };
                    let isChainIdExist = contractsData[currentNetwork.chainId] ? true : false;
                    if (isChainIdExist) {
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

        deploy.stderr.on("data", (data) => {
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

async function run() {
    console.log(chalk.blueBright(`deploying...`));

    for (const contract of DEPLOY_CONTRACTS) {
        await deploy(contract.contractName, { args: [...contract.args] });
    }
}
run();
