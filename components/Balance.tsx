import { NextPage } from "next";
import {  useState } from "react";
import {  useContractPipe } from "../helpers";

const Balance: NextPage = () => {
    const [bal, setBal] = useState(null)
    const {balance, balanceError} = useContractPipe()

  const getBalance =async () => {
    if(!balanceError){
        setBal(balance as any)
    }
   }
  
    return (
        <div>
             Balance: {bal}
             <br></br>  
            <button onClick={getBalance}>Get Balance</button>
    
        </div>
    )
}


export default Balance