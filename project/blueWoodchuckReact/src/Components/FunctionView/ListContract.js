import ContractEntry from "./ContractEntry";
import React, { useState } from "react";

function ListContract() {

    const [inputList, setInputList] = useState([]);

    const onAddBtnClick = event => {
        console.log("Add button clicked");
        setInputList(inputList.concat(
            <ContractEntry 
                key={inputList.length} 
                id = {inputList.length}
            />));
    };

    return (
        <ul className="flex flex-col container justify-between mx-auto p-4 lg:p-8 dark:bg-gray-800 dark:text-gray-100">
            <h2 className="mb-4 text-2xl font-semibold">Lista contratti in carico</h2>
            <button onClick={onAddBtnClick}>
                Add User
            </button>
            {inputList}


        </ul>
    )
}

export default ListContract;
