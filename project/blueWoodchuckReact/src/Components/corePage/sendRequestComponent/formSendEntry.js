import React, { useEffect } from 'react';
import { useState } from 'react';

function ContractEntry(props) {

    const [dataForm, setDataForm] = useState({});

    useEffect(() => {
        getDataForm();
    }, []);


    const getDataForm = async () => {
        // Get form data for each contract.
        let dataFormToSet = await props.FormContract.methods.readFormAddress(props.id).call();
        setDataForm(dataFormToSet);
    }

    return (
        <li>
            <input type="checkbox" id={props.id} value={props.id} className="hidden peer" />
            <label htmlFor={props.id} className="grid p-4 overflow-hidden rounded-xl lg:p-6 border-2 items-center justify-between w-full text-gray-200 bg-blue-900 border-blue-900 cursor-pointer hover:text-amber-500 hover:border-amber-500 peer-checked:border-amber-500 peer-checked:text-gray-300">
               
                    <h3 className="mb-1 ml-8 font-semibold md:col-start-3 md:col-span-4 md:ml-0 xl:col-start-3 xl:col-span-8">Nome caso: {dataForm.caseName}  (Numero artefatto: {dataForm.itemNumber ? dataForm.itemNumber : "Non disponibile"}) </h3>
                    <h3 className="mb-1 ml-8 font-semibold md:col-start-3 md:col-span-4 md:ml-0 xl:col-start-3 xl:col-span-8">Contratto: {props.id}</h3>
                    <time className="row-start-1 mb-1 md:col-start-1 xl:col-span-2  text-gray-400">{dataForm.date ? new Date(dataForm.date * 1000).toLocaleDateString("it-IT") : "N/A"}</time>
                    <p className="ml-8 md:col-start-2 md:col-span-4 xl:col-start-3 xl:col-span-9 md:ml-0  text-gray-300">{dataForm.contentDescription ? dataForm.contentDescription : "N/A"}</p>

            </label>
        </li>
    )
}

export default ContractEntry;
