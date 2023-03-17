// Import - React
import { useState } from 'react';
// Import - Web3 & Smart Contract ABI
import Web3 from 'web3';
import { getFormAddress, getFormABI } from '../../abi/abi';
// Import - Components
import ContractEntry from "./commonComponent/formListEntry";
import EmptyContractList from './commonComponent/formListEmpty';

function CoreSearch() {
    // Enable/Disable console debug.
    const isConsoleActive = false;
    // Connect to blockchain and smart contract.
    const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:7575');
    const FormFactoryContract = new web3.eth.Contract(getFormABI(), getFormAddress());
    // Account information.
    const [isChange, setIsChange] = useState(false);

    const [dateValue, setDateValue] = useState(null);
    const [contractsFound, setContractsFound] = useState([]);
    const [searchResultBool, setSearchResultBool] = useState(false);

    // Listen metamask account change.
    window.ethereum.on('accountsChanged', () => { setIsChange(!isChange); });

    // Search contract by data.
    // TODO: Update the search function to search by other parameters.
    const searchContract = async () => {
        if(isConsoleActive) console.debug("Search function called.");
        // Get information from input
        // const search = document.getElementById("Search").value;
        const date = Math.floor(new Date(dateValue) / 1000);
        const contractsFound = await FormFactoryContract.methods.findContractByDate(date).call();
        // const count = await FormFactoryContract.methods.countFormsBasedOnDate(date).call();
        console.debug("Contracts fount: ", contractsFound);

        // Set the list of contracts in charge.
        setContractsFound(contractsFound);
        setSearchResultBool(true);
    }

    const listItems = contractsFound.map((data, index) =>
        <ContractEntry
            key={index}
            FormContract={FormFactoryContract}
            id={data}
        />
    );

    return (
        <div className="bg-gray-100 text-gray-100">
            <div className="min-h-screen container flex flex-col p-10 mx-auto space-y-6">
                <div className="container flex flex-col justify-between h-auto mx-auto bg-blue-900 p-10 rounded-md">
                    <div className="flex flex-col items-center p-4">
                        <div className="relative flex flex-col gap-3 w-full">
                            <input type="text" name="Search" id="Search" placeholder="Ricerca..." className="w-full text-lg rounded-md border-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500 text-blue-900 placeholder:border-gray-700 placeholder:focus:text-amber-500 ease-out duration-500" />
                            <input type="date" name="Date" id="Date" className="w-full text-lg rounded-md border-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500 text-blue-900 placeholder:border-gray-700 placeholder:focus:text-amber-500 ease-out duration-500" onChange={(e) => setDateValue(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="h-12 px-4 font-semibold rounded-md self-center text-white bg-blue-900 hover:bg-amber-600 ease-out duration-500" onClick={searchContract}>
                        Ricerca
                    </button>
                </div>
                {searchResultBool ? (
                    <div className="container flex flex-col justify-between h-auto mx-auto bg-blue-900 rounded-md">
                        <ul className="flex flex-col container justify-between mx-auto bg-blue-900 p-10 gap-4 rounded-md">
                            <h2 className="mb-4 text-2xl font-semibold">Risultati ricerca</h2>
                            {
                                contractsFound.length === 0
                                    ?
                                    <EmptyContractList
                                        textSection="Non è stato trovato alcun form a carico dell'utente."
                                    />
                                    : listItems
                            }
                        </ul>
                    </div>
                ) : null}
            </div >
        </div>
    );
}
export default CoreSearch;