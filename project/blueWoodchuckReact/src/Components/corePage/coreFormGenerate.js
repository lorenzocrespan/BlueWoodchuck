// Import - React
import { useEffect, useState } from 'react';
// Import - Web3 & Smart Contract ABI
import Web3 from 'web3';
import { getFormAddress, getFormABI } from '../../abi/abi';
// Import - Components
import ErrorPopup from "../popupComponent/ErrorPopup";


function NewForm() {

    // Enable/Disable console debug.
    const isConsoleActive = false;
    // Connect to blockchain and smart contract.
    const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:7575');
    const FormFactoryContract = new web3.eth.Contract(getFormABI(), getFormAddress());
    // Account information.
    const [account, setAccount] = useState("0x0000000000000000000000000000000000000000");
    const [isChange, setIsChange] = useState(false);
    // Variable to set the popup modal (show, title and body).            
    const [errorPopup, setErrorPopup] = useState(false);
    const [title, setTitle] = useState("Titolo del popup");
    const [body, setBody] = useState("Corpo del popup");

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

    // Button to add a new form to the blockchain.
    const addForm = async (event) => {
        // Check if all required fields are filled.
        document.forms["createNewForm"].reportValidity();
        // Prevent default behaviour.
        event.preventDefault();
        // Add form to blockchain.
        await FormFactoryContract.methods.createForm(
            // _numbers = [_caseNumber, _itemNumber, _contentOwnerContactInformation, _date, _forensicAgentContactInformation]
            Array.from([
                document.getElementById("caseNumber").value,
                document.getElementById("itemNumber").value,
                document.getElementById("contentOwnerContactInformation").value,
                Math.floor(Date.now() / 1000),
                document.getElementById("forensicAgentContactInformation").value
            ]),
            // _strings = [_caseName, _reasonObtained, _evidenceTypeManufacturer, _owner, _contentDescription, _forensicAgent]
            Array.from([
                document.getElementById("caseName").value,
                document.getElementById("reasonObtained").value,
                document.getElementById("evidenceTypeManufacturer").value,
                document.getElementById("owner").value,
                document.getElementById("contentDescription").value,
                document.getElementById("forensicAgent").value,
            ]),
            // TODO: What to do with this? 
            web3.utils.asciiToHex("idk")
        ).send({ from: account })
            .on('error', function (error) {
                // TODO: Found a way to get an error message from the smart contract.
                setTitle("Errore nella creazione del form");
                setBody("Si è verificato un errore nella creazione del form. Riprova più tardi.");
                setErrorPopup(true);
                console.error(error);
            });
        // If everything is ok and the transaction is mined, reload the page.
        window.location.reload();
    }

    // Function to close the popup modal.
    const popupCloseHandler = (dataHandler) => {
        setErrorPopup(dataHandler);
    };

    return (
        <div className='bg-gray-100 text-gray-100'>
            <ErrorPopup
                onClose={popupCloseHandler}
                errorPopup={errorPopup}
                title={title}
                body={body}
            />
            <section className="p-12">
                <form id="createNewForm" className="container flex flex-col mx-auto space-y-6 rounded-md ng-untouched ng-pristine ng-valid">
                    <fieldset className="grid grid-cols-4 gap-2 p-10 rounded-md shadow-sm  bg-blue-900">
                        <div className="space-y-2 space-x-8 col-span-full lg:col-span-1">
                            <p className="text-2xl font-semibold">Informazioni caso</p>
                            <p className="text-base">Inserire le informazioni inerenti al caso di riferimento. Le informazioni richieste sono obbligatorie.</p>
                        </div>
                        <div className="grid grid-cols-6 gap-10 col-span-full lg:col-span-3">
                            <div className="space-y-3 col-span-full sm:col-span-3">
                                <label className="font-medium text-amber-500">Nome caso *</label>
                                <input id="caseName" type="text" placeholder="Pippo contro Topolino" className="w-full text-lg rounded-md border-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500 text-blue-900 placeholder:border-gray-700 placeholder:focus:text-amber-500 ease-out duration-500" required />
                            </div>
                            <div className="space-y-3 col-span-full sm:col-span-3">
                                <label className="font-medium text-amber-500">Numero caso *</label>
                                <input id="caseNumber" type="number" placeholder="20220103001" className="w-full text-lg rounded-md border-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500 text-blue-900 placeholder:border-gray-700 placeholder:focus:text-amber-500 ease-out duration-500" required />
                            </div>
                        </div>
                    </fieldset>
                    <fieldset className="grid grid-cols-4 gap-2 p-10 rounded-md shadow-sm  bg-blue-900">
                        <div className="space-y-2 space-x-8 col-span-full lg:col-span-1">
                            <p className="text-2xl font-semibold">Informazioni oggetto acquisito</p>
                            <p className="text-base">Inserire le informazioni inerenti all'oggetto acquisito. Le informazioni richieste sono obbligatorie.</p>
                        </div>
                        <div className="grid grid-cols-6 gap-10 col-span-full lg:col-span-3">
                            <div className="space-y-2 col-span-full sm:col-span-3">
                                <label className="font-medium text-amber-500">Identificativo numerico dell'oggetto *</label>
                                <input id="itemNumber" type="number" placeholder="34" className="w-full text-lg rounded-md border-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500 text-blue-900 placeholder:border-gray-700 placeholder:focus:text-amber-500 ease-out duration-500" required />
                            </div>
                            <div className="space-y-2 col-span-full sm:col-span-3">
                                <label className="font-medium text-amber-500">Tipologia dell'oggetto *</label>
                                <input id="evidenceTypeManufacturer" type="text" placeholder="Last name" className="w-full text-lg rounded-md border-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500 text-blue-900 placeholder:border-gray-700 placeholder:focus:text-amber-500 ease-out duration-500" required />
                            </div>
                            <div className="space-y-2 col-span-full">
                                <label className="font-medium text-amber-500">Ragioni dell'acquisizione *</label>
                                <textarea id="reasonObtained" placeholder="Il dispositivo è stato acquisito perché ..." className="w-full text-lg rounded-md border-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500 text-blue-900 placeholder:border-gray-700 placeholder:focus:text-amber-500 ease-out duration-500" required />
                            </div>
                            <div className="space-y-2 col-span-full">
                                <label className="font-medium text-amber-500">Descrizione oggetto acquisito *</label>
                                <textarea id="contentDescription" placeholder="È stato acquisito il seguente materiale: ..." className="w-full text-lg rounded-md border-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500 text-blue-900 placeholder:border-gray-700 placeholder:focus:text-amber-500 ease-out duration-500" required />
                            </div>
                        </div>
                    </fieldset>
                    <fieldset className="grid grid-cols-4 gap-2 p-10 rounded-md shadow-sm  bg-blue-900">
                        <div className="space-y-2 space-x-8 col-span-full lg:col-span-1">
                            <p className="text-2xl font-semibold">Informazioni proprietario dell'oggetto</p>
                            <p className="text-base">Inserire le informazioni inerenti all'oggetto acquisito. Le informazioni richieste sono obbligatorie.</p>
                        </div>
                        <div className="grid grid-cols-6 gap-10 col-span-full lg:col-span-3">
                            <div className="space-y-2 col-span-full sm:col-span-3">
                                <label className="font-medium text-amber-500">Nominativo proprietario *</label>
                                <input id="owner" type="text" placeholder="Pippo" className="w-full text-lg rounded-md border-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500 text-blue-900 placeholder:border-gray-700 placeholder:focus:text-amber-500 ease-out duration-500" required />
                            </div>
                            <div className="space-y-2 col-span-full">
                                <label className="font-medium text-amber-500">Contatti proprietario *</label>
                                <input id="contentOwnerContactInformation" type="number" placeholder="20220103001" className="w-full text-lg rounded-md border-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500 text-blue-900 placeholder:border-gray-700 placeholder:focus:text-amber-500 ease-out duration-500" required />
                            </div>
                        </div>
                    </fieldset>
                    <fieldset className="grid grid-cols-4 gap-2 p-10 rounded-md shadow-sm  bg-blue-900">
                        <div className="space-y-2 space-x-8 col-span-full lg:col-span-1">
                            <p className="text-2xl font-semibold">Informazioni perito</p>
                            <p className="text-base">Inserire le informazioni inerenti all'oggetto acquisito. Le informazioni richieste sono obbligatorie.</p>
                        </div>
                        <div className="grid grid-cols-6 gap-10 col-span-full lg:col-span-3">
                            <div className="space-y-2 col-span-full sm:col-span-3">
                                <label className="font-medium text-amber-500">Nominativo perito *</label>
                                <input id="forensicAgent" type="text" placeholder="Pippo" className="w-full text-lg rounded-md border-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500 text-blue-900 placeholder:border-gray-700 placeholder:focus:text-amber-500 ease-out duration-500" required />
                            </div>
                            <div className="space-y-2 col-span-full">
                                <label className="font-medium text-amber-500">Contatti perito *</label>
                                <input id="forensicAgentContactInformation" type="number" placeholder="20220103001" className="w-full text-lg rounded-md border-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500 text-blue-900 placeholder:border-gray-700 placeholder:focus:text-amber-500 ease-out duration-500" required />
                            </div>
                        </div>
                    </fieldset>
                    <div className="flex justify-end">
                        <button className="h-12 px-4 font-semibold rounded-md self-center text-white bg-blue-900 hover:bg-amber-600 ease-out duration-500" onClick={addForm}>Registrazione contratto</button>
                    </div>
                </form>
            </section>
        </div>
    );
}
export default NewForm;