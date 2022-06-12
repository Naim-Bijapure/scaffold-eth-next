import { ethers } from "ethers";
import fs from "fs";
import chalk from "chalk";

async function sendBalanceToLocalAddress(address: string) {
    let localProvider = new ethers.providers.StaticJsonRpcProvider("http://localhost:8545");
    let localSigner = await localProvider.getSigner();
    let tx = await localSigner.sendTransaction({ to: address, value: ethers.utils.parseEther(`100000`) });
    let rctp = await tx.wait();
    let balance = await localProvider.getBalance(address);
    console.log(chalk.white("added local balance: ", ethers.utils.formatEther(balance), "eth"));
    console.log(chalk.white("to deploy on other network transfer some funds on this address"));
    console.log(chalk.black.bgBlue("goto : https://punkwallet.io/"));
}

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
