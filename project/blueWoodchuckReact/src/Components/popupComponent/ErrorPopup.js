// Import - React 
import { useState, useEffect } from "react";

function ErrorPopup(props) {

    // Variable to show the popup modal.
    const [errorPopup, setErrorPopup] = useState(false);

    useEffect(() => {
        // If the parent component sends the data to show the popup modal (errorPopup = true), show it.
        setErrorPopup(props.errorPopup);
    }, [props.errorPopup]);

    // Function to close the popup modal and send the data to the parent component.
    const closeHandler = () => {
        setErrorPopup(false);
        props.onClose(false);
    };

    return (
        <div>
            {errorPopup ? (
                <div>
                    <div className="opacity-90 fixed inset-0 z-10 bg-black" />
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="flex flex-col max-w-md gap-2 p-6 rounded-md shadow-md bg-gray-300 text-blue-900 ">
                            <h2 className="flex items-center gap-2 text-xl font-extrabold leading-tight tracking-wide">
                                {props.title}
                            </h2>
                            <p className=" font-medium dark:text-blue-800">
                                {props.body}
                            </p>
                            <div className="flex flex-col justify-end gap-3 mt-6 sm:flex-row">
                                <button className="h-12 px-4 font-semibold rounded-md self-center text-white bg-blue-800 hover:bg-amber-600 ease-out duration-500" onClick={closeHandler}>Chiudi</button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default ErrorPopup;