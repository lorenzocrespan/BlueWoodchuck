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
            <input type="checkbox" id={props.id} value={props.id} class="hidden peer"/>
            <label for={props.id} class="grid p-4 overflow-hidden rounded-xl lg:p-6 border-2 items-center justify-between w-full text-gray-500 bg-white border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-amber-500 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div class="block">
                    <h3 className="mb-1 ml-8 font-semibold md:col-start-2 md:col-span-4 md:ml-0 xl:col-start-3 xl:col-span-9">Nome caso: {dataForm.caseName}</h3>
                    <h3 className="mb-1 ml-8 font-semibold md:col-start-2 md:col-span-4 md:ml-0 xl:col-start-3 xl:col-span-9">Contratto: {props.id}</h3>
                    <time className="row-start-1 mb-1 md:col-start-1 xl:col-span-2 dark:text-gray-400">{dataForm.date ? new Date(dataForm.date * 1000).toLocaleDateString("it-IT") : "N/A"}</time>
                    <p className="ml-8 md:col-start-2 md:col-span-4 xl:col-start-3 xl:col-span-9 md:ml-0 dark:text-gray-300">{dataForm.contentDescription ? dataForm.contentDescription : "N/A"}</p>
                </div>
            </label>
        </li>
    )
}

export default ContractEntry;
