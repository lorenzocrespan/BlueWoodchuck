// Import - React
import { useState, useEffect } from 'react';
// Import - Components
import EmptyContractList from './formListEmpty';
import ContractEntry from "./formListEntry";

function ListContract(props) {

    // Enable/Disable console debug.
    const isConsoleActive = false;
    // Variable to save the list of forms in charge for the current user.
    const [formInCharge, setFormInCharge] = useState([]);

    useEffect(() => {
        if (props.account !== undefined) getUserFormsAddresses();
    }, [props.account]);

    // Obtain the list of contracts in charge for the current user.
    const getUserFormsAddresses = async () => {
        // Get the list of contracts in charge.
        const formInCharge = await props.FormFactoryContract.methods.getUserFormAddresses(props.account).call();
        if (isConsoleActive) console.debug("formListSection.js - formInCharge:", formInCharge);
        setFormInCharge(formInCharge);
    }

    // Create a list of contracts in charge for the current user.
    const listItems = formInCharge.map((data, index) =>
        <ContractEntry
            key={index}
            FormContract={props.FormFactoryContract}
            id={data}
        />
    );

    return (
        <ul className="flex flex-col container justify-between mx-auto bg-blue-900 p-12 gap-4 rounded-md">
            <h2 className="mb-4 text-2xl font-semibold">{props.title}</h2>
            {
                formInCharge.length === 0
                    ?
                    <EmptyContractList
                        textSection="Non è stato trovato alcun form a carico dell'utente."
                    />
                    : listItems
            }
        </ul>
    )
}

export default ListContract;
