// Import - React
import { useEffect, useState } from 'react';
// Import - Web3 & Smart Contract ABI
import Web3 from 'web3';
import { getFormAddress, getFormABI } from '../../abi/abi';
// Import - Components
import UserInfo from './homeComponent/infoUserSection';
import ListContract from './commonComponent/formListSection';
import RecentActivity from './homeComponent/activitySection';

function CoreHomepage() {

    // Enable/Disable console debug.
    const isConsoleActive = false;
    // Connect to blockchain and smart contract.
    const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:7575');
    const FormFactoryContract = new web3.eth.Contract(getFormABI(), getFormAddress());
    // Account information.
    const [account, setAccount] = useState("0x0000000000000000000000000000000000000000");
    const [contract, setContract] = useState("0x0000000000000000000000000000000000000000");
    const [balance, setBalance] = useState(0);
    const [networkId, setNetworkId] = useState(0);
    const [isChange, setIsChange] = useState(false);

    useEffect(() => {
        const loadAccountAddress = async () => {
            // Request and set account access if needed.
            const accounts = await web3.eth.requestAccounts();
            setAccount(accounts[0]);
            // Get contract address.
            const contractAddress = FormFactoryContract.options.address;
            setContract(contractAddress);
            // Get balance in wei and convert it to ether.
            const balance = await web3.eth.getBalance(accounts[0]);
            setBalance(web3.utils.fromWei(balance, 'ether'));
            // Get network name.
            const networkId = await web3.eth.net.getId();
            setNetworkId(networkId);
            if (isConsoleActive) {
                console.debug("coreHomepage.js - account", accounts[0]);
                console.debug("coreHomepage.js - contract", contractAddress);
                console.debug("coreHomepage.js - balance", balance);
                console.debug("coreHomepage.js - networkId", networkId);
            }
        }
        loadAccountAddress();
    }, [isChange]);

    // Listen metamask account change.
    window.ethereum.on('accountsChanged', () => { setIsChange(!isChange); });

    return (
        <div className="min-h-screen flex flex-col gap-5 p-10 bg-gray-100 text-gray-100">
            <UserInfo
                account={account}
                contract={contract}
                balance={balance}
                networkId={networkId}
            />
            <ListContract
                FormContract={FormFactoryContract}
                account={account}
            />
            <RecentActivity />
        </div>
    );
}

export default CoreHomepage;