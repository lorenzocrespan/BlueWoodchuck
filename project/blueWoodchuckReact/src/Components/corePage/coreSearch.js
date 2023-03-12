import ListContract from './commonComponent/formListSection';
import * as React from 'react';
import { useEffect, useState } from 'react';                    // React hooks.
import Web3 from 'web3';                                        // Web3 library.
import { getFormAddress, getFormABI } from '../../abi/abi';    // Smart contract ABI.
import ContractEntry from "./commonComponent/formListEntry";

function CoreSearch() {
    const isConsoleActive = true;                                               // Enable/Disable console debug.
    // NOTE:    The double print of log is due to "React.StrictMode" in index.js.
    //          It is used to check the entire application for potential problems.

    const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:7575');       // Connect to blockchain.
    const FormContract = new web3.eth.Contract(getFormABI(), getFormAddress()); // Connect to smart contract.

    const [account, setAccount] = useState();                                   // Account address.
    const [contract, setContract] = useState();                                 // Contract data.
    const [balance, setBalance] = useState();                                   // Balance data.
    const [networkId, setNetworkId] = useState();                                   // Network data.
    const [isChange, setIsChange] = useState(false);                      // Connection status.

    const [value, setValue] = React.useState(null);

    // useEffect hook to load the account address.
    // It is called only once when the component is mounted.
    useEffect(() => {
        console.log("useEffect");
        const loadAccountAddress = async () => {
            // Request and set account access if needed.
            const accounts = await web3.eth.requestAccounts();
            setAccount(accounts[0]);
            if (isConsoleActive) console.debug("account", accounts[0]);
            // Get contract address.
            const contractAddress = await FormContract.options.address;
            setContract(contractAddress);
            // Get balance in wei and convert it to ether.
            const balance = await web3.eth.getBalance(accounts[0]);
            setBalance(web3.utils.fromWei(balance, 'ether'));
            // Get network name.
            const networkId = await web3.eth.net.getId();
            console.log(networkId);
            setNetworkId(networkId);
        }
        loadAccountAddress();
    }, [isChange]);

    // Listen metamask account change.
    window.ethereum.on('accountsChanged', () => {
        setIsChange(!isChange);
    });

    const [contractsInCharge, setContractsInCharge] = useState([]);

    const searchContract = async () => {
        console.log("Search contract");
        // Get information from input
        const search = document.getElementById("Search").value;
        const date = Math.floor(new Date(value) / 1000);

        console.log("Date FRO: " + date);
        console.log("Date REG: " + 1678647360);
        console.log("Test: " + date > 1678647360);

        // Date registered: 1678647360 
        // Date send:       1685926800000

        const contractsInCharge = await FormContract.methods.findContractByDate(date).call();
        // const count = await FormContract.methods.countFormsBasedOnDate(date).call();
        console.debug("Contracts fount: ", contractsInCharge);

        // Set the list of contracts in charge.
        setContractsInCharge(contractsInCharge);
    }

    const listItems = contractsInCharge.map((data, index) =>
        <ContractEntry
            key={index}
            FormContract={FormContract}
            id={data}
        />
    );

    return (
        <div className="min-h-screen flex flex-col gap-10 p-4 sm:p-12 dark:bg-gray-100 dark:text-gray-100 ">
            <div className="container flex flex-col justify-between h-auto mx-auto bg-blue-900 p-10 rounded-md">

                <div className="flex items-center p-4">
                    <div className="relative flex flex-col gap-3 w-full">
                        <input type="text" name="Search" id="Search" placeholder="Ricerca..." className="w-full text-sm rounded-md border-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500 text-blue-900 placeholder:border-gray-700 placeholder:focus:text-amber-500 ease-out duration-500" />
                        <input type="date" name="Date" id="Date" className="w-full text-sm rounded-md border-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500 text-blue-900 placeholder:border-gray-700 placeholder:focus:text-amber-500 ease-out duration-500" onChange={(e) => setValue(e.target.value)} />
                    </div>
                    <button type="submit" className="ml-4 p-2 rounded-md bg-amber-500 text-white hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 ease-out duration-500" onClick={searchContract}>
                        Ricerca
                    </button>
                </div>


                {
                    contractsInCharge.length === 0
                        ?
                        <div className="flex flex-col items-center justify-center gap-4">
                            <p className="text-2xl">Nessun risultato</p>
                        </div>
                        : listItems
                }

            </div>
        </div>

    );
}

export default CoreSearch;