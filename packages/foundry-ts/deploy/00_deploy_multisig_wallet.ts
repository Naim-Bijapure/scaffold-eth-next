import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  console.log("deployer: ", deployer);
  const CHAIN_ID = 31337;

  const YourContract = await deploy("YourContract", {
    from: deployer,
    args: ["yo"],
    log: true,
  });

  console.log("YourContract.address: ", YourContract.address);

  const YourContract1 = await deploy("YourContract1", {
    from: deployer,
    args: ["yo1"],
    log: true,
  });

  console.log("YourContract.address: ", YourContract1.address);
};
export default func;
func.tags = ["YourContract", "YourContract1"];
