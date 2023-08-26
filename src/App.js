import { Component } from "react";
import Pair from "./components/pairs"
import Tabs from "./components/tabs"
import {Circles} from 'react-loader-spinner'
import {RiNftFill} from "react-icons/ri"
import {BiSearchAlt2} from "react-icons/bi"
import { ConnectButton } from '@rainbow-me/rainbowkit';

import "./App.css"
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';


const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, base, zora],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);
const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains
});
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})





const tabsList=[
  {tabId: 'Tokens', displayText: 'Token Address'},
  {tabId: 'Pairs', displayText: 'Pair Address'},

]
class App extends Component{
  state={searchInput:"",
  activeTabId:tabsList[0].tabId,
  Tokens:[],
  Pairs:[],
  status:"Success",
  number:3
                
}


  componentDidMount(){
    this.getPairs()
  }

  getPairs=async()=>{
    
    const {searchInput}=this.state
    console.log(searchInput)
    this.setState({status:"In Progress"})
    try {
      const res=await fetch(`https://api.dexscreener.com/latest/dex/search?q=${searchInput}`)
      const data=await res.json()
      const tokenres=await fetch(`https://api.dexscreener.com/latest/dex/tokens/${searchInput}`)
      const tokenData=await tokenres.json()
      this.setState({status:"Success",Pairs:data.pairs,Tokens:tokenData.pairs})
      console.log(data.pairs)
    } catch (error) {
      this.setState({status:"Success"}) 
    }
    
      
  }

  onClickTab=id=>{
    this.setState({activeTabId:id},this.getPairs) 
   }

  onSearch=(event)=>{
    this.setState({searchInput:event.target.value},this.getPairs)
  }

  onNextPage=()=>{
    const {Pairs,Tokens,number}=this.state
    if (Pairs.length>=number+3 && number+3<=10 || Tokens.length>=number+3 && number+3<=10){
      let next=number+3
      this.setState({number:next})
    }
  }

  onPrevPage=()=>{
    const {Pairs,Tokens,number}=this.state
    if (number-3>0){
      let prev=number-3
      this.setState({number:prev})
    }
  }

  
  
  renderOnSuccess=()=>{
    let {activeTabId,Pairs,Tokens,searchInput,number}=this.state
    
    if (activeTabId==="Tokens" && Tokens!==null){
      Tokens.sort(function(a,b){return(a.priceUsd-b.priceUsd)})
      let listT

      Tokens=Tokens.slice(0,9)
     
      listT=Tokens.slice(number-3,number)
      
      return(
        <div>
          {listT.map(each=>(
            <Pair details={each} key={each.pairAddress}/>
          ))}
        {Tokens.length>3?<div className="page-div">
              <button className="page-btn" onClick={this.onPrevPage}>Prev</button>
              <h1 className="page">{number-2} - </h1>
              <h1 className="page">{number}</h1>
              <button className="page-btn" onClick={this.onNextPage}>Next</button>
            </div>:null}
            </div>
      )
    }
    else if (activeTabId==="Pairs" && Pairs!==null){
      let list
      Pairs.sort(function(a,b){return(a.priceUsd-b.priceUsd)})
      Pairs=Pairs.slice(0,10)
      list=Pairs.slice(number-3,number)
      
      return(
        <div>
          {list.map(each=>(
            <Pair details={each} key={each.pairAddress}/>
          ))}
          {Pairs.length>3?<div className="page-div">
              <button className="page-btn" onClick={this.onPrevPage}>Prev</button>
              <h1 className="page">{number-2} - </h1>
              <h1 className="page">{number}</h1>
              <button className="page-btn" onClick={this.onNextPage}>Next</button>
            </div>:null}
        </div>
      )


    }
    
    return(
      <div>
        <h1>Not Found</h1>
      </div>
    )

  }

  renderOnFailure=()=>(
    <div>
      <h1></h1>
    </div>

  )

  renderOnInProggress=()=>(
    <div className="products-loader-container loader" data-testid="loader">
      <Circles type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )


  functionRendering = () => {
    const {status} = this.state
    switch (status) {
      case "Success":
        return this.renderOnSuccess()
      case "Failure":
        return this.renderOnFailure()
      case "In Progress":
        return this.renderOnInProggress()
      default:
        return null
    }
  }



  

  render(){
    const {activeTabId,searchInput,number}=this.state
  
     return(
      <div className="container">
        <nav className="tabs-container">
          <div className="tab">
            <RiNftFill className="icon"/>
            <h1 className="name">Nftify</h1>
          </div>
            {tabsList.map(each=>(
                <a><Tabs onClickTab={this.onClickTab} id={each.tabId} isActive={each.tabId===activeTabId} key={each.tabId}/></a>
            ))}
          </nav>
        
        <div className="result-container">
          <div className="top-div">
          <div className="search-con">
              <input type="search" className="input" value={searchInput} onChange={this.onSearch}/>
              <BiSearchAlt2 className="icon" onClick={this.onSearch}/>
            </div>
          <WagmiConfig config={wagmiConfig}>
            
            <RainbowKitProvider chains={chains}>
              <ConnectButton />
            </RainbowKitProvider>
          </WagmiConfig>
          </div>
            
            
            {this.functionRendering()}
            
        </div>

        
        

      </div>
     )
    
    
  }
}

export default App