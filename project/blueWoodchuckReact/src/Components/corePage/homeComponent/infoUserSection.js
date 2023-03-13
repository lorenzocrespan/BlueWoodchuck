// Import - React
import { useState } from 'react';
// Import - Components
import NotifyPopup from "../../popupComponent/NotifyPopup";

function UserInfo(props) {

    // Enable/Disable console debug.
    const isConsoleActive = false;
    // Variable to show the popup modal.
    const [notifyPopup, setNotifyPopup] = useState(false);
    const [titlePopup, setTitlePopup] = useState("Success");
    const [textPopup, setTextPopup] = useState("Vitae nulla eligendi dignissimos culpa doloribus.");

    // Function to close the popup modal.
    const popupCloseHandler = (dataHandler) => {
        setNotifyPopup(dataHandler);
    };

    // onClick copy to clipboard.
    const copyToClipboard = (elemToCopy) => {
        navigator.clipboard.writeText(elemToCopy);
        // Setup and show popup.
        setTitlePopup("Copiato con successo");
        setTextPopup("L'elemento " + elemToCopy + " è stato copiato.");
        setNotifyPopup(true);
    }

    // Get network name from network id.
    const getNetworkName = (networkId) => {
        switch (networkId) {
            case 1:
                return "Mainnet";
            case 3:
                return "Ropsten";
            case 4:
                return "Rinkeby";
            case 5:
                return "Goerli";
            case 42:
                return "Kovan";
            case 7777:
                return "BlueWoodchuck";
            default:
                return "Unknown";
        }
    }

    return (
        <>
            <div className="container flex justify-between h-auto mx-auto bg-blue-900 p-12 rounded-md">
                <div className="flex flex-row gap-10">
                    <img src={require("../../../Asset/Images/blueWoodchuckLogo.jpg")} alt="" className="self-center flex-shrink-0 w-28 h-28 rounded-full md:justify-self-start bg-gray-500  border-amber-600 border-4"/>
                    <table className="min-w-full">
                        <tbody className="text-lg font-semibold text-center md:text-left">
                            <tr>
                                <td className="text-xl">Utente: </td>
                                <td className="px-5 hover:text-amber-500 ease-out duration-500 cursor-pointer" onClick={() => copyToClipboard(props.account)}>{props.account}</td>
                            </tr>
                            <tr>
                                <td className="text-xl">Rete attuale: </td>
                                <td className="px-5 hover:text-amber-500 ease-out duration-500 cursor-pointer" onClick={() => copyToClipboard(props.networkId)}> {getNetworkName(props.networkId)}</td>
                            </tr>
                            <tr>
                                <td className="text-xl">Bilancio attuale: </td>
                                <td className="px-5 hover:text-amber-500 ease-out duration-500 cursor-pointer" onClick={() => copyToClipboard(props.balance)}>{props.balance} ETH</td>
                            </tr>
                            <tr>
                                <td className="text-xl">Contratto di riferimento: </td>
                                <td className="px-5 hover:text-amber-500 ease-out duration-500 cursor-pointer" onClick={() => copyToClipboard(props.contract)}>{props.contract}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <NotifyPopup
                onClose={popupCloseHandler}
                notifyPopup={notifyPopup}
                titlePopup={titlePopup}
                textPopup={textPopup}
            />
        </>
    )
}

export default UserInfo;