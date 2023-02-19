import React from "react";

function UserInfo(props) {

    // onClick copy to clipboard.
    const copyToClipboard = (elemToCopy) => {
        navigator.clipboard.writeText(elemToCopy);
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
        <div className="container flex justify-between h-auto mx-auto bg-blue-900 p-10 rounded-md">
            <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
                <img src={require("../../../Asset/Images/blueWoodchuckLogo.jpg")} alt="" className="self-center flex-shrink-0 w-24 h-24 rounded-full md:justify-self-start dark:bg-gray-500 dark:border-amber-600 border-2" />
                <table className="min-w-full">
                    <tbody className="text-lg font-semibold text-center md:text-left">
                        <tr>
                            <td className="text-xl">Utente: </td>
                            <td className="px-3 hover:text-amber-500 ease-out duration-500" onClick={() => copyToClipboard(props.account)}>{props.account}</td>
                        </tr>
                        <tr>
                            <td className="text-xl">Rete attuale: </td>
                            <td className="px-3 hover:text-amber-500 ease-out duration-500" onClick={() => copyToClipboard(props.networkId)}> {getNetworkName(props.networkId)}</td>
                        </tr>
                        <tr>
                            <td className="text-xl">Bilancio attuale: </td>
                            <td className="px-3 hover:text-amber-500 ease-out duration-500" onClick={() => copyToClipboard(props.balance)}>{props.balance} ETH</td>
                        </tr>
                        <tr>
                            <td className="text-xl">Contratto di riferimento: </td>
                            <td className="px-3 hover:text-amber-500 ease-out duration-500" onClick={() => copyToClipboard(props.contract)}>{props.contract}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserInfo;