// Import - React
import { useEffect, useState } from 'react';
// Import - Web3 and Smart Contract
import Web3 from 'web3';                                    
import { getFormAddress, getFormABI } from '../../abi/abi';

function NewForm() {
    // Enable/Disable console debug.
    const isConsoleActive = false;
    // Connect to blockchain.
    const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:7575');       // Connect to blockchain.
    const FormContract = new web3.eth.Contract(getFormABI(), getFormAddress()); // Connect to smart contract.
    const [account, setAccount] = useState();                                   // Account address.
    
    // useEffect hook to load the account address.
    // It is called only once when the component is mounted.
    useEffect(() => {
        const loadAccountAddress = async () => {
            // Request and set account access if needed.
            const accounts = await web3.eth.requestAccounts();
            setAccount(accounts[0]);
            if (isConsoleActive) console.debug("account", accounts[0]);
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
        const result = await FormContract.methods.createForm(
            Array.from([
                document.getElementById("caseNumber").value,
                document.getElementById("NumeroOggetto").value,
                document.getElementById("ContattiProprietario").value,
                Math.floor(Date.now() / 1000),
                document.getElementById("ContattiPerito").value
            ]),
            Array.from([
                document.getElementById("caseName").value,
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
        <div className='bg-gray-100'>
            <section className="p-6 dark:text-gray-50">
                <form className="container flex flex-col mx-auto space-y-6 rounded-md ng-untouched ng-pristine ng-valid">
                    <fieldset className="grid grid-cols-4 gap-2 p-10 rounded-md shadow-sm dark:bg-blue-900">
                        <div className="space-y-2 space-x-8 col-span-full lg:col-span-1">
                            <p className="font-bold underline decoration-2 decoration-amber-500 underline-offset-4">Informazioni caso</p>
                            <p className="text-sm">Inserire le informazioni inerenti al caso di riferimento. Le informazioni richieste sono obbligatorie.</p>
                        </div>
                        <div className="grid grid-cols-6 gap-6 col-span-full lg:col-span-3">
                            <div className="space-y-2 col-span-full sm:col-span-3">
                                <label className="font-semibold text-amber-500">Nome caso</label>
                                <input id="caseName" type="text" placeholder="Pippo contro Topolino" className="w-full rounded-md border-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500 text-blue-900 placeholder:border-gray-700 placeholder:focus:text-amber-500 ease-out duration-500" />
                            </div>
                            <div className="space-y-2 col-span-full sm:col-span-3">
                                <label className="font-semibold text-amber-500">Numero caso</label>
                                <input id="caseNumber" type="number" placeholder="20220103001" className="w-full rounded-md border-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500 text-blue-900 placeholder:border-gray-700 placeholder:focus:text-amber-500 ease-out duration-500" required />
                            </div>
                        </div>
                    </fieldset>
                    <fieldset className="grid grid-cols-4 gap-2 p-10 rounded-md shadow-sm dark:bg-blue-900">
                        <div className="space-y-2 space-x-8 col-span-full lg:col-span-1">
                            <p className="font-bold underline decoration-2 decoration-amber-500 underline-offset-4">Informazioni oggetto acquisito</p>
                            <p className="text-sm">Inserire le informazioni inerenti all'oggetto acquisito. Le informazioni richieste sono obbligatorie.</p>
                        </div>
                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                            <div className="space-y-2 col-span-full sm:col-span-3">
                                <label className="font-semibold text-amber-500">Identificativo numerico dell'oggetto</label>
                                <input id="NumeroOggetto" type="number" placeholder="34" className="w-full rounded-md border-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500 text-blue-900 placeholder:border-gray-700 placeholder:focus:text-amber-500 ease-out duration-500" />
                            </div>
                            <div className="space-y-2 col-span-full sm:col-span-3">
                                <label className="font-semibold text-amber-500">Tipologia dell'oggetto</label>
                                <input id="TipoOggetto" type="text" placeholder="Last name" className="w-full rounded-md border-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500 text-blue-900 placeholder:border-gray-700 placeholder:focus:text-amber-500 ease-out duration-500" />
                            </div>
                            <div className="space-y-2 col-span-full sm:col-span-3">
                                <label className="font-semibold text-amber-500">Numero modello</label>
                                <input id="NumeroModello" type="text" placeholder="0000A12012B32C" className="w-full rounded-md border-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500 text-blue-900 placeholder:border-gray-700 placeholder:focus:text-amber-500 ease-out duration-500" />
                            </div>
                            <div className="space-y-2 col-span-full sm:col-span-3">
                                <label className="font-semibold text-amber-500">Numero seriale</label>
                                <input id="NumeroSeriale" type="text" placeholder="A320020A12012B32C" className="w-full rounded-md border-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500 text-blue-900 placeholder:border-gray-700 placeholder:focus:text-amber-500 ease-out duration-500" />
                            </div>
                            <div className="space-y-2 col-span-full">
                                <label className="font-semibold text-amber-500">Ragioni dell'acquisizione</label>
                                <textarea id="RagioniAcquisizione" placeholder="Il dispositivo è stato acquisito perché ..." className="w-full rounded-md border-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500 text-blue-900 placeholder:border-gray-700 placeholder:focus:text-amber-500 ease-out duration-500" />
                            </div>
                            <div className="space-y-2 col-span-full">
                                <label className="font-semibold text-amber-500">Descrizione oggetto acquisito</label>
                                <textarea id="DescrizioneAcquisizione" placeholder="È stato acquisito il seguente materiale: ..." className="w-full rounded-md border-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500 text-blue-900 placeholder:border-gray-700 placeholder:focus:text-amber-500 ease-out duration-500" />
                            </div>
                        </div>
                    </fieldset>
                    <fieldset className="grid grid-cols-4 gap-2 p-10 rounded-md shadow-sm dark:bg-blue-900">
                        <div className="space-y-2 space-x-8 col-span-full lg:col-span-1">
                            <p className="font-bold underline decoration-2 decoration-amber-500 underline-offset-4">Informazioni proprietario dell'oggetto</p>
                            <p className="text-sm">Inserire le informazioni inerenti all'oggetto acquisito. Le informazioni richieste sono obbligatorie.</p>
                        </div>
                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                            <div className="space-y-2 col-span-full sm:col-span-3">
                                <label className="font-semibold text-amber-500">Nominativo proprietario</label>
                                <input id="NominativoProprietario" type="text" placeholder="Pippo" className="w-full rounded-md border-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500 text-blue-900 placeholder:border-gray-700 placeholder:focus:text-amber-500 ease-out duration-500" />
                            </div>
                            <div className="space-y-2 col-span-full">
                                <label className="font-semibold text-amber-500">Contatti proprietario</label>
                                <input id="ContattiProprietario" type="number" placeholder="20220103001" className="w-full rounded-md border-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500 text-blue-900 placeholder:border-gray-700 placeholder:focus:text-amber-500 ease-out duration-500" required />
                            </div>
                        </div>
                    </fieldset>
                    <fieldset className="grid grid-cols-4 gap-2 p-10 rounded-md shadow-sm dark:bg-blue-900">
                        <div className="space-y-2 space-x-8 col-span-full lg:col-span-1">
                            <p className="font-bold underline decoration-2 decoration-amber-500 underline-offset-4">Informazioni perito</p>
                            <p className="text-sm">Inserire le informazioni inerenti all'oggetto acquisito. Le informazioni richieste sono obbligatorie.</p>
                        </div>
                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                            <div className="space-y-2 col-span-full sm:col-span-3">
                                <label className="font-semibold text-amber-500">Nominativo perito</label>
                                <input id="NominativoPerito" type="text" placeholder="Pippo" className="w-full rounded-md border-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500 text-blue-900 placeholder:border-gray-700 placeholder:focus:text-amber-500 ease-out duration-500" />
                            </div>
                            <div className="space-y-2 col-span-full">
                                <label className="font-semibold text-amber-500">Contatti perito</label>
                                <input id="ContattiPerito" type="number" placeholder="20220103001" className="w-full rounded-md border-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500 text-blue-900 placeholder:border-gray-700 placeholder:focus:text-amber-500 ease-out duration-500" required />
                            </div>
                        </div>
                    </fieldset>
                    <div className="flex justify-end">
                        <button className="h-12 px-4 font-semibold rounded-md self-center text-white bg-blue-800 hover:bg-amber-600 ease-out duration-500" onClick={addForm}>Registrazione contratto</button>
                    </div>
                </form>
            </section>
        </div>
    );
}
export default NewForm;