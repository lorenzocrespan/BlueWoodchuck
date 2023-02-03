import { useEffect, useState } from 'react';                // React hooks.
import Web3 from 'web3';                                    // Web3 library.
import { getFormAddress, getFormABI } from '../../abi/abi';    // Smart contract ABI.

function NewForm() {

    const isConsoleActive = true;                                               // Enable/Disable console debug.
    // NOTE:    The double print of log is due to "React.StrictMode" in index.js.
    //          It is used to check the entire application for potential problems.

    const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:7575');       // Connect to blockchain.
    const FormContract = new web3.eth.Contract(getFormABI(), getFormAddress()); // Connect to smart contract.
    const [account, setAccount] = useState();                                   // Account address.
    const [contract, setContract] = useState();                                 // Contract data.

    // useEffect hook to load the account address.
    // It is called only once when the component is mounted.
    useEffect(() => {
        const loadAccountAddress = async () => {
            // Request and set account access if needed.
            const accounts = await web3.eth.requestAccounts();
            setAccount(accounts[0]);
            if (isConsoleActive) console.debug("account", accounts[0]);
            // Get contract address.
            const contractAddress = await FormContract.options.address;
            setContract(contractAddress);
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
        // Add the Header component.
        <div className='bg-slate-400 min-h-screen'>
            <section className="p-6 bg-blue-800 dark:text-gray-50">
                <form action="" className="container flex flex-col mx-auto space-y-6 p-6 rounded-md bg-blue-500 ng-untouched ng-pristine ng-valid">
                <fieldset className="grid grid-cols-4 gap-2 p-6 rounded-md shadow-sm dark:bg-gray-900">
                        <div className="space-y-2 col-span-full lg:col-span-1">
                            <p className="font-medium">Nome sezione</p>
                            <p className="text-xs">Informazioni relative alla sezione</p>
                        </div>
                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                            <div className="col-span-full sm:col-span-3">
                                <label for="NomeCaso" className="text-sm">Nome caso</label>
                                <input id="NomeCaso" type="text" placeholder="Pippo contro Topolino" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-600 dark:border-gray-700 dark:text-gray-900" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label for="NumeroCaso" className="text-sm">Numero caso</label>
                                <input id="NumeroCaso" type="number" placeholder="20220103001" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-600 dark:border-gray-700 dark:text-gray-900" required/>
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label for="email" className="text-sm">Email</label>
                                <input id="email" type="email" placeholder="Email" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-600 dark:border-gray-700 dark:text-gray-900" />
                            </div>
                            <div className="col-span-full">
                                <label for="address" className="text-sm">Address</label>
                                <input id="address" type="text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-600 dark:border-gray-700 dark:text-gray-900" />
                            </div>
                            <div className="col-span-full sm:col-span-2">
                                <label for="city" className="text-sm">City</label>
                                <input id="city" type="text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-600 dark:border-gray-700 dark:text-gray-900" />
                            </div>
                            <div className="col-span-full sm:col-span-2">
                                <label for="state" className="text-sm">State / Province</label>
                                <input id="state" type="text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-600 dark:border-gray-700 dark:text-gray-900" />
                            </div>
                            <div className="col-span-full sm:col-span-2">
                                <label for="zip" className="text-sm">ZIP / Postal</label>
                                <input id="zip" type="text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-600 dark:border-gray-700 dark:text-gray-900" />
                            </div>
                        </div>
                    </fieldset>
                    <fieldset className="grid grid-cols-4 gap-2 p-6 rounded-md shadow-sm dark:bg-gray-900">
                        <div className="space-y-2 col-span-full lg:col-span-1">
                            <p className="font-medium">Nome sezione</p>
                            <p className="text-xs">Informazioni relative alla sezione</p>
                        </div>
                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                            <div className="col-span-full sm:col-span-3">
                                <label for="firstname" className="text-sm">First name</label>
                                <input id="firstname" type="text" placeholder="First name" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-600 dark:border-gray-700 dark:text-gray-900" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label for="lastname" className="text-sm">Last name</label>
                                <input id="lastname" type="text" placeholder="Last name" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-600 dark:border-gray-700 dark:text-gray-900" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label for="email" className="text-sm">Email</label>
                                <input id="email" type="email" placeholder="Email" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-600 dark:border-gray-700 dark:text-gray-900" />
                            </div>
                            <div className="col-span-full">
                                <label for="address" className="text-sm">Address</label>
                                <input id="address" type="text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-600 dark:border-gray-700 dark:text-gray-900" />
                            </div>
                            <div className="col-span-full sm:col-span-2">
                                <label for="city" className="text-sm">City</label>
                                <input id="city" type="text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-600 dark:border-gray-700 dark:text-gray-900" />
                            </div>
                            <div className="col-span-full sm:col-span-2">
                                <label for="state" className="text-sm">State / Province</label>
                                <input id="state" type="text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-600 dark:border-gray-700 dark:text-gray-900" />
                            </div>
                            <div className="col-span-full sm:col-span-2">
                                <label for="zip" className="text-sm">ZIP / Postal</label>
                                <input id="zip" type="text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-600 dark:border-gray-700 dark:text-gray-900" />
                            </div>
                        </div>
                    </fieldset>
                    <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
                        <div className="space-y-2 col-span-full lg:col-span-1">
                            <p className="font-medium">Profile</p>
                            <p className="text-xs">Adipisci fuga autem eum!</p>
                        </div>
                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                            <div className="col-span-full sm:col-span-3">
                                <label for="username" className="text-sm">Username</label>
                                <input id="username" type="text" placeholder="Username" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-600 dark:border-gray-700 dark:text-gray-900" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label for="website" className="text-sm">Website</label>
                                <input id="website" type="text" placeholder="https://" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-600 dark:border-gray-700 dark:text-gray-900" />
                            </div>
                            <div className="col-span-full">
                                <label for="bio" className="text-sm">Bio</label>
                                <textarea id="bio" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-600 dark:border-gray-700 dark:text-gray-900"></textarea>
                            </div>
                            <div className="col-span-full">
                                <label for="bio" className="text-sm">Photo</label>
                                <div className="flex items-center space-x-2">
                                    <img src="https://source.unsplash.com/30x30/?random" alt="" className="w-10 h-10 rounded-full dark:bg-gray-500 dark:bg-gray-700" />
                                    <button type="button" className="px-4 py-2 border rounded-md dark:border-gray-100">Change</button>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <div className="flex justify-end p-6 space-x-3">
                        <button type="button" className="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-gray-600 border border-transparent rounded-md active:bg-gray-600 hover:bg-gray-700 focus:outline-none focus:shadow-outline-gray">Cancel</button>
                        <button type="submit" className="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-md active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue">Save</button>
                    </div>
                </form>
            </section>
        </div>
    );
}
export default NewForm;