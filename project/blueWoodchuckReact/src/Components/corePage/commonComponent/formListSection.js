import React, { useState, useEffect } from 'react';
import ContractEntry from "./formListEntry";
import EmptyContractList from './formListEmpty';


function ListContract(props) {

    const isConsoleActive = true;     // Enable/Disable console debug.

    const [contractsInCharge, setContractsInCharge] = useState([]);

    useEffect(() => {
        if (props.account !== undefined) getUserFormsAddresses();
    }, [props.account]);

    const listItems = contractsInCharge.map((data, index) =>
        <ContractEntry
            key={index}
            FormContract={props.FormContract}
            id={data}
        />
    );

    // Obtain the list of contracts in charge for the current user.
    const getUserFormsAddresses = async () => {
        // Get the list of contracts in charge.
        const contractsInCharge = await props.FormContract.methods.getUserFormAddresses(props.account).call();
        if (isConsoleActive) console.debug("Contracts in charge: ", contractsInCharge);

        // Set the list of contracts in charge.
        setContractsInCharge(contractsInCharge);
    }

    return (
        <ul className="flex flex-col container justify-between mx-auto lg:p-8 bg-blue-900 p-10 rounded-md">
            <h2 className="mb-4 text-2xl font-semibold">Lista contratti in carico</h2>
            {
                contractsInCharge.length === 0
                    ? <EmptyContractList />
                    : listItems
            }
        </ul>
    )
}

export default ListContract;
