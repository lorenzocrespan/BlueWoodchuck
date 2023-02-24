import { useEffect, useState } from 'react';                    // React hooks.
import Web3 from 'web3';                                        // Web3 library.
import { getFormAddress, getFormABI } from '../../abi/abi';    // Smart contract ABI.
import { useParams } from 'react-router-dom';
// Import - Components
import DownloadPopup from "./formShowComponent/DownloadPopup";
import FreeFormPopup from './formShowComponent/FreeFormPopup';
import QRCode from "react-qr-code";

function ShowContractInfo() {

    const isConsoleActive = true;                                               // Enable/Disable console debug.
    // NOTE:    The double print of log is due to "React.StrictMode" in index.js.
    //          It is used to check the entire application for potential problems.

    const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:7575');       // Connect to blockchain.
    const FormContract = new web3.eth.Contract(getFormABI(), getFormAddress()); // Connect to smart contract.

    const [account, setAccount] = useState();                                   // Account address.
    const [contract, setContract] = useState();                                 // Contract data.
    const [balance, setBalance] = useState();                                   // Balance data.
    const [networkId, setNetworkId] = useState();                                   // Network data.
    const [form, setForm] = useState([]);                      // Connection status.

    const [downloadPopup, setDownloadPopup] = useState(false);    // Variable to show the popup modal.
    const [freeFormPopup, setFreeFormPopup] = useState(false);    // Variable to show the popup modal.

    // useEffect hook to load the account address.
    // It is called only once when the component is mounted.
    useEffect(() => {
        console.log("coreFormShow");
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
        readForm();

    }, []);

    useEffect(() => {
        console.log("Raw form", form.length);
        if (form.length == 0) return;
        console.log("coreFormShow", form.chainOfCustody[0]);
    }, [form]);

    // Button to read a form from the blockchain.
    const readForm = async () => {
        // Read form from blockchain.
        console.debug("readForm");
        const accounts = await web3.eth.requestAccounts();
        const account = accounts[0];
        console.debug("account", account);
        setForm(await FormContract.methods.readFormAddress(id).call({ from: account }));
        console.debug("form", form);
    }

    let { id } = useParams();

    return (
        <div className="min-h-screen flex flex-col gap-3 sm:p-4 dark:bg-gray-100 dark:text-gray-100 ">
            <DownloadPopup
                errorPopup={downloadPopup}
            />
            <FreeFormPopup
                errorPopup={freeFormPopup}
            />
            <div className="container flex flex-col justify-between h-auto mx-auto bg-blue-900 p-10 gap-5 rounded-md">
                <div className="flex flex-row space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
                    <div className='basis-1/2'>
                        <p>Scheda form</p>
                    </div>
                    <div className='basis-1/2 flex flex-row justify-end gap-2'>
                        <p>Informazione 1</p>
                        <p>Informazione 2</p>
                    </div>
                </div>
                <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
                    

                    <QRCode value={"Ciao lorenzo questo che leggi è il messaggio che il tuo io del passato ti ha lasciato...Such a failure"} fgColor='#F59E0B' className='self-top flex-shrink-0 md:justify-self-start dark:border-blue-800 border-2' />

                    <table className="min-w-full">
                        <tbody className="text-lg font-semibold text-center md:text-left">
                            <h2 className="text-2xl font-semibold pb-4 text-amber-500">Informazioni form</h2>
                            <div className="flex gap-2">
                                <p className="text-lg">Numero caso:</p>
                                <p className="text-lg">{form.caseNumber}</p>
                            </div>
                            <h2 className="text-2xl font-semibold py-4 text-amber-500">Informazioni ulteriori</h2>
                            <div className="flex flex-col gap-2">
                                <div className="flex gap-2">
                                    <p className="text-lg">Descrizione oggetto:</p>
                                    <p className="text-lg">{form.contentDescription}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="text-lg">Contatti proprietario:</p>
                                    <p className="text-lg">{form.contentOwnerContactInformation}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="text-lg">Metodo di creazione:</p>
                                    <p className="text-lg">{form.creationMethod}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="text-lg">Data:</p>
                                    <p className="text-lg">{form.date}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="text-lg">Tipologia oggetto:</p>
                                    <p className="text-lg">{form.evidenceTypeManufacturer}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="text-lg">Agente:</p>
                                    <p className="text-lg">{form.forensicAgent}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="text-lg">Contatti agente:</p>
                                    <p className="text-lg">{form.forensicAgentContactInformation}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="text-lg">Numero oggetto:</p>
                                    <p className="text-lg">{form.itemNumber}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="text-lg">Proprietario:</p>
                                    <p className="text-lg">{form.owner}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="text-lg">Ragioni acquisizioni:</p>
                                    <p className="text-lg">{form.reasonObtained}</p>
                                </div>

                            </div>
                            <h2 className="text-2xl font-semibold py-4 text-amber-500">Catena di custodia</h2>
                            <div className="container max-w-5xl mx-auto">
                                <div className="grid gap-4 sm:grid-cols-12">
                                    <div className="relative col-span-12  sm:col-span-9">
                                        <div className="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:dark:bg-gray-100">
                                            <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:dark:bg-amber-500">
                                                <h3 className="text-xl font-semibold tracking-wide">{form.chainOfCustody ? form.chainOfCustody[0].reasonForChange : ""}</h3>
                                                <time className="text-xs tracking-wide uppercase dark:text-gray-400">{form.chainOfCustody ? form.chainOfCustody[0].timestamp : ""}</time>
                                                <p className="mt-3">{form.chainOfCustody ? form.chainOfCustody[0].releasedBy : ""} - {form.chainOfCustody ? form.chainOfCustody[0].receivedBy : ""}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="container justify-between h-auto mx-auto flex flex-row space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
                <div className='basis-1/2'>
                    <button className="py-3 px-14 font-semibold rounded-md self-center text-white bg-blue-900 hover:bg-amber-600  ease-out duration-500">Scarica</button>
                </div>
                <div className='basis-1/2 flex flex-row justify-end gap-2'>
                    <button className="py-3 px-14 font-semibold rounded-md self-center text-white bg-blue-900 hover:bg-amber-600  ease-out duration-500">Rendi disponibile</button>
                    <button className="py-3 px-14 font-semibold rounded-md self-center text-white bg-blue-900 hover:bg-amber-600  ease-out duration-500">Invia contratto</button>
                </div>
            </div>
        </div>
    );
}

export default ShowContractInfo;