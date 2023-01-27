import { useEffect, useState } from 'react';            // React hooks.
import Web3 from 'web3';                                // Web3 library.
import { FORM_ADDRESS, FORM_ABI } from './abi/abi';     // Smart contract ABI.

function App() {

    const isConsoleActive = true;                                           // Enable/Disable console debug.
    // NOTE:    The double print of log is due to "React.StrictMode" in index.js.
    //          It is used to check the entire application for potential problems.

    const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:7575');   // Connect to blockchain.
    const FormContract = new web3.eth.Contract(FORM_ABI, FORM_ADDRESS);     // Connect to smart contract.
    const [account, setAccount] = useState();                               // Account address.

    // useEffect hook to load the account address.
    // It is called only once when the component is mounted.
    useEffect(() => {
        const loadAccountAddress = async () => {
            // Request and set account access if needed.
            const accounts = await web3.eth.requestAccounts();
            setAccount(accounts[0]);
            if (isConsoleActive) console.debug("account", accounts[0]);
        }
        loadAccountAddress();
    }, []);

    // Listen metamask account change.
    window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0]);
        if (isConsoleActive) console.debug("account", accounts[0]);
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
        const result = await FormContract.methods.createForm("Pippo", 10).send({ from: account });
        if (isConsoleActive) console.debug("Result of createForm: ", result);
    }


    // Button to read a form from the blockchain.
    const readForm = async () => {
        // Read form from blockchain.
        console.debug("readForm");
        const accounts = await web3.eth.requestAccounts();
        const account = accounts[0];
        console.debug("account", account);
        const result = await FormContract.methods.readForm(addressForm).call({ from: account });
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
        <div>
            Your account is: {account}
            <h1>Contacts</h1>
            <button onClick={addForm}>Add Form</button>
            <button onClick={readForm}>Read Form</button>
        </div>
    );
}

export default App;