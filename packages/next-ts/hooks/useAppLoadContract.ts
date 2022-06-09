import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useSigner, useContract, useNetwork } from "wagmi";
import { contractNameType, ContractsConfig } from "../configs/appContract.config";

interface IuseAppLoadContract {
    contractName: contractNameType;
}

/**----------------------
 * a hook to load the app contracts from  ContractsConfig
 * ---------------------*/
const useAppLoadContract = ({ contractName }: IuseAppLoadContract) => {
    type factoryConnectType = typeof ContractsConfig[typeof contractName]["factory"]["connect"];
    type contractType = NonNullable<ReturnType<factoryConnectType>>;

    const [contract, setContract] = useState<contractType>();

    const { data: signerData } = useSigner();

    const { activeChain, chains, error, pendingChainId, switchNetwork, isLoading, isSuccess } = useNetwork();
    const chainId = Number(activeChain?.id);

    const contractAddress =
        ContractsConfig[contractName]["json"][chainId] !== undefined
            ? ContractsConfig[contractName]["json"][chainId][0]["contracts"][contractName]["address"]
            : ethers.constants.AddressZero;

    const contractInstance = useContract<contractType>({
        addressOrName: contractAddress,
        contractInterface: ContractsConfig[contractName].factory.abi,
        signerOrProvider: signerData,
    });

    useEffect(() => {
        //     checking if signerData?.getAddress is loaded then create contract instance
        if (signerData?.getAddress !== undefined) {
            setContract(contractInstance);
        }
    }, [signerData?.getAddress]);

    return contract;
};
export default useAppLoadContract;
