import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

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

    const navigate = useNavigate();

    async function redirectPage() {
        navigate('/ListForm/ContractShow/' + props.id);
    }

    return (
        <li>
            <article>
                <a rel="noopener noreferrer" className="grid p-4 overflow-hidden md:grid-cols-5 rounded-xl lg:p-6 xl:grid-cols-12 hover: bg-gray-900" onClick={redirectPage}>
                    <h3 className="mb-1 ml-8 font-semibold md:col-start-2 md:col-span-4 md:ml-0 xl:col-start-3 xl:col-span-9">Nome caso: {dataForm.caseName}</h3>
                    <h3 className="mb-1 ml-8 font-semibold md:col-start-2 md:col-span-4 md:ml-0 xl:col-start-3 xl:col-span-9">Contratto: {props.id}</h3>
                    <time className="row-start-1 mb-1 md:col-start-1 xl:col-span-2  text-gray-400">{dataForm.date ? new Date(dataForm.date * 1000).toLocaleDateString("it-IT") : "N/A"}</time>
                    <p className="ml-8 md:col-start-2 md:col-span-4 xl:col-start-3 xl:col-span-9 md:ml-0  text-gray-300">{dataForm.contentDescription ? dataForm.contentDescription : "N/A"}</p>
                </a>
            </article>
        </li>
    )
}

export default ContractEntry;
