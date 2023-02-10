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

    // Button to add a new form to the blockchain.
    const addForm = async () => {
        // Add form to blockchain.
        if (isConsoleActive) console.debug("Add new form request from account: ", account);
        // Print all information get from the form.
        // _numbers = [_caseNumber, _itemNumber, _contentOwnerContactInformation, _date,
        //             _forensicAgentContactInformation]
        // _strings = [_caseName, _reasonObtained, _evidenceTypeManufacturer, _owner, _contentDescription,
        //             _forensicAgent, _creationMethod]
        // Add form to blockchain.
        console.debug("Type Numero caso: ", typeof document.getElementById("NumeroCaso").value);
        const result = await FormContract.methods.createForm(
            Array.from([
                document.getElementById("NumeroCaso").value,
                document.getElementById("NumeroOggetto").value,
                document.getElementById("ContattiProprietario").value,
                Math.floor(Date.now() / 1000),
                document.getElementById("ContattiPerito").value
            ]),
            Array.from([
                document.getElementById("NomeCaso").value,
                document.getElementById("RagioniAcquisizione").value,
                document.getElementById("TipoOggetto").value,
                document.getElementById("NominativoProprietario").value,
                document.getElementById("DescrizioneAcquisizione").value,
                document.getElementById("NominativoPerito").value,
                "MetodoCreazione"
                // document.getElementById("NumeroModello").value,
                // document.getElementById("NumeroSeriale").value,
            ]),
            web3.utils.asciiToHex("idk")
        ).send({ from: account });

        // if (isConsoleActive) console.debug("Result of createForm: ", result);
    }

    return (
        // Add the Header component.
        <div className='bg-slate-400 min-h-screen'>
            <section className="p-6 bg-blue-800 dark:text-gray-50">
                <form className="container flex flex-col mx-auto space-y-6 p-6 rounded-md bg-blue-500 ng-untouched ng-pristine ng-valid">
                    <fieldset className="grid grid-cols-4 gap-2 p-6 rounded-md shadow-sm dark:bg-gray-900">
                        <div className="space-y-2 col-span-full lg:col-span-1">
                            <p className="font-medium">Informazioni caso</p>
                            <p className="text-sm">Inserire le informazioni inerenti al caso di riferimento. Le informazioni richieste sono obbligatorie.</p>
                        </div>
                        <div className="grid grid-cols-6 gap-6 col-span-full lg:col-span-3">
                            <div className="space-y-2 col-span-full sm:col-span-3">
                                <label className="font-medium">Nome caso</label>
                                <input id="NomeCaso" type="text" placeholder="Pippo contro Topolino" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-600 dark:border-gray-700 dark:text-gray-900" />
                            </div>
                            <div className="space-y-2 col-span-full sm:col-span-3">
                                <label className="font-medium">Numero caso</label>
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
                                <label className="font-medium">Identificativo numerico dell'oggetto</label>
                                <input id="NumeroOggetto" type="number" placeholder="34" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-600 dark:border-gray-700 dark:text-gray-900" />
                            </div>
                            <div className="space-y-2 col-span-full sm:col-span-3">
                                <label className="font-medium">Tipologia dell'oggetto</label>
                                <input id="TipoOggetto" type="text" placeholder="Last name" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-600 dark:border-gray-700 dark:text-gray-900" />
                            </div>
                            <div className="space-y-2 col-span-full sm:col-span-3">
                                <label className="font-medium">Numero modello</label>
                                <input id="NumeroModello" type="text" placeholder="0000A12012B32C" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-600 dark:border-gray-700 dark:text-gray-900" />
                            </div>
                            <div className="space-y-2 col-span-full sm:col-span-3">
                                <label className="font-medium">Numero seriale</label>
                                <input id="NumeroSeriale" type="text" placeholder="A320020A12012B32C" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-600 dark:border-gray-700 dark:text-gray-900" />
                            </div>
                            <div className="space-y-2 col-span-full">
                                <label className="font-medium">Ragioni dell'acquisizione</label>
                                <textarea id="RagioniAcquisizione" placeholder="Il dispositivo è stato acquisito perché ..." className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-600 dark:border-gray-700 dark:text-gray-900" />
                            </div>
                            <div className="space-y-2 col-span-full">
                                <label className="font-medium">Descrizione oggetto acquisito</label>
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
                                <label className="font-medium">Nominativo proprietario</label>
                                <input id="NominativoProprietario" type="text" placeholder="Pippo" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-600 dark:border-gray-700 dark:text-gray-900" />
                            </div>
                            <div className="space-y-2 col-span-full">
                                <label className="font-medium">Contatti proprietario</label>
                                <input id="ContattiProprietario" type="number" placeholder="20220103001" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-600 dark:border-gray-700 dark:text-gray-900" required />
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
                                <label className="font-medium">Nominativo perito</label>
                                <input id="NominativoPerito" type="text" placeholder="Pippo" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-600 dark:border-gray-700 dark:text-gray-900" />
                            </div>
                            <div className="space-y-2 col-span-full">
                                <label className="font-medium">Contatti perito</label>
                                <input id="ContattiPerito" type="number" placeholder="20220103001" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-600 dark:border-gray-700 dark:text-gray-900" required />
                            </div>
                        </div>
                    </fieldset>
                </form>
                <div className="flex justify-end p-6 space-x-3">
                    <button className="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-md active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue" onClick={addForm}>Save</button>
                </div>
            </section>
        </div>
    );
}
export default NewForm;