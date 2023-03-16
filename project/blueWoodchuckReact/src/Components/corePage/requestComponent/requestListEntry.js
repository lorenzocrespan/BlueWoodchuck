import { useEffect, useState } from 'react';

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
        props.onOpen(props.id);
    }

    const sendAcceptContract = async () => {
        await props.FormContract.methods.acceptForm(props.id, "Accettato").send({ from: props.account });
        window.location.reload();
    }
    
    return (
        <li>
            <article>
                <div className="grid p-5 overflow-hidden border rounded-xl grid-cols-12 hover:border-amber-500 ease-in-out duration-500">
                    <h3 className="mb-1 ml-8 font-semibold md:ml-0 xl:col-start-3 xl:col-span-8 text-gray-200">Nome caso: {dataForm.caseName ? dataForm.caseName : "Non disponibile"}</h3>
                    <h3 className="mb-1 ml-8 font-semibold md:ml-0 xl:col-start-3 xl:col-span-8 text-gray-200">Contratto: {props.id ? props.id : "Non disponibile"}</h3>
                    <time className="row-start-1 md:col-start-1 xl:col-span-2 text-gray-300">{dataForm.date ? new Date(dataForm.date * 1000).toLocaleDateString("it-IT") : "Non disponibile"}</time>
                    {
                        contractInCharge.includes(props.id) ?
                            <button className="col-span-2 h-10 px-4 font-semibold rounded-md self-center text-white hover:text-amber-500 ease-out duration-500" onClick={revokeContract}>Ritira</button>
                            :
                            <>
                                <button className="col-span-1 h-10 rounded-md self-center text-white hover:text-amber-500  ease-out duration-500" onClick={acceptContract}>Accetta</button>
                                <button className="col-span-1 h-10 rounded-md self-center text-white hover:text-amber-500  ease-out duration-500" onClick={revokeContract}>Rifiuta</button>
                            </>
                    }
                    <p className="ml-8 md:col-start-2 xl:col-start-3 xl:col-span-9 md:ml-0 text-gray-300">{dataForm.contentDescription ? dataForm.contentDescription : "Non disponibile"}</p>
                </div>
            </article>
        </li>
    )
}

export default ContractEntry;
