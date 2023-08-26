import {MdOutlineToken} from "react-icons/md"
import {LiaVectorSquareSolid} from "react-icons/lia"
import "../App.css"


const Tabs=props=>{
    
    const {id,isActive,onClickTab}=props
  
    const onClickONTab=()=>{
        onClickTab(id)
    }

    const style=isActive?"active":"tab"
    let icon
    let Heading
    if (id==="Tokens"){
        icon=<MdOutlineToken className="icon"/>
        Heading=<h1 className="tab-heading">Token Addresses</h1>
    }
    else{
        icon=<LiaVectorSquareSolid className="icon"/>
        Heading=<h1 className="tab-heading">Pair Addresses</h1>
    }

    return (
        
            <div onClick={onClickONTab} className={style}>
            {Heading}
            {icon}

            
            
            
        
        </div>
       
    )

}

export default Tabs