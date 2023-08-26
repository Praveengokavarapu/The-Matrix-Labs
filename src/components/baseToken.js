import {MdOutlineToken} from "react-icons/md"

const BaseToken=props=>{
    const baseToken=props
    
    const {address,name,symbol}=baseToken.baseToken
  
    return(
        <div className="pair-info">
            <h1 className="head">Base Token</h1>
            <li>Address : {address}</li>
                <li>Name : {name}</li>
                <li>Symbol : {symbol}</li>

            <div className="pair-icon">
                <MdOutlineToken/>


            </div>
        </div>
    )
}

export default BaseToken