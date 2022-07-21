import { NextPage } from "next";
import { useState } from "react";
import { useContractPipe } from "../helpers";

const EnsName: NextPage = () => {
    const {dataEnsName} = useContractPipe()
    const [name, setName] = useState()

    const getEns = () => {
       setName(dataEnsName as any)
    }
    return (
        <div>
            Ens Name {name}
            <br></br>
            <button onClick={getEns}>Get Ens Name</button>
        </div>
    )
}

export default EnsName;