import { useEffect, useState } from 'react';                    // React hooks.
import Web3 from 'web3';                                        // Web3 library.
import { getFormAddress, getFormABI } from '../../abi/abi';    // Smart contract ABI.
import ListContract from './commonComponent/formListSection';
import { useParams } from 'react-router-dom';

function ShowContractInfo() {

    const isConsoleActive = true;                                               // Enable/Disable console debug.
    // NOTE:    The double print of log is due to "React.StrictMode" in index.js.
    //          It is used to check the entire application for potential problems.

    const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:7575');       // Connect to blockchain.
    const FormContract = new web3.eth.Contract(getFormABI(), getFormAddress()); // Connect to smart contract.

    const [account, setAccount] = useState();                                   // Account address.
    const [contract, setContract] = useState();                                 // Contract data.
    const [balance, setBalance] = useState();                                   // Balance data.
    const [networkId, setNetworkId] = useState();                                   // Network data.
    const [form, setForm] = useState([]);                      // Connection status.

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
        readForm();
    }, []);

    // Button to read a form from the blockchain.
    const readForm = async () => {
        // Read form from blockchain.
        console.debug("readForm");
        const accounts = await web3.eth.requestAccounts();
        const account = accounts[0];
        console.debug("account", account);
        setForm(await FormContract.methods.readFormAddress(id).call({ from: account }));
        console.debug("form", form);
    }

    let { id } = useParams();

    return (
        <div className="min-h-screen flex flex-col gap-10 p-4 sm:p-12 dark:bg-gray-900 dark:text-gray-100 ">
            <h1 className="text-4xl font-semibold">Dettaglio contratto</h1>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-semibold">Nome del caso</h2>
                    <p className="text-lg">{form.caseName}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-semibold">Contratto</h2>
                    <p className="text-lg">{form.caseNumber}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-semibold">Other info</h2>
                    <p className="text-lg">{form.contentDescription}</p>
                    <p className="text-lg">{form.contentOwnerContactInformation}</p>
                    <p className="text-lg">{form.creationMethod}</p>
                    <p className="text-lg">{form.date}</p>
                    <p className="text-lg">{form.evidenceTypeManufacturer}</p>
                    <p className="text-lg">{form.forensicAgent}</p>
                    <p className="text-lg">{form.forensicAgentContactInformation}</p>
                    <p className="text-lg">{form.hashValue}</p>
                    <p className="text-lg">{form.itemNumber}</p>
                    <p className="text-lg">{form.owner}</p>
                    <p className="text-lg">{form.reasonObtained}</p>
                    <p className="text-lg">{form.chainOfCustody}</p>
                </div>
            </div>
        </div>
    );


}
export default ShowContractInfo;