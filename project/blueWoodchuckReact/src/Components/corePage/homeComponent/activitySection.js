import { BodyEntry, TitleEntry } from "./activityEntry";
import { useState } from "react";

function RecentActivity() {

    const [inputList, setInputList] = useState([]);


    const onAddBtnClick = event => {
        console.log("Add button clicked");
        setInputList(inputList.concat(
            <BodyEntry
                key={inputList.length}
                id={inputList.length}
            />));
    };

    return (
        <div className="container mx-auto sm:p-4 dark:text-gray-100 bg-blue-900 p-10 rounded-md">
            <h2 className="mb-4 text-2xl font-semibold leading-tight">Attività recenti</h2>
            
            <div className="overflow-x-auto">
                <table className="min-w-full text-xs">
                    <thead className=''>
                        <TitleEntry />
                    </thead>
                    <tbody>
                        {inputList}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RecentActivity;