import React from "react";

function UserInfo(props) {

    return (
        <div className="container flex justify-between h-16 mx-auto bg-red-500">
            <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
                <img src={require("../../Asset/Images/blueWoodchuckLogo.jpg")} alt="" className="self-center flex-shrink-0 w-24 h-24 border rounded-full md:justify-self-start dark:bg-gray-500 dark:border-gray-700" />
                <div className="flex flex-col">
                    <h4 className="text-lg font-semibold text-center md:text-left">Utente: {props.account}</h4>
                    <h4 className="text-lg font-semibold text-center md:text-left">Contratto: {props.contract}</h4>
                </div>
            </div>
        </div>
    )
}

export default UserInfo;