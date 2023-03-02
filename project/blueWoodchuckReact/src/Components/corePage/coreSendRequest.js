import ContractEntry from './sendRequestComponent/formSendEntry';
import React, { useState, useEffect } from 'react';
import { getFormAddress, getFormABI } from '../../abi/abi';
import Web3 from 'web3';

function SendRequest() {

    const isConsoleActive = true;                                               // Enable/Disable console debug.
    // NOTE:    The double print of log is due to "React.StrictMode" in index.js.
    //          It is used to check the entire application for potential problems.

    const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:7575');       // Connect to blockchain.
    const FormContract = new web3.eth.Contract(getFormABI(), getFormAddress()); // Connect to smart contract.

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

    return (
        <div className="min-h-screen flex flex-col gap-10 p-4 sm:p-12 dark:bg-gray-100 dark:text-gray-100 ">
            <div className="container flex flex-col justify-between h-auto mx-auto bg-blue-900 p-10 rounded-md">

                <div className="flex flex-col mx-auto space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
                    <div class="p-6">
                        <input type="text" id="success" class="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-md rounded-lg focus:ring-green-500 focus:border-green-500 w-full p-2.5 dark:bg-gray-700 dark:border-green-500" placeholder="0x547A000305A9628cef33cE993CE5a9254512c42e" />
                        <p class="mt-2 text-sm text-green-600 dark:text-green-500"><span class="font-medium">Well done!</span> Some success message.</p>
                    </div>
                    <div class="self-center">
                        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                            <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                    </div>
                    <div class="p-6">

                        <input type="text" id="error" class="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-md rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500" placeholder="Error input" />
                        <p class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oh, snapp!</span> Some error message.</p>
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
        </div>

    );
}

export default SendRequest;