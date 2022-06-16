import chalk from "chalk";
import { ethers } from "ethers";

export default async function sendBalanceToLocalAddress(address: string): Promise<any> {
  try {
    const localProvider = new ethers.providers.StaticJsonRpcProvider(process.env.STATIC_LOCAL_RPC);
    const localSigner = localProvider.getSigner();
    const tx = await localSigner.sendTransaction({ to: address, value: ethers.utils.parseEther(`100000`) });
    await tx.wait();
    const balance = await localProvider.getBalance(address);
    console.log(chalk.white("added local balance: ", ethers.utils.formatEther(balance), "eth"));
    console.log(chalk.white("to deploy on other network transfer some funds on this address"));
    console.log(chalk.black.bgBlue("goto : https://punkwallet.io/"));
  } catch (error) {
    console.log("--------");
    console.log(chalk.white.bgRedBright("please start foundry anvil server run => yarn chain"));
  }
}
