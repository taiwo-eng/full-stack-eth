import './App.css';
import React, {useState} from "react";
import {ethers} from "ethers";
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'

const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
  const [greeting, setGreetingValue] = useState();

  async function requestAccount() {
    await window.etheruem.request({method: "eth_requestAccounts"})
  };

  async function getGreeting() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider);
      try {
        const data = await contract.greet();
        console.log("Data:", data)
      } catch (err) {
        console.log("Error:", err)
      }
    }
  }

  async function setGreeting() {
    if (!greeting) return;
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
      const transaction = await contract.setGreeting(greeting);
      await transaction.wait();
      getGreeting();
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={getGreeting}>Fetch Greeting</button>
        <button onClick={setGreeting}>Set Greeting</button>
        <input onChange={e => setGreetingValue(e.target.value)} placeholder="Set greeting" />
      </header>
    </div>
  );
}

export default App;
