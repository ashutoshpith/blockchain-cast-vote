import siasContractJson from "../artifacts/contracts/Sias.sol/Sias.json";
import siasGovernorJson from "../artifacts/contracts/SiasGovernor.sol/SiasGovernor.json";
import siasTreasuryJson from "../artifacts/contracts/SiasTreasury.sol/SiasTreasury.json";
import siasTimelockJson from "../artifacts/contracts/SiasTimelock.sol/SiasTimelock.json";

import { useState } from "react";

import { useAccount, useConnect, useDisconnect, useToken, useContractRead, useContractWrite } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

const siasAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const siasTreasuryAddress = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6";
const siasGovernorAddress = "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853";
const siasTimelockAddress = "0x0165878A594ca255338adfa4d48449f69242Eb8F";

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
        args: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
        // args: address,
        onSuccess(data) {
            console.log('Success', data)
          },
    })

    return {
        siasTokenSymbol,
        balance
    }
}