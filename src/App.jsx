import { useState } from "react";
import { ethers } from "ethers";
import Greeter from "./arctifacts/contracts/Greeter.sol/Greeter.json";
import "./App.css";

const greeterAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

function App() {
  const [greeting, setGreetingValue] = useState("");

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function fetchGreeting() {
    // checking if there's Metamask
    if (typeof window.ethereum !== "undefined") {
      // defines the provider as Web3Provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // instance the contract
      const contract = new ethers.Contract(
        greeterAddress,
        Greeter.abi,
        provider
      );
      try {
        const data = await contract.greet();
        console.log("data: ", data);
      } catch (err) {
        console.log("error: ", err);
      }
    }
  }

  async function setGreeting() {
    if (!greeting) return; // avoid empty string
    if (typeof window.ethereum !== "undefined") {
      // ask to connect Metamask
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // needed a signer for the transaction
      const signer = provider.getSigner();
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
      // asking setGretting() method from contract
      const transaction = await contract.setGreeting(greeting);
      // waiting for Blockchain confirmation
      await transaction.wait();
      // reload the new value
      fetchGreeting();
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchGreeting}>Fetch Greeting</button>
        <button onClick={setGreeting}>Set Greeting</button>
        <input
          onChange={(e) => setGreetingValue(e.target.value)}
          placeholder="greetings"
          value={greeting}
        />
      </header>
    </div>
  );
}

export default App;
