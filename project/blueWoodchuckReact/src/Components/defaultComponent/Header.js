// Import - React and React Router
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Import - MetaMask React
import { useMetaMask } from "metamask-react";

function Header() {

    // Enable/Disable console debug.
    const isConsoleActive = true;
    // Variable to navigate to another page.
    const navigator = useNavigate();
    // Variable to connect to MetaMask.
    const { status } = useMetaMask();
    // Variable to save the last button active to set/reset the style.
    const [lastButtonActive, setLastButtonActive] = useState("Button001");
    const styleButton = "text-amber-500";

    useEffect(() => {
        // Check if MetaMask account is not connected, in case try to reconnect.
        if (isConsoleActive) console.log("Verifica stato di connessione a MetaMask");
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

    async function renderHomePage() {
        activePageButtonSetup("Button001");
        if (isConsoleActive) console.log("Render della pagina di home");
        navigator("/homepage")
    }

    async function renderListFormPage() {
        activePageButtonSetup("Button002");
        if (isConsoleActive) console.log("Render della pagina di lista form");
        navigator("/listForm")
    }

    async function renderNewFormPage() {
        activePageButtonSetup("Button003");
        if (isConsoleActive) console.log("Render della pagina di nuovo form");
        navigator("/NewForm")
    }

    async function renderExchangePage() {
        activePageButtonSetup("Button004");
        if (isConsoleActive) console.log("Render della pagina di richieste");
        navigator("/SendRequest")
    }
    
    async function renderRequestPage() {
        activePageButtonSetup("Button005");
        if (isConsoleActive) console.log("Render della pagina di richieste");
        navigator("/Requests")
    }

    async function renderAdvanceSearchPage() {
        activePageButtonSetup("Button006");
        if (isConsoleActive) console.log("Render della pagina di ricerca avanzata");
        navigator("/Search")
    }

    const renderContract = event => {
        if (event.key === 'Enter') navigator('/ListForm/ContractShow/' + document.getElementById("Search").value);
    };

    // Function to set the style of the navbar.
    function activePageButtonSetup(idElement) {
        // Change tailwindcss style of the last button active and new button active.
        document.getElementById(lastButtonActive).classList.remove(styleButton);
        document.getElementById(idElement).classList.add(styleButton);
        setLastButtonActive(idElement);
    }

    return (
        <header className="p-4 bg-blue-900 text-gray-100">
            <div className="container flex justify-between mx-auto">
                <div className="flex">
                    <ul className="items-stretch hidden space-x-4 lg:flex">
                        <li className="flex">
                            <button id="Button001" className="flex items-center px-4 border-b-[1px] border-hidden hover:text-amber-500 ease-out duration-500" onClick={renderHomePage}>Homepage</button>
                        </li>
                        <li className="flex">
                            <button id="Button002" className="flex items-center px-4 border-b-[1px] border-hidden hover:text-amber-500 ease-out duration-500" onClick={renderListFormPage}>Lista contratti</button>
                        </li>
                        <li className="flex">
                            <button id="Button003" className="flex items-center px-4 border-b-[1px] border-hidden hover:text-amber-500 ease-out duration-500" onClick={renderNewFormPage}>Nuovo contratto</button>
                        </li>
                        <li className="flex">
                            <button id="Button004" className="flex items-center px-4 border-b-[1px] border-hidden hover:text-amber-500 ease-out duration-500" onClick={renderExchangePage}>Trasferimento</button>
                        </li>
                        <li className="flex">
                            <button id="Button005" className="flex items-center px-4 border-b-[1px] border-hidden hover:text-amber-500 ease-out duration-500" onClick={renderRequestPage}>Richieste</button>
                        </li>
                        <li className="flex">
                            <button id="Button006" className="flex items-center px-4 border-b-[1px] border-hidden hover:text-amber-500 ease-out duration-500" onClick={renderAdvanceSearchPage}>Ricerca Avanzata</button>
                        </li>
                    </ul>
                </div>
                <input type="text" onKeyDown={renderContract} name="Search" id="Search" placeholder="Ricerca..." className="w-32 py-2 sm:w-auto text-sm rounded-md border-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500 text-blue-900 placeholder:border-gray-700 placeholder:focus:text-amber-500 ease-out duration-500" />
            </div>
        </header>
    );
}

export default Header;