// Import - React & React Router
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function ContractEntry(props) {

    const [dataForm, setDataForm] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        getDataForm();
    }, []);

    const getDataForm = async () => {
        // Get form data for each contract.
        let dataFormToSet = await props.FormContract.methods.readFormAddress(props.id).call();
        setDataForm(dataFormToSet);
    }

    async function redirectPage() {
        navigate('/ListForm/ContractShow/' + props.id);
    }

    return (
        <li>
            <article>
                <a className="grid p-4 overflow-hidden border rounded-xl lg:p-6 grid-cols-12 hover:border-amber-500 hover:text-amber-500 ease-in-out duration-500 cursor-pointer" onClick={redirectPage}>
                    <h3 className="mb-1 ml-8 font-semibold md:ml-0 xl:col-start-3 xl:col-span-8 text-gray-200">Nome caso: {dataForm.caseName ? dataForm.caseName : "Non disponibile"} (Numero artefatto: {dataForm.itemNumber ? dataForm.itemNumber : "Non disponibile"}) </h3>
                    
                    <h3 className="mb-1 ml-8 font-semibold md:ml-0 xl:col-start-3 xl:col-span-8 text-gray-200">Contratto: {props.id ? props.id : "Non disponibile"}</h3>
                    <time className="row-start-1 md:col-start-1 xl:col-span-2 text-gray-300">{dataForm.date ? new Date(dataForm.date * 1000).toLocaleDateString("it-IT") : "Non disponibile"}</time>
                    <p className="ml-8 col-start-12 ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </p>
                    <p className="ml-8 md:col-start-2 xl:col-start-3 xl:col-span-9 md:ml-0 text-gray-300">{dataForm.contentDescription ? dataForm.contentDescription : "Non disponibile"}</p>
                </a>
            </article>
        </li>
    )
}

export default ContractEntry;
