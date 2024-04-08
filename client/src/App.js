// const { ethers } = require("ethers");
import { ethers } from "ethers";
import { useEffect, useState } from 'react';
import './App.css';
import React from 'react';
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import Raccess from "./components/Raccess";

function App() {
    const [account, setAccount] = useState('');
    const [contract, setContract] = useState(null);
    const [provider, setProvider] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [raccessOpen, setRaccessOpen] = useState(false);
    
    useEffect(() => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const wallet = async() => {
            if(provider){
                // await network.provider.request({
                //     method: "hardhat_reset",
                //     params: [],
                // });

                await provider.send("eth_requestAccounts", []);

                window.ethereum.on("chainChanged", () => {
                    window.location.reload();
                });
                window.ethereum.on("accountsChanged", () => {
                    window.location.reload();
                });

                const signer = provider.getSigner();
                const address = await signer.getAddress();
                console.log(address);
                setAccount(address);

                const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
                const contract = new ethers.Contract(
                    contractAddress, 
                    Upload.abi,
                    signer
                );
                console.log(contract);
                setContract(contract);
                setProvider(signer);
            }
            else{
                alert("Metamask is not installed");
            }
            
        }
        provider && wallet()
    },[])
    return (
        <>
      {!modalOpen && (
        <button className="share" onClick={() => setModalOpen(true)}>
          Share
        </button>
      )}
      {modalOpen && (
        <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
      )}

        {!raccessOpen && (
        <button className="share" onClick={() => setRaccessOpen(true)}>
          Remove Access
        </button>
      )}
      {raccessOpen && (
        <Raccess setRaccessOpen={setRaccessOpen} contract={contract}></Raccess>
      )}

      <div className="App">
        <h1 style={{ color: "white" }}>File Sharing System</h1>
        <div class="bg"></div>
        <div class="bg bg2"></div>
        <div class="bg bg3"></div>

        <p style={{ color: "white" }}>
          Account : {account ? account : "Not connected"}
        </p>
        <FileUpload
          account={account}
          provider={provider}
          contract={contract}
        ></FileUpload>
        <Display contract={contract} account={account}></Display>
      </div>
    </>
    );
}

export default App;