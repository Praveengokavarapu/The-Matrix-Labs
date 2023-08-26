import {BiInfoCircle} from "react-icons/bi"

const BasicInfo=props=>{
    const basicDetails=props
    const {chainId,dexId,pairAddress}=basicDetails
    return(
        <div className="pair-info">
            <h1 className="head">BasicInfo</h1>
            
                <li>Created At : {chainId}</li>
                <li>DexId : {dexId}</li>
                <li>PairAddress : {pairAddress}</li>
            <div className="pair-icon">
                <BiInfoCircle/>


            </div>
        
        </div>
    )
}

export default BasicInfo