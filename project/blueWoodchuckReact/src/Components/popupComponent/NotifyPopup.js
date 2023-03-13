// Import - React 
import { useState, useEffect } from "react";

function NotifyPopup(props) {

    // Enable/Disable console debug.
    const isConsoleActive = false;
    // Variable to show the popup modal.
    const [notifyPopup, setNotifyPopup] = useState(false);

    useEffect(() => {
        if (isConsoleActive) console.debug("NotifyPopup", "Rilevata modifica alla variabile notifyPopup, cambio delle stato di visualizzazione del componente");
        // If the parent component sends the data to show the popup modal (errorPopup = true), show it.
        setNotifyPopup(props.notifyPopup);
        if(props.notifyPopup) {
            // If the popup modal is shown, start the timer to hide it.
            setTimeout(() => {
                setNotifyPopup(false);
                props.onClose(false); 
            }, 4000);
        }
    }, [props.notifyPopup]);

    // Function to close the popup modal and send the data to the parent component.
    const closeHandler = () => {
        setNotifyPopup(false);
        props.onClose(false);
    };

    return (
        <div>
            {notifyPopup ? (
                <div id="notification" className="fixed right-3 top-3">
                    <div className="flex gap-6 rounded-lg overflow-hidden divide-x border-2 border-amber-500 max-w-2xl bg-blue-900 text-gray-100">
                        <div className="flex flex-1 flex-col p-4 gap-1 text-base">
                            <span className="font-bold text-amber-500">{props.titlePopup}</span>
                            <span>{props.textPopup}</span>
                        </div>
                        <button className="px-4 flex items-center text-xs uppercase tracking-wide text-gray-400 border-amber-500 hover:text-amber-500" onClick={closeHandler}>Nascondi</button>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default NotifyPopup;
