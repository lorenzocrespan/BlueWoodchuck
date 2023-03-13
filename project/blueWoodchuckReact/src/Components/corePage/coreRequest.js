import { useEffect, useState } from 'react';                    // React hooks.
import Web3 from 'web3';                                        // Web3 library.
import { getFormAddress, getFormABI } from '../../abi/abi';    // Smart contract ABI.
import ListRequest from './requestComponent/requestListSection'; // List of contracts in charge.


function CoreRequest() {

    const isConsoleActive = true;                                               // Enable/Disable console debug.
    // NOTE:    The double print of log is due to "React.StrictMode" in index.js.
    //          It is used to check the entire application for potential problems.

    const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:7575');       // Connect to blockchain.
    const FormContract = new web3.eth.Contract(getFormABI(), getFormAddress()); // Connect to smart contract.

    const [account, setAccount] = useState();                                   // Account address.
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
        }
        loadAccountAddress();
    }, [isChange]);

    // Listen metamask account change.
    window.ethereum.on('accountsChanged', () => {
        setIsChange(!isChange);
    });

    return (
        <div className="min-h-screen flex flex-col gap-10 p-4 sm:p-12  bg-gray-100  text-gray-100 ">
            <ListRequest
                FormContract={FormContract}
                account={account}
            />
        </div>

    );
}

export default CoreRequest;