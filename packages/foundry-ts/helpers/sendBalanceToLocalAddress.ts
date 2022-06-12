import chalk from "chalk";
import { ethers } from "ethers";

export default async function sendBalanceToLocalAddress(address: string) {
    let localProvider = new ethers.providers.StaticJsonRpcProvider(process.env.STATIC_LOCAL_RPC);
    let localSigner = await localProvider.getSigner();
    let tx = await localSigner.sendTransaction({ to: address, value: ethers.utils.parseEther(`100000`) });
    let rctp = await tx.wait();
    let balance = await localProvider.getBalance(address);
    console.log(chalk.white("added local balance: ", ethers.utils.formatEther(balance), "eth"));
    console.log(chalk.white("to deploy on other network transfer some funds on this address"));
    console.log(chalk.black.bgBlue("goto : https://punkwallet.io/"));
}
