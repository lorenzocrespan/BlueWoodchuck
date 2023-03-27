// Import - React and React Router
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// Import - Web3 & Smart Contract ABI
import Web3 from 'web3';
import { getFormAddress, getFormABI } from '../../abi/abi';
// Import - Components
import DownloadPopup from "./formShowComponent/DownloadPopup";
import FreeFormPopup from './formShowComponent/FreeFormPopup';
import QRCodeCanvas from "qrcode.react";

function ShowContractInfo() {

    // Enable/Disable console debug.
    const isConsoleActive = false;
    // Connect to blockchain and smart contract.
    const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:7575');
    const FormFactoryContract = new web3.eth.Contract(getFormABI(), getFormAddress());
    // Account information.
    const [account, setAccount] = useState("0x0000000000000000000000000000000000000000");                                 // Account address.
    const [form, setForm] = useState([]);
    // Connection status.
    let { id } = useParams();
    // Variable to show the popup modal.
    const [downloadPopup, setDownloadPopup] = useState(false);
    const [freeFormPopup, setFreeFormPopup] = useState(false);
    // Variable to change the form badge.
    const [contractAvailable, setContractAvailable] = useState(false);
    // Variable to show the chain of custody.
    const [listItems, setListItems] = useState();
    const [fun, setFun] = useState(0);
    // Variable to set title and message of the popup modal.
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    // Variable to navigate to another page.
    const navigator = useNavigate();

    useEffect(() => {
        const loadAccountAddress = async () => {
            // Request and set account access if needed.
            const accounts = await web3.eth.requestAccounts();
            setAccount(accounts[0]);
            if (isConsoleActive) {
                console.debug("coreFormShow.js - account", accounts[0]);
            }
        }
        const readForm = async () => {
            setForm(await FormFactoryContract.methods.readFormAddress(id).call({ from: account }));
        }
        loadAccountAddress();
        readForm();
    }, []);

    useEffect(() => {
        if (form.length == 0) return;
        checkAvailable();
        setListItems(form.chainOfCustody.map((item, index) =>
            <div key={index} className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-amber-500">
                <time className="text-xl tracking-wide uppercase">{item ? new Date(item.timestamp * 1000).toLocaleDateString("it-IT") : "Non disponibile"}</time>
                <h3 className="p-2 text-sm font-semibold tracking-wide text-gray-300">{item ? item.reasonForChange : ""}</h3>
                <div className="p-2 flex flex-col w-fit text-base">
                    <p>{item ? item.releasedBy : ""}</p>
                    <div className="flex mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-8 h-8 rotate-90 text-amber-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </div>
                    <p>{item ? item.receivedBy : ""}</p>
                </div >
            </div >));
    }, [form]);


    // Function to show and close the download popup modal.
    const showDownloadPopup = () => {
        setDownloadPopup(true);
    }

    const popupCloseDownloadHandler = () => {
        setDownloadPopup(false);
    }

    // Function to show and close the download popup modal.
    const showFreeFormPopup = () => {
        contractAvailable ? setFun(1) : setFun(0);
        setFreeFormPopup(true);
    }

    const popupCloseFreeFormHandler = () => {
        setFreeFormPopup(false);
    }

    const checkAvailable = async () => {
        await FormFactoryContract.methods.isAFormAvailable(id).call().then((result) => {
            if (result) {
                setContractAvailable(true);
                setTitle("Acquisizione del contratto");
                setMessage("Attenzione, stai per acquisire il contratto. Sei sicuro di voler procedere?");
            } else {
                setContractAvailable(false);
                setTitle("Rendi disponibile il contratto");
                setMessage("Attenzione, renderendo disponibile il contratto, chiunque potrà accedervi ed ottenerne la proprietà. Sei sicuro di voler procedere?");
            }
        });
    }

    async function renderExchangePage() {
        navigator("/exchangeForm")
    }

    return (
        <div className="min-h-screen flex flex-col gap-3 sm:p-4  bg-gray-100  text-gray-100 ">
            <DownloadPopup
                onClose={popupCloseDownloadHandler}
                downloadPopup={downloadPopup}
                form={form}
                id={id}
            />
            <FreeFormPopup
                onClose={popupCloseFreeFormHandler}
                errorPopup={freeFormPopup}
                idForm={id}
                FormContract={FormFactoryContract}
                account={account}
                fun={fun}
                title={title}
                message={message}
            />
            <div className="container flex flex-col justify-between h-auto mx-auto bg-blue-900 p-10 gap-5 rounded-md">
                <div className="flex flex-row">
                    <div className='basis-2/3 py-5 text-2xl font-semibold text-amber-500'>
                        <p>Scheda form - <span className='text-gray-100'>{id}</span></p>
                    </div>
                    <div className='basis-1/3 flex flex-row justify-end gap-2 h-fit self-center'>
                        {contractAvailable ?
                            <span className="px-5 py-2 font-bold rounded-md  bg-amber-500  text-blue-900">
                                <span>Disponibile</span>
                            </span>
                            :
                            <span className="px-5 py-2 font-bold rounded-md bg-amber-500  text-blue-900">
                                <span>Non disponibile</span>
                            </span>
                        }
                    </div>
                </div>
                <div className="flex flex-row space-y-0 space-x-16">
                    <QRCodeCanvas
                        id="QRCodeForm"
                        className='self-top flex-shrink-0 md:justify-self-start  border-amber-500 border-4'
                        size={512}
                        level={"H"}
                        fgColor='#1C337F'
                        includeMargin={true}
                        renderAs='svg'
                        value={"https://bluewoodchuck.com/form/" + id}
                    />
                    <div className="min-w-full">
                        <div className="text-lg text-left">
                            <h2 className="text-2xl font-semibold text-amber-500 pb-2">Informazioni caso</h2>
                            <div className="flex flex-col gap-3 pb-5">
                                <div className="flex gap-2">
                                    <p className="text-xl">Nome caso:</p> <p>{form.caseName}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="text-xl">Numero caso:</p> <p>{form.caseNumber}</p>
                                </div>
                            </div>
                            <h2 className="text-2xl font-semibold text-amber-500 pb-2">Informazioni oggetto acquisito</h2>
                            <div className="flex flex-col gap-3 pb-5">
                                <div className="flex gap-2">
                                    <p className="text-xl">Identificativo numerico dell'oggetto:</p> <p>{form.itemNumber}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="text-xl">Tipologia oggetto:</p> <p>{form.evidenceTypeManufacturer}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="text-xl">Descrizione oggetto acquisito:</p> <p>{form.contentDescription}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="text-xl">Ragioni dell'acquisizione:</p> <p>{form.reasonObtained}</p>
                                </div>
                            </div>
                            <h2 className="text-2xl font-semibold text-amber-500 pb-2">Informazioni proprietario dell'oggetto</h2>
                            <div className="flex flex-col gap-3 pb-5">
                                <div className="flex gap-2">
                                    <p className="text-xl">Proprietario:</p> <p>{form.owner}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="text-xl">Contatti proprietario:</p> <p>{form.contentOwnerContactInformation}</p>
                                </div>
                            </div>
                            <h2 className="text-2xl font-semibold text-amber-500 pb-2">Informazioni perito dell'acquisizione</h2>
                            <div className="flex flex-col gap-3 pb-5">
                                <div className="flex gap-2">
                                    <p className="text-xl">Agente:</p> <p>{form.forensicAgent}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="text-xl">Contatti agente:</p> <p>{form.forensicAgentContactInformation}</p>
                                </div>
                            </div>
                            <h2 className="text-2xl font-semibold text-amber-500 pb-2">Catena di custodia</h2>
                            <div className="container max-w-7xl mx-auto">
                                <div className="grid gap-4 sm:grid-cols-12">
                                    <div className="relative col-span-12  sm:col-span-9">
                                        <div className="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:bg-gray-100">
                                            {listItems}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container justify-between h-auto mx-auto flex flex-row space-y-0 space-x-10">
                <div className='basis-1/2'>
                    <button className="py-3 px-14 font-semibold rounded-md self-center text-white bg-blue-900 hover:bg-amber-600 ease-out duration-500" onClick={showDownloadPopup}>Scarica</button>
                </div>
                {!contractAvailable ?
                    <div className='basis-1/2 flex flex-row justify-end gap-2'>
                        <button className="py-3 px-14 font-semibold rounded-md self-center text-white bg-blue-900 hover:bg-amber-600 ease-out duration-500" onClick={showFreeFormPopup}>Rendi disponibile</button>
                        <button className="py-3 px-14 font-semibold rounded-md self-center text-white bg-blue-900 hover:bg-amber-600 ease-out duration-500" onClick={renderExchangePage}>Invia contratto</button>
                    </div>
                    :
                    <div className='basis-1/2 flex flex-row justify-end gap-2'>
                        <button className="py-3 px-14 font-semibold rounded-md self-center text-white bg-blue-900 hover:bg-amber-600 ease-out duration-500" onClick={showFreeFormPopup}>Acquisisci contratto</button>
                    </div>
                }
            </div>
        </div>
    );
}
export default ShowContractInfo;