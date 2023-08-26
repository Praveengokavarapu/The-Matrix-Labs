import BasicInfo from "./basicInfo"
import Price from "./price"
import BaseToken from "./baseToken"
import QuoteToken from "./quoteToken"



const Pair=props=>{
    const details=props
    
    const {baseToken,chainId,dexId,quoteToken,priceUsd,priceNative,pairAddress}=details.details
    
    return(
        <div className="pair">
            <BasicInfo chainId={chainId} dexId={dexId} pairAddress={pairAddress}/>
            <BaseToken baseToken={baseToken}/>
            <QuoteToken quoteToken={quoteToken}/>
            <Price priceNative={priceNative} priceUsd={priceUsd}/>
            
            

        </div>
    )

}

export default Pair