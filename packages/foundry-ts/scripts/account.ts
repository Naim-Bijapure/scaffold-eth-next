import { NETWORKS } from "@scaffold-eth/common/src/constants/networks";
import { ethers } from "ethers";
import * as qrcode from "qrcode-terminal";

import account from "../generated/account.json";

async function run(): Promise<any> {
  const address = account.address;
  qrcode.generate(address);
  console.log(`‍📬 Deployer Account is ${address}`);
  for (const n in NETWORKS) {
    try {
      const network: any = NETWORKS;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { url } = network[n];
      const provider = new ethers.providers.JsonRpcProvider(url as string);
      const balance = await provider.getBalance(address);
      console.log(` -- ${n} --  -- -- 📡 `);
      console.log(`   balance: ${ethers.utils.formatEther(balance)}`);
      console.log(`   nonce: ${await provider.getTransactionCount(address)}`);
    } catch (err) {
      // console.log("err: ", err);
    }
  }
}

run().catch((err) => {
  console.log("err: ", err);
});
