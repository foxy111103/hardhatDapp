import { useState,useEffect } from 'react';
import Greeter from "./artifacts/contracts/hello.sol/Greeter.json";
import { ethers } from "ethers";
import './App.css';

function App() {
  const [greeting, doGreeting] = useState(null);
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(()=>{
    const loadProvider = async () => {
      let contractAddress="0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
      const url="http://localhost:8545";//connection with hardhat local blockchain
      const provider = new ethers.providers.JsonRpcProvider(url);
      const contract = new ethers.Contract(contractAddress, Greeter.abi, provider);
      setContract(contract);
      setProvider(provider);
      console.log(contract);
    }
    loadProvider();cd
  },[])
  useEffect(()=>{
    const loadGreeting = async () => {
      const greeting=await contract.greet();
      doGreeting(greeting);

    }
    contract && loadGreeting();
  },[contract])
  const change=async()=>{
    const input=document.querySelector("#value");
    const signer=contract.connect(provider.getSigner());//whenever we need to change the state we need to use signer object
    signer.setGreeting(input.value);
    setTimeout(function(){
      window.location.reload(1);
    },500)
    setTimeout();
    
  };
  
  return (
    <div className="center">
      <h1>{greeting}</h1>
      <input className="input" type='text' id='value'></input>
      <button className="button" onClick={change}>Change</button>
    </div>
  );
}

export default App;
