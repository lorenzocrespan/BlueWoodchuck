import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function ContractEntry(props) {

    const [dataForm, setDataForm] = useState({});
    const [contractInCharge, setContractInCharge] = useState([]);

    useEffect(() => {
        getDataForm();
    }, []);


    const getDataForm = async () => {
        // Get form data for each contract.
        let dataFormToSet = await props.FormContract.methods.readFormAddress(props.id).call();
        setContractInCharge(await props.FormContract.methods.getUserFormAddresses(props.account).call());

        setDataForm(dataFormToSet);
    }

    const revokeContract = async () => {
        await props.FormContract.methods.rejectForm(props.id).send({ from: props.account });
        window.location.reload();
    }

    const acceptContract = async () => {
        await props.FormContract.methods.acceptForm(props.id, "Accettato").send({ from: props.account });
        window.location.reload();
    }

    return (
        <li>
            <article>
                <div className="grid p-4 gap-3 overflow-hidden md:grid-cols-5 rounded-xl lg:p-6 xl:grid-cols-12 hover: bg-gray-900">
                    <h3 className="mb-1 ml-8 font-semibold md:col-start-1 md:col-span-3 md:ml-0 xl:col-start-3 xl:col-span-8">Nome caso: {dataForm.caseName}</h3>
                    <h3 className="mb-1 ml-8 font-semibold md:col-start-1 md:col-span-3 md:ml-0 xl:col-start-3 xl:col-span-8">Contratto: {props.id}</h3>
                    <time className="row-start-1 mb-1 md:col-start-1 xl:col-span-2  text-gray-400">{dataForm.date ? new Date(dataForm.date * 1000).toLocaleDateString("it-IT") : "N/A"}</time>
                    {contractInCharge.includes(props.id) ?
                        <button className="col-span-2 h-12 rounded-md self-center text-white bg-blue-800 hover:bg-amber-600  ease-out duration-500" onClick={revokeContract}>Ritira</button>
                        :
                        <>
                            <button className="col-span-1 h-12 rounded-md self-center text-white bg-blue-800 hover:bg-amber-600  ease-out duration-500" onClick={acceptContract}>Accetta</button>
                            <button className="col-span-1 h-12 rounded-md self-center text-white bg-blue-800 hover:bg-amber-600  ease-out duration-500" onClick={revokeContract}>Rifiuta</button>
                        </>
                    }
                </div>
            </article>
        </li>
    )
}

export default ContractEntry;
