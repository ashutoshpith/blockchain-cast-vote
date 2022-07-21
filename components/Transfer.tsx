import { NextPage } from "next"
import { useContractPipe } from "../helpers"

const TransferFund: NextPage = () => {
    const { transferData, tranferWrite } = useContractPipe()
    return (
        <div>
            Transfer Fund
            <button onClick={() => tranferWrite()}>Transfer</button>
        </div>
    )
}

export default TransferFund