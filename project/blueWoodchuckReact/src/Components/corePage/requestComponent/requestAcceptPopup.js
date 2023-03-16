// Import - React 
import { useState, useEffect } from "react";

function AcceptPopup(props) {

    // Enable/Disable console debug.
    const isConsoleActive = true;
    // Variable to show the popup modal.
    const [acceptPopup, setAcceptPopup] = useState(true);

    useEffect(() => {
        if (isConsoleActive) console.debug("AcceptPopup", "Rilevata modifica alla variabile acceptPopup, cambio delle stato di visualizzazione del componente");
        // If the parent component sends the data to show the popup modal (acceptPopup = true), show it.
        setAcceptPopup(props.acceptPopup);
    }, [props.acceptPopup]);

    // Function to close the popup modal and send the data to the parent component.
    const closeHandlerDefault = () => {
        setAcceptPopup(false);
        props.onClose(false);
    };

    // Function to close the popup modal and send the data to the parent component.
    const closeHandlerAccept = () => {
        setAcceptPopup(false);
        // Get data inside the input field.
        const inputField = document.getElementById("acceptReason");
        // Send data to the parent component.
        props.onClose(inputField.value);
    };

    return (
        <div>
            {acceptPopup ? (
                <div>
                    <div className="opacity-90 fixed inset-0 z-10 bg-black" />
                    <div className="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="flex flex-col gap-2 p-6 rounded-md shadow-md bg-gray-300 text-blue-900 ">
                            <h2 className="flex items-center gap-2 text-xl font-extrabold leading-tight tracking-wide">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6 fill-current shrink-0  text-amber-600">
                                    <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
                                </svg>
                                {props.title}
                            </h2>
                            <p className=" font-medium  text-blue-900">
                                Sei sicuro di voler prendere in carico il form e relativo materiale da parte di {props.taker}?
                            </p>
                            <textarea id="acceptReason" placeholder="Il materiale è stato trasferito per ..." defaultValue={"Form e materiale verificato. Prendo in carico senza riserva."} className="w-full text-lg rounded-md border-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500 text-blue-900 placeholder:border-gray-700 placeholder:focus:text-amber-500 ease-out duration-500" required />

                            <div className="flex flex-col justify-end gap-3 mt-6 sm:flex-row">
                                <button className="h-10 px-4 font-semibold rounded-md self-center text-white bg-blue-800 hover:bg-amber-600 ease-out duration-500" onClick={closeHandlerAccept}>Invia</button>
                                <button className="h-10 px-4 font-semibold rounded-md self-center text-white bg-blue-800 hover:bg-amber-600 ease-out duration-500" onClick={closeHandlerDefault}>Annulla</button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default AcceptPopup;