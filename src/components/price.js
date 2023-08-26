import {BsCurrencyDollar} from "react-icons/bs"

const Price=props=>{
    
    const {priceNative,priceUsd}=props
    return(
        <div className="pair-info">
            <h1 className="head">Price</h1>
            
            
                <li>Price Native : {priceNative}</li>
                <li>Price USD : {priceUsd}</li>
                
            
            <div className="pair-icon">
                <BsCurrencyDollar/>


            </div>
        </div>
    )
}

export default Price