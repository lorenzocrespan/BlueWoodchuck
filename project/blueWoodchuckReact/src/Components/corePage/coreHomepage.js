import { useEffect, useState } from 'react';                    // React hooks.
import Web3 from 'web3';                                        // Web3 library.
import { getFormAddress, getFormABI } from '../../abi/abi';    // Smart contract ABI.
import ListContract from './commonComponent/formListSection';
import RecentActivity from './homeComponent/activitySection';
import UserInfo from './homeComponent/infoUserSection';

function CoreHomepage() {

    const isConsoleActive = true;                                               // Enable/Disable console debug.

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

    return (
        <div className="min-h-screen flex flex-col gap-3 sm:p-4 dark:bg-gray-100 dark:text-gray-100 ">
            <UserInfo
                account={account}
                contract={contract}
                balance={balance}
                networkId={networkId}
            />
            <ListContract
                FormContract={FormContract}
                account={account}
            />
            <RecentActivity />
        </div>

    );


}
export default CoreHomepage;