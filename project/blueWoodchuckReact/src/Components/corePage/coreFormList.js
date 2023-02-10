import { useEffect, useState } from 'react';                    // React hooks.
import Web3 from 'web3';                                        // Web3 library.
import { getFormAddress, getFormABI } from '../../abi/abi';    // Smart contract ABI.
import ListContract from './commonComponent/formListSection';
import RecentActivity from './homeComponent/activitySection';
import UserInfo from './homeComponent/infoUserSection';

function ListContractPageView() {

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

    let addressForm;

    // Button to add a new form to the blockchain.
    const addForm = async () => {
        // Add form to blockchain.
        if (isConsoleActive) console.debug("Add new form request from account: ", account);
        // call(), send() and estimateGas() are the three methods to interact with the blockchain.
        // call() is used to read data from the blockchain.
        // send() is used to write data to the blockchain.
        // estimateGas() is used to estimate the gas needed to write data to the blockchain.
        const result = await FormContract.methods.createForm(
            Array.from([10, 2, 3388796778, 1675156832, 3244098990]),
            Array.from(["Spam delivery", "Found in office", "HDD", "John Evil Smith",
                "The HDD contains a database of email addresses and a message from a Nigerian prince",
                "Matilde Savior Jackson", "Cloning"]),
            web3.utils.asciiToHex("idk")
        ).send({ from: account });
        if (isConsoleActive) console.debug("Result of createForm: ", result);
    }


    // Button to read a form from the blockchain.
    const readForm = async () => {
        // Read form from blockchain.
        console.debug("readForm");
        const accounts = await web3.eth.requestAccounts();
        const account = accounts[0];
        console.debug("account", account);
        const result = await FormContract.methods.readFormAddress(addressForm).call({ from: account });
        console.debug("result", result);
    }

    // Subscribe to events.
    FormContract.events.newForm()
        .on("connected", (subscriptionId) => {
            // https://web3js.readthedocs.io/en/v1.2.11/web3-eth-subscribe.html#
            // console.log(subscriptionId);
        })
        .on('data', (event) => {
            console.debug("FormCreated", event.returnValues);
            addressForm = event.returnValues[1];
        })
        .on('changed', (event) => {
            // remove event from local database
        })
        .on('error', console.error);

    return (
        <div className="min-h-screen flex flex-col gap-10 p-4 sm:p-12 dark:bg-gray-900 dark:text-gray-100 ">
            <ListContract
                FormContract={FormContract}
                account={account}
            />
        </div>

    );


}
export default ListContractPageView;