import fs from "fs";

import chalk from "chalk";
import { ethers } from "ethers";

import sendBalanceToLocalAddress from "../helpers/sendBalanceToLocalAddress";

function run(): any {
  // create a random wallet

  const wallet = ethers.Wallet.createRandom();

  const { privateKey, publicKey, address } = wallet;
  const accountData = {
    address,
    publicKey,
    privateKey,
  };

  const FILE_LOCATION = "./generated/account.json";

  if (fs.existsSync(FILE_LOCATION)) {
    fs.unlinkSync(FILE_LOCATION);
  }

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  fs.writeFile(FILE_LOCATION, JSON.stringify(accountData), async (): Promise<any> => {
    console.log(chalk.whiteBright("account created with address: "), chalk.black.bgWhite(accountData.address));
    await sendBalanceToLocalAddress(accountData.address);
  });
}
run();
