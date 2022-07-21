import siasContractJson from "../artifacts/contracts/Sias.sol/Sias.json";
import siasGovernorJson from "../artifacts/contracts/SiasGovernor.sol/SiasGovernor.json";
import siasTreasuryJson from "../artifacts/contracts/SiasTreasury.sol/SiasTreasury.json";
import siasTimelockJson from "../artifacts/contracts/SiasTimelock.sol/SiasTimelock.json";
import { ethers } from "ethers";
import { useAccount, useConnect, useDisconnect, useToken, useContractRead, useContractWrite, useEnsName } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

export const SiasAddress = "0xbb66BA6D97C6749EB837B37b6178c3c5805B8452";
export const SiasTreasuryAddress = "0xD33dEC3294B8b3A33EEf328626A9a77224353083";
export const SiasGovernorAddress = "0x6ab8d10b1607eaff994E4328804c84C0e63ee985";
export const SiasTimelockAddress = "0x0C057C41455D032407a4F50f06cE61777bEc3AD7";

export const contractJson = () => {
  return {
    siasContractJson, siasGovernorJson, siasTreasuryJson, siasTimelockJson
  }
}
export function useWalletConnect()  {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()

  return {
    address, isConnected, connect, disconnect
  }
}

export const contractIn = (contractAddress: string,  abi:ethers.ContractInterface) => {
  const tProvider = new ethers.providers.Web3Provider(window.ethereum as any)
  const tSigner = tProvider.getSigner();
  const tContract = new ethers.Contract(contractAddress,abi, tSigner);
  return  tContract as any;

}

export function useContractPipe() {     
    const {data: siasTokenSymbol, isError, isLoading} = useToken({
        address: SiasAddress
      })

    const {data: balance, error: balanceError} = useContractRead({
        addressOrName: SiasAddress,
        contractInterface: siasContractJson.abi,
        functionName: 'balanceOf',
        args: '0x518c8416584dAA54Ca26736aab4914a84E62E2Cd'
    })

    const { data: dataEnsName, error: errorEnsName } = useEnsName({
      address: '0x518c8416584dAA54Ca26736aab4914a84E62E2Cd',
    })

    const amount = ethers.utils.parseEther("50");

    const {
      data: transferData,
      write: tranferWrite
    } = useContractWrite({
      addressOrName: SiasAddress,
      contractInterface: siasContractJson.abi,
      functionName: 'transfer',
      args: ['0x846A9d5fc1Cd8Ace6714376918F141fF9dFAc445', amount, { from : "0x518c8416584dAA54Ca26736aab4914a84E62E2Cd"}]
    })

    return {
        siasTokenSymbol,
        balance: balance?.toString(),
        balanceError,
        dataEnsName,
        errorEnsName,
        transferData,
        tranferWrite
    }
}