// Import - React 
import { useState, useEffect } from 'react';
// Import - Web3 & Smart Contract ABI
import Web3 from 'web3';
import { getFormAddress, getFormABI } from '../../abi/abi';
// Import - Components
import ContractEntry from './sendRequestComponent/formSendEntry';
import FreeFormPopup from './sendRequestComponent/FreeFormPopup';
import EmptyFormSendtList from './sendRequestComponent/formSendEmpty';

function SendRequest() {

    // Enable/Disable console debug.
    const isConsoleActive = true;
    // Connect to blockchain and smart contract.
    const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:7575');
    const FormFactoryContract = new web3.eth.Contract(getFormABI(), getFormAddress());
    // Account information.
    const [account, setAccount] = useState();
    const [taker, setTaker] = useState();
    const [contractsInCharge, setContractsInCharge] = useState([]);
    const [contractsInChargeSelectedFiltered, setContractsInChargeSelectedFiltered] = useState([]);
    // Popup to create a new form.
    const [freeFormPopup, setFreeFormPopup] = useState(false);

    useEffect(() => {
        if (account !== undefined) getUserFormsAddresses();
        else {
            const loadAccountAddress = async () => {
                // Request and set account access if needed.
                const accounts = await web3.eth.requestAccounts();
                setAccount(accounts[0]);
                if (isConsoleActive) console.debug("account", accounts[0]);
                document.getElementById("sender").value = accounts[0];
            }
            loadAccountAddress();

        }
    }, [account]);

    const listItems = contractsInCharge.map((data, index) =>
        <ContractEntry
            key={index}
            FormContract={FormFactoryContract}
            id={data}
        />
    );

    // Obtain the list of contracts in charge for the current user.
    const getUserFormsAddresses = async () => {
        // Get the list of contracts in charge.
        const contractsInCharge = await FormFactoryContract.methods.getUserFormAddresses(account).call();
        if (isConsoleActive) console.debug("Contracts in charge: ", contractsInCharge);
        // Set the list of contracts in charge.
        setContractsInCharge(contractsInCharge);
    }

    const checkDataUser = () => {
        // Get input value
        const sender = document.getElementById("sender").value;
        const receiver = document.getElementById("receiver").value;
        console.log(sender, receiver);
        return sender !== "" && receiver !== "";
    }


    // Function to show and close the download popup modal.
    const showFreeFormPopup = (e) => {
        document.forms["myform"].reportValidity();
        // If all the fields are filled, show the popup modal.
        if (checkDataUser()) {
            // Get input value
            const sender = document.getElementById("sender").value;
            setTaker(document.getElementById("receiver").value);
            // Get list of contracts in charge selected
            const contractsInChargeSelected = document.querySelectorAll('input[type=checkbox]:checked');
            // filter input 
            setContractsInChargeSelectedFiltered(Array.from(contractsInChargeSelected).map((data) => {
                return { id: data.value }
            }));
            setFreeFormPopup(true);
        }

        // Wait popup event to send the contract.
        e.preventDefault();

    }

    const popupCloseFreeFormHandler = () => {
        setFreeFormPopup(false);
    }

    return (
        <div className='bg-gray-100 text-gray-100'>
            <FreeFormPopup
                onClose={popupCloseFreeFormHandler}
                errorPopup={freeFormPopup}
                FormContract={FormFactoryContract}
                idForm={contractsInChargeSelectedFiltered}
                account={account}
                taker={taker}
                title="Trasferimento form"
            />
            <section className="p-12">
                <form id='myform' className="min-h-screen container flex flex-col mx-auto space-y-6 rounded-md ng-untouched ng-pristine ng-valid">
                    <div className="bg-blue-900 p-10 space-y-6 rounded-md">
                        <div className="w-full flex flex-row mx-auto p-5">
                            <div className="w-full p-6">
                                <input type="text" name="sender" id="sender" placeholder="0x547A000305A9628cef33cE993CE5a9254512c42" className="w-full py-2 text-lg rounded-md border-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500 text-blue-900 placeholder:border-gray-700 placeholder:focus:text-amber-500 ease-out duration-500" required />
                            </div>
                            <div className="self-center text-amber-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </div>
                            <div className="w-full p-6">
                                <input type="text" name="receiver" id="receiver" placeholder="0x547A000305A9628cef33cE993CE5a9254512c42" className="w-full py-2 text-lg rounded-md border-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500 text-blue-900 placeholder:border-gray-700 placeholder:focus:text-amber-500 ease-out duration-500" required />
                            </div>
                        </div>
                        <h2 className="mb-4 text-2xl font-semibold">Form disponibili al trasferimento</h2>
                        <ul className="flex flex-col w-full gap-6">
                            {
                                contractsInCharge.length === 0
                                    ?
                                    <EmptyFormSendtList
                                        textSection="Non è stato trovato alcun form a carico dell'utente da poter trasferire."
                                    />
                                    : listItems
                            }
                        </ul>
                    </div>
                    <div className=" flex justify-end">
                        <button className="h-12 px-4 font-semibold rounded-md self-center text-white bg-blue-900 hover:bg-amber-600 ease-out duration-500" onClick={showFreeFormPopup}>Invia richiesta</button>
                    </div>
                </form>
            </section>
        </div>

    );
}

export default SendRequest;