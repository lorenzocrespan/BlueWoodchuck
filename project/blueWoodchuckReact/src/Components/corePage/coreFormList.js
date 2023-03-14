// Import - React
import { useEffect, useState } from 'react';
// Import - Web3 & Smart Contract ABI
import Web3 from 'web3';
import { getFormAddress, getFormABI } from '../../abi/abi';
// Import - Components
import ListContract from './commonComponent/formListSection';

function ListContractPageView() {

    // Enable/Disable console debug.
    const isConsoleActive = false;
    // Connect to blockchain and smart contract.
    const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:7575');
    const FormFactoryContract = new web3.eth.Contract(getFormABI(), getFormAddress());
    // Account information.
    const [account, setAccount] = useState("0x0000000000000000000000000000000000000000");
    const [isChange, setIsChange] = useState(false);

    useEffect(() => {
        const loadAccountAddress = async () => {
            // Request and set account access if needed.
            const accounts = await web3.eth.requestAccounts();
            setAccount(accounts[0]);
            if (isConsoleActive) {
                console.debug("coreHomepage.js - account", accounts[0]);
            }
        }
        loadAccountAddress();
    }, [isChange]);

    // Listen metamask account change.
    window.ethereum.on('accountsChanged', () => { setIsChange(!isChange); });

    return (
        <div className="min-h-screen flex flex-col gap-5 p-10 bg-gray-100 text-gray-100">
            <ListContract
                FormFactoryContract={FormFactoryContract}
                account={account}
                title="Lista form in carico"
            />
        </div>
    );
}

export default ListContractPageView;