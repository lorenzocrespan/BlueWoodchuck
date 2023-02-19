// Import - React and React Router
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Import - MetaMask React
import { useMetaMask } from "metamask-react";

function Header() {

    const isConsoleActive = true;                           // Enable/Disable console debug.

    const navigator = useNavigate();                        // Variable to navigate to another page.
    const { status } = useMetaMask();                       // Variable to connect to MetaMask.

    const styleButton = "text-amber-500";                                   // Variable to customize the style of the button.
    const [lastButtonActive, setLastButtonActive] = useState("Button001"); // Variable to save the last button active.

    useEffect(() => {
        // Check if MetaMask account is not connected, in case try to reconnect.
        if (status === "notConnected") {
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(() => {
                    if (isConsoleActive) console.log("Accesso avvenuto con successo");
                    renderHomePage();
                })
                .catch(() => {
                    if (isConsoleActive) console.log("Account MetaMask non connesso");
                    rederLoginPage();
                });
        }
        // Update the state of navigation buttons, based on the current page loaded.
        activePageButtonOnLoad();
    }, [status]);

    function activePageButtonOnLoad() {
        if (isConsoleActive) console.log("Aggiornamento pagina attiva");
        // Based on the current page, set the button style.
        switch (window.location.pathname) {
            case "/homepage":
                activePageButtonSetup("Button001");
                break;
            case "/listForm":
                activePageButtonSetup("Button002");
                break;
            case "/NewForm":
                activePageButtonSetup("Button003");
                break;
            case "/Request":
                activePageButtonSetup("Button004");
                break;
            case "/advanceSearchPage":
                activePageButtonSetup("Button005");
                break;
            default:
                break;
        }
    }

    // Functions to render the page and set the style of the button.
    async function rederLoginPage() {
        if (isConsoleActive) console.log("Render della pagina di login.");
        navigator("/");
    }

    // Functions to render the page and set the style of the button.
    async function renderHomePage() {
        activePageButtonSetup("Button001");
        if (isConsoleActive) console.log("Render della pagina di home");
        navigator("/homepage")
    }

    // Functions to render the page and set the style of the button.
    async function renderListFormPage() {
        activePageButtonSetup("Button002");
        if (isConsoleActive) console.log("Render della pagina di lista form");
        navigator("/listForm")
    }

    // Functions to render the page and set the style of the button.
    async function renderNewFormPage() {
        activePageButtonSetup("Button003");
        if (isConsoleActive) console.log("Render della pagina di nuovo form");
        navigator("/NewForm")
    }

    // Functions to render the page and set the style of the button.
    async function renderRequestPage() {
        activePageButtonSetup("Button004");
        if (isConsoleActive) console.log("Render della pagina di richieste");
        navigator("/Request")
    }

    // Functions to render the page and set the style of the button.
    async function renderAdvanceSearchPage() {
        activePageButtonSetup("Button005");
        if (isConsoleActive) console.log("Render della pagina di ricerca avanzata");
        navigator("/advanceSearchPage")
    }

    // Functions to render the page and set the style of the button.
    async function renderSearchResultPage() {
        activePageButtonSetup("Button005");
        if (isConsoleActive) console.log("Render della pagina di ricerca avanzata");
        navigator("/advanceSearchPage")
    }

    // Function to set the style of the navbar.
    function activePageButtonSetup(idElement) {
        // Change tailwindcss style of the last button active.
        document.getElementById(lastButtonActive).classList.remove(styleButton);
        // Change tailwindcss style of the button.
        document.getElementById(idElement).classList.add(styleButton);
        // Save the last button active.
        setLastButtonActive(idElement);
    }

    const handleKeyDown = event => {
        console.log('User pressed: ', event.key);

        if (event.key === 'Enter') {
            console.log('Enter pressed');
            renderSearchResultPage(document.getElementById("Search").value);
        }
    };

    function renderSearchResultPage(id) {
        navigator('/ListForm/ContractShow/' + id);
    }

    return (
        <header className="p-4 bg-blue-900 text-gray-200">
            <div className="container flex justify-between mx-auto">
                <div className="flex">
                    <ul className="items-stretch hidden space-x-4 lg:flex">
                        <li className="flex">
                            <button id="Button001" className="flex items-center px-4 border-b-[1px] border-hidden hover:text-amber-500 ease-out duration-500" onClick={renderHomePage}>Homepage</button>
                        </li>
                        <li className="flex">
                            <button id="Button002" className="flex items-center px-4 border-b-[1px] border-hidden hover:text-amber-500 ease-out duration-500" onClick={renderListFormPage}>Lista Form</button>
                        </li>
                        <li className="flex">
                            <button id="Button003" className="flex items-center px-4 border-b-[1px] border-hidden hover:text-amber-500 ease-out duration-500" onClick={renderNewFormPage}>Nuovo Form</button>
                        </li>
                        <li className="flex">
                            <button id="Button004" className="flex items-center px-4 border-b-[1px] border-hidden hover:text-amber-500 ease-out duration-500" onClick={renderRequestPage}>Richieste</button>
                        </li>
                        <li className="flex">
                            <button id="Button005" className="flex items-center px-4 border-b-[1px] border-hidden hover:text-amber-500 ease-out duration-500" onClick={renderAdvanceSearchPage}>Ricerca Avanzata</button>
                        </li>
                    </ul>
                </div>
                <input type="text" onKeyDown={handleKeyDown} name="Search" id="Search" placeholder="Search..." className="w-32 py-2 text-sm rounded-md focus:border-amber-500 border-white sm:w-auto focus:outline-none dark:bg-blue-900 focus:ring-amber-500 focus:ring-2 focus:text-blue-900 focus:dark:bg-gray-200 placeholder:focus:text-amber-500 placeholder:text-gray-200 ease-out duration-500" />
            </div>
        </header>
    );
}

export default Header;