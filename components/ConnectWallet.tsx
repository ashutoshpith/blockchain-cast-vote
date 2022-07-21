import { NextPage } from "next";
import { useState } from "react";
import { useWalletConnect } from "../helpers";

const ConnectWallet: NextPage = () => {
    const [walletBtnMsg, setWalletBtnMsg] = useState("Connect To Wallet")
    const connectionRef =  useWalletConnect()
    const [address, setAddress] = useState("")

    const connectWalletHandler = async () => {
        const windows = window as any;
        const {address, connect}  =  connectionRef
         if(windows?.ethereum) {
           connect();
          if(address) {
            setWalletBtnMsg("Wallet Connected")
            localStorage.setItem("address-id", address)
            setAddress(address)
          }
         } else {
          console.log("Eroor ", windows);
         }
      }
      

     return (
        <div>
      <button onClick={connectWalletHandler}>  {walletBtnMsg}</button>
      <div>Address {address}</div>
        </div>
     );
}

export default ConnectWallet;