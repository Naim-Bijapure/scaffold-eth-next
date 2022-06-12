import { ethers } from "ethers";
import fs from "fs";
import chalk from "chalk";
import sendBalanceToLocalAddress from "helpers/sendBalanceToLocalAddress";


async function run() {
    // create a random wallet

    const wallet = ethers.Wallet.createRandom();

    const { privateKey, publicKey, address } = wallet;
    let accountData = {
        address,
        publicKey,
        privateKey,
    };

    let FILE_LOCATION = "./generated/account.json";

    if (fs.existsSync(FILE_LOCATION)) {
        fs.unlinkSync(FILE_LOCATION);
    }

    fs.writeFile(FILE_LOCATION, JSON.stringify(accountData), () => {
        console.log(chalk.whiteBright("account created with address: "), chalk.black.bgWhite(accountData.address));
        sendBalanceToLocalAddress(accountData.address);
    });
}
run();
