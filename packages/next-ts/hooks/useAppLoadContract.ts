/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ethers } from "ethers";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useContract, useNetwork, useProvider, useSigner } from "wagmi";

import { contractNameType, ContractsConfig } from "../components/configs/appContract.config";

interface IuseAppLoadContract {
  contractName: contractNameType;
}

/** ----------------------
 * a hook to loads the app contracts from  ContractsConfig
 * ---------------------*/
const useAppLoadContract = ({ contractName }: IuseAppLoadContract) => {
  type factoryConnectType = typeof ContractsConfig[typeof contractName]["factory"]["connect"];
  type contractType = NonNullable<ReturnType<factoryConnectType>>;

  const { theme } = useTheme();
  const [contract, setContract] = useState<contractType>();

  const { data: signerData } = useSigner();
  const provider = useProvider();

  const { activeChain, chains } = useNetwork();
  const chainId = Number(activeChain?.id);

  const contractAddress =
    ContractsConfig[contractName]["json"][chainId] !== undefined
      ? ContractsConfig[contractName]["json"][chainId]["contracts"][contractName]["address"]
      : ethers.constants.AddressZero;

  const contractInstance = useContract<contractType>({
    addressOrName: contractAddress,
    contractInterface: ContractsConfig[contractName].factory.abi,
    signerOrProvider: signerData,
  });

  const checkDeplyedContracState = async () => {
    try {
      const deployedCode = await provider?.getCode(contractInstance.address);
      if (deployedCode !== "0x") {
        setContract(contractInstance);
      }

      if (deployedCode === "0x") {
        toast.error("Please deploy contract !!!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: false,
          theme: theme as any,
        });

        setContract(undefined);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    //     checking if signerData?.getAddress is loaded then create contract instance
    if (signerData?.getAddress !== undefined) {
      void checkDeplyedContracState();
    }
  }, [signerData?.getAddress]);

  return contract;
};
export default useAppLoadContract;
