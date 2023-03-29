// Import - React
import { useEffect, useState } from 'react';
// Import - Components
import ContractEntry from "./requestListEntry";
import EmptyContractList from './requestListEmpty';
import AcceptPopup from './requestAcceptPopup';


function ListRequest(props) {

    // Enable/Disable console debug.
    const isConsoleActive = true;
    // Variable to save the list of forms in pending for the current user.
    const [contractsInPendingSend, setContractsInPendingSend] = useState([]);
    const [contractsInPendingReceive, setContractsInPendingReceive] = useState([]);
    // Variable to set the popup modal (show, title and body).            
    const [acceptPopup, setAcceptPopup] = useState(false);
    const [title, setTitle] = useState("Coferma presa in carico");
    // Contract in evaluation.
    const [id, setId] = useState("0x0000000000000000000000000000000000000000");

    useEffect(() => {
        getUserFormsToSend();
        getUserFormsToReceive();
    }, [props.account]);

    // Obtain the list of contracts in pending for the current user (send).
    const getUserFormsToSend = async () => {
        // Get the list of contracts in pending.
        const contractsInPendingSend = await props.FormFactoryContract.methods.findContractGiver(props.account).call();
        
        setContractsInPendingSend(contractsInPendingSend);
    }

    // Create a list of contracts in pending for the current user (receive).
    const getUserFormsToReceive = async () => {
        // Get the list of contracts in pending.
        const contractsInPendingReceive = await props.FormFactoryContract.methods.findContractTaker(props.account).call();
        
        setContractsInPendingReceive(contractsInPendingReceive);
    }

    // Function to close the popup modal.
    const popupCloseHandler = async (dataHandler) => {
        if (dataHandler !== false) await props.FormFactoryContract.methods.acceptForm(id, dataHandler).send({ from: props.account });
        setAcceptPopup(false);
    };

    // Function to open the popup modal.
    const popupOpenHandler = (dataHandler) => {
        setId(dataHandler);
        setAcceptPopup(true);
    };

    const listItemsToSend = contractsInPendingSend.map((data, index) =>
        <ContractEntry
            key={index}
            FormContract={props.FormFactoryContract}
            account={props.account}
            id={data}
        />
    );

    const listItemsToReceive = contractsInPendingReceive.map((data, index) =>
        <ContractEntry
            key={index}
            FormContract={props.FormFactoryContract}
            account={props.account}
            id={data}
            onOpen={popupOpenHandler}
        />
    );

    return (
        <>
            <AcceptPopup
                onClose={popupCloseHandler}
                acceptPopup={acceptPopup}
                title={title}
            />
            <ul className="flex flex-col container justify-between mx-auto bg-blue-900 p-10 rounded-md gap-5">
                <h2 className="mb-4 text-2xl font-semibold">Lista contratti in invio</h2>
                {
                    contractsInPendingSend.length === 0
                        ?
                        <EmptyContractList
                            textSection="Non è stato trovato alcun form in attesa di accettazione."
                        />
                        : listItemsToSend
                }
            </ul>
            <ul className="flex flex-col container justify-between mx-auto bg-blue-900 p-10 rounded-md gap-5">
                <h2 className="mb-4 text-2xl font-semibold">Lista contratti in arrivo</h2>
                {
                    contractsInPendingReceive.length === 0
                        ?
                        <EmptyContractList
                            textSection="Non è stato trovato alcun form in attesa di accettazione."
                        />
                        : listItemsToReceive
                }
            </ul>
        </>
    )
}

export default ListRequest;
