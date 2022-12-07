import { useEffect, useState } from 'react';
import Web3 from 'web3';
// import { CONTACT_ABI, CONTACT_ADDRESS } from './config';

function App() {
    const [account, setAccount] = useState();
    // const [contactList, setContactList] = useState();
    // const [contacts, setContacts] = useState([]);

    useEffect(() => {
        async function load() {
            const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:7575');
            const accounts = await web3.eth.requestAccounts();
            setAccount(accounts[0]);
            // Instantiate smart contract using ABI and address.
            // const contactList = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS);
            // set contact list to state variable.
            // setContactList(contactList);
            // Then we get total number of contacts for iteration
            // const counter = await contactList.methods.count().call();
            // iterate through the amount of time of counter
            // for (var i = 1; i <= counter; i++) {
            // call the contacts method to get that particular contact from smart contract
            // const contact = await contactList.methods.contacts(i).call();
            // add recently fetched contact to state variable.
            // setContacts((contacts) => [...contacts, contact]);
            // }
        }

        load();

    }, []);

    return (
        <div>
            Your account is: {account}
            <h1>Contacts</h1>

        </div>
    );
}

export default App;