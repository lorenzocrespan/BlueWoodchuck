// Import - React 
import { useState, useEffect } from "react";

function FreeFormPopup(props) {

    const [errorPopup, setErrorPopup] = useState(false);

    const closeHandler = (dataHandler) => {
        setErrorPopup(false);
        props.onClose(false);
    };

    useEffect(() => {
        setErrorPopup(props.errorPopup);
    }, [props.errorPopup]);

    const sendContract = async (e) => {
        e.preventDefault();
        // let idFormArray = [];
        // Make props.idForm an array of strings
        // for (let i = 0; i < props.idForm.length; i++) idFormArray.push(props.idForm[i].id);
        // await props.FormContract.methods.giveForm(idFormArray, props.taker).send({ from: props.account });
        let idForm = props.idForm[0].id;
        await props.FormContract.methods.giveForm(idForm, props.taker).send({ from: props.account });
        // wait event completion to close the popup
        closeHandler();
    }

    const listItems = props.idForm.map((data, index) =>
        <li key={index} className="text-blue-900 text-base">
           {data.id}
        </li>
    );

    return (
        <div>
            {errorPopup ? (
                <div>
                    <div className="opacity-90 fixed inset-0 z-10 bg-black" />
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="flex flex-col gap-2 p-6 rounded-md shadow-md bg-gray-300 text-blue-900 ">
                            <h2 className="flex items-center gap-2 text-xl font-extrabold leading-tight tracking-wide">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6 fill-current shrink-0  text-amber-600">
                                    <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
                                </svg>
                                {props.title}
                            </h2>
                            <p className="font-medium text-blue-800">
                                Sei sicuro di voler inviare {props.idForm.length > 1 ? "i seguenti" : "il seguente"} form a {props.taker}?
                            </p>
                            <ul className="gap-2 list-disc list-inside marker:text-amber-600">
                                {listItems}
                            </ul>
                            <div className="flex flex-col justify-end gap-3 mt-6 sm:flex-row">
                                <button className="h-10 px-4 font-semibold rounded-md self-center text-white bg-blue-800 hover:bg-amber-600 ease-out duration-500" onClick={sendContract}>Conferma</button>
                                <button className="h-10 px-4 font-semibold rounded-md self-center text-white bg-blue-800 hover:bg-amber-600 ease-out duration-500" onClick={closeHandler}>Annulla</button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default FreeFormPopup;