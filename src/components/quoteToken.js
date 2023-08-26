import {MdOutlineToken} from "react-icons/md"

const QuoteToken=props=>{
    const quoteToken=props
    const {name,symbol,address}=quoteToken.quoteToken
    return(
        <div className="pair-info">
            <h1 className="head">QuoteToken</h1>
            <li>Address : {address}</li>
                <li>Name : {name}</li>
                <li>Symbol : {symbol}</li>

            
            
            <div className="pair-icon">
                <MdOutlineToken/>


            </div>
        </div>
      
    )
}

export default QuoteToken