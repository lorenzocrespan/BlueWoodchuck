// Import - React 
import { useState, useEffect } from 'react';
// Import - Web3 & ABI library
import Web3 from 'web3';
import { getFormAddress, getFormABI } from '../../abi/abi';
// Import - Components
import ContractEntry from './sendRequestComponent/formSendEntry';

function SendRequest() {

    // Enable/Disable console debug.
    const isConsoleActive = true;
    // Connect to blockchain and smart contract.
    const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:7575');
    const FormContract = new web3.eth.Contract(getFormABI(), getFormAddress());

    const [contractsInCharge, setContractsInCharge] = useState([]);
    const [account, setAccount] = useState();

    useEffect(() => {
        if (account !== undefined) getUserFormsAddresses();
        else {
            const loadAccountAddress = async () => {
                // Request and set account access if needed.
                const accounts = await web3.eth.requestAccounts();
                setAccount(accounts[0]);
                if (isConsoleActive) console.debug("account", accounts[0]);
            }
            loadAccountAddress();
        }
    }, [account]);

    const listItems = contractsInCharge.map((data, index) =>
        <ContractEntry
            key={index}
            FormContract={FormContract}
            id={data}
        />
    );

    // Obtain the list of contracts in charge for the current user.
    const getUserFormsAddresses = async () => {
        // Get the list of contracts in charge.
        const contractsInCharge = await FormContract.methods.getUserFormAddresses(account).call();
        if (isConsoleActive) console.debug("Contracts in charge: ", contractsInCharge);
        // Set the list of contracts in charge.
        setContractsInCharge(contractsInCharge);
    }

    const checkDataUser = async () => {
        // Get input value
        const sender = document.getElementById("sender").value;
        const receiver = document.getElementById("receiver").value;

    }

    const sendContract = async () => {

        // Get contractEntry checked
        const contractsInChargeSelected = document.querySelectorAll('input[type=checkbox]:checked');
        // filter input 
        const contractsInChargeSelectedFiltered = Array.from(contractsInChargeSelected).map((data) => {
            return { id: data.value }
        });
        if (checkDataUser) {
            // Error
        }
        // Send request of exchange to the receiver
        // const sendRequest = await FormContract.methods.sendRequest(contractsInChargeSelectedFiltered, sender, receiver).send({ from: account });
        // if (isConsoleActive) console.debug("Send request: ", sendRequest);
    }


    return (
        <div className="min-h-screen flex flex-col gap-10 p-4 sm:p-12 dark:bg-gray-100 dark:text-gray-100 ">
            <form>
                <div className="container flex flex-col justify-between h-auto mx-auto bg-blue-900 p-10 rounded-md">

                    <div className="flex flex-col mx-auto space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
                        <div class=" w-96 p-6">
                            <input type="text" name="sender" id="sender" placeholder="0x547A000305A9628cef33cE993CE5a9254512c42" className="w-full py-2 text-sm rounded-md border-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500 text-blue-900 placeholder:border-gray-700 placeholder:focus:text-amber-500 ease-out duration-500" required />
                        </div>
                        <div class="self-center">
                            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                                <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </div>
                        <div class="w-96 p-6">
                            <input type="text" name="receiver" id="receiver" placeholder="0x547A000305A9628cef33cE993CE5a9254512c42" className="w-full py-2 text-sm rounded-md border-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500 text-blue-900 placeholder:border-gray-700 placeholder:focus:text-amber-500 ease-out duration-500" required />
                        </div>
                    </div>

                    <h3 class="mb-5 text-lg font-medium text-gray-900 dark:text-white">Contratti:</h3>

                    <ul class="flex flex-col w-full gap-6">
                        {
                            contractsInCharge.length === 0
                                ? <p> Ciao </p>
                                : listItems
                        }
                    </ul>
                </div>
                <div className="container flex justify-end p-4">
                    <button className="h-12 px-4 font-semibold rounded-md self-center text-white bg-blue-800 hover:bg-amber-600 ease-out duration-500" onClick={sendContract}>Invia contratti</button>
                </div>
            </form>
        </div>

    );
}

export default SendRequest;