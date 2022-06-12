import * as qrcode from "qrcode-terminal";
import { ethers } from "ethers";

import { NETWORKS } from "@scaffold-eth/common/src/constants/networks";
import account from "../generated/account.json";

async function run() {
    let address = account.address;
    qrcode.generate(address);
    console.log(`‍📬 Deployer Account is ${address}`);
    for (const n in NETWORKS) {
        try {
            const network: any = NETWORKS;
            const { url } = network[n];
            const provider = new ethers.providers.JsonRpcProvider(url);
            const balance = await provider.getBalance(address);
            console.log(` -- ${n} --  -- -- 📡 `);
            console.log(`   balance: ${ethers.utils.formatEther(balance)}`);
            console.log(`   nonce: ${await provider.getTransactionCount(address)}`);
        } catch (err) {
            // console.log("err: ", err);
        }
    }
}

run();
