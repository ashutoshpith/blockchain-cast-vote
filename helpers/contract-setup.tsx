import siasContractJson from "../artifacts/contracts/Sias.sol/Sias.json";
import siasGovernorJson from "../artifacts/contracts/SiasGovernor.sol/SiasGovernor.json";
import siasTreasuryJson from "../artifacts/contracts/SiasTreasury.sol/SiasTreasury.json";
import siasTimelockJson from "../artifacts/contracts/SiasTimelock.sol/SiasTimelock.json";

import { useState } from "react";

import { useAccount, useConnect, useDisconnect, useToken, useContractRead, useContractWrite } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

const siasAddress = "0xbb66BA6D97C6749EB837B37b6178c3c5805B8452";
const siasTreasuryAddress = "0xD33dEC3294B8b3A33EEf328626A9a77224353083";
const siasGovernorAddress = "0x6ab8d10b1607eaff994E4328804c84C0e63ee985";
const siasTimelockAddress = "0x0C057C41455D032407a4F50f06cE61777bEc3AD7";

export const WalletContract = async (

) => {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()

  return {
    address, isConnected, connect, disconnect
  }
}

export const InitContract =  (address: string, ) => {
    
    const [siasContract, setSiasContract] = useState(null);
    // const [balance, setBalance] = useState("");
     
    const {data: siasTokenSymbol, isError, isLoading} = useToken({
        address: siasAddress
      })

    const {data: balance} = useContractRead({
        addressOrName: siasAddress,
        contractInterface: siasContractJson.abi,
        functionName: 'balanceOf',
        args: '0x518c8416584dAA54Ca26736aab4914a84E62E2Cd',
        onSuccess(data) {
            console.log('Success', data)
          },
    })

    return {
        siasTokenSymbol,
        balance
    }
}