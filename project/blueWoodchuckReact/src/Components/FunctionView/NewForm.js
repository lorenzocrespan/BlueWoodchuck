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
                            <p className="font-medium">Informazioni caso</p>
                            <p className="text-sm">Inserire le informazioni inerenti al caso di riferimento. Le informazioni richieste sono obbligatorie.</p>
                        </div>
                        <div className="grid grid-cols-6 gap-6 col-span-full lg:col-span-3">
                            <div className="space-y-2 col-span-full sm:col-span-3">
                                <label for="NomeCaso" className="font-medium">Nome caso</label>
                                <input id="NomeCaso" type="text" placeholder="Pippo contro Topolino" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-600 dark:border-gray-700 dark:text-gray-900" />
                            </div>
                            <div className="space-y-2 col-span-full sm:col-span-3">
                                <label for="NumeroCaso" className="font-medium">Numero caso</label>
                                <input id="NumeroCaso" type="number" placeholder="20220103001" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-600 dark:border-gray-700 dark:text-gray-900" required />
                            </div>
                        </div>
                    </fieldset>
                    <fieldset className="grid grid-cols-4 gap-2 p-6 rounded-md shadow-sm dark:bg-gray-900">
                        <div className="space-y-2 col-span-full lg:col-span-1">
                            <p className="font-medium">Informazioni oggetto acquisito</p>
                            <p className="text-sm">Inserire le informazioni inerenti all'oggetto acquisito. Le informazioni richieste sono obbligatorie.</p>
                        </div>
                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                            <div className="space-y-2 col-span-full sm:col-span-3">
                                <label for="NumeroOggetto" className="font-medium">Identificativo numerico dell'oggetto</label>
                                <input id="NumeroOggetto" type="number" placeholder="34" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-600 dark:border-gray-700 dark:text-gray-900" />
                            </div>
                            <div className="space-y-2 col-span-full sm:col-span-3">
                                <label for="TipoOggetto" className="font-medium">Tipologia dell'oggetto</label>
                                <input id="TipoOggetto" type="text" placeholder="Last name" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-600 dark:border-gray-700 dark:text-gray-900" />
                            </div>
                            <div className="space-y-2 col-span-full sm:col-span-3">
                                <label for="NumeroModello" className="font-medium">Numero modello</label>
                                <input id="NumeroModello" type="text" placeholder="0000A12012B32C" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-600 dark:border-gray-700 dark:text-gray-900" />
                            </div>
                            <div className="space-y-2 col-span-full sm:col-span-3">
                                <label for="NumeroSeriale" className="font-medium">Numero seriale</label>
                                <input id="NumeroSeriale" type="text" placeholder="A320020A12012B32C" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-600 dark:border-gray-700 dark:text-gray-900" />
                            </div>
                            <div className="space-y-2 col-span-full">
                                <label for="RagioniAcquisizione" className="font-medium">Ragioni dell'acquisizione</label>
                                <textarea id="RagioniAcquisizione" placeholder="Il dispositivo è stato acquisito perché ..." className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-600 dark:border-gray-700 dark:text-gray-900" />
                            </div>
                            <div className="space-y-2 col-span-full">
                                <label for="DescrizioneAcquisizione" className="font-medium">Descrizione oggetto acquisito</label>
                                <textarea id="DescrizioneAcquisizione" placeholder="È stato acquisito il seguente materiale: ..." className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-600 dark:border-gray-700 dark:text-gray-900" />
                            </div>
                        </div>
                    </fieldset>
                    <fieldset className="grid grid-cols-4 gap-2 p-6 rounded-md shadow-sm dark:bg-gray-900">
                        <div className="space-y-2 col-span-full lg:col-span-1">
                            <p className="font-medium">Informazioni proprietario dell'oggetto</p>
                            <p className="text-sm">Inserire le informazioni inerenti all'oggetto acquisito. Le informazioni richieste sono obbligatorie.</p>
                        </div>
                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                            <div className="space-y-2 col-span-full sm:col-span-3">
                                <label for="NominativoProprietario" className="font-medium">Nominativo proprietario</label>
                                <input id="NominativoProprietario" type="text" placeholder="Pippo" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-600 dark:border-gray-700 dark:text-gray-900" />
                            </div>
                            <div className="space-y-2 col-span-full">
                                <label for="ContattiProprietario" className="font-medium">Contatti proprietario</label>
                                <textarea id="ContattiProprietario" placeholder="Telefono: ..." className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-600 dark:border-gray-700 dark:text-gray-900" />
                            </div>
                        </div>
                    </fieldset>
                    <fieldset className="grid grid-cols-4 gap-2 p-6 rounded-md shadow-sm dark:bg-gray-900">
                        <div className="space-y-2 col-span-full lg:col-span-1">
                            <p className="font-medium">Informazioni perito</p>
                            <p className="text-sm">Inserire le informazioni inerenti all'oggetto acquisito. Le informazioni richieste sono obbligatorie.</p>
                        </div>
                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                            <div className="space-y-2 col-span-full sm:col-span-3">
                                <label for="NominativoPerito" className="font-medium">Nominativo perito</label>
                                <input id="NominativoPerito" type="text" placeholder="Pippo" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-600 dark:border-gray-700 dark:text-gray-900" />
                            </div>
                            <div className="space-y-2 col-span-full">
                                <label for="ContattiPerito" className="font-medium">Contatti perito</label>
                                <textarea id="ContattiPerito" placeholder="Telefono: ..." className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-600 dark:border-gray-700 dark:text-gray-900" />
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