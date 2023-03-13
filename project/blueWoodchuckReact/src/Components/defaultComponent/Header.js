// Import - React and React Router
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Import - MetaMask React
import { useMetaMask } from "metamask-react";

function Header() {

    // Enable/Disable console debug.
    const isConsoleActive = false;
    // Variable to navigate to another page.
    const navigator = useNavigate();
    // Variable to connect to MetaMask.
    const { status } = useMetaMask();
    // Variable to save the last button active to set/reset the style.
    const [lastButtonActive, setLastButtonActive] = useState("Button001");
    const styleButton = "text-amber-600";

    useEffect(() => {
        // Check if MetaMask account is not connected, in case try to reconnect.
        if (isConsoleActive) console.debug("Header", "Verifica stato di connessione a MetaMask");
        // TODO: I don't like how this is done. In my opinion if the user is not connected to MetaMask,
        //  the site has to load the login page and not activate the MetaMask connection (or if the user 
        //  logs in with MetaMask, the site has to load the homepage).
        if (status === "notConnected") {
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(() => {
                    if (isConsoleActive) console.debug("Header", "Account MetaMask connesso");
                    renderHomePage();
                })
                .catch(() => {
                    if (isConsoleActive) console.debug("Header", "Account MetaMask non connesso");
                    rederLoginPage();
                });
        }
        // Update the state of navigation buttons, based on the current page loaded.
        activePageButtonOnLoad();
    }, [status]);

    // Function to set the style of the navbar, based on the current page loaded.
    function activePageButtonOnLoad() {
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

    // Function to set the style of the navbar.
    function activePageButtonSetup(idElement) {
        // Change tailwindcss style of the last button active and new button active.
        document.getElementById(lastButtonActive).classList.remove(styleButton);
        document.getElementById(idElement).classList.add(styleButton);
        setLastButtonActive(idElement);
    }

    // Functions to render the page and set the style of the button.
    async function rederLoginPage() {
        navigator("/");
    }

    async function renderHomePage() {
        activePageButtonSetup("Button001");
        navigator("/homepage")
    }

    async function renderListFormPage() {
        activePageButtonSetup("Button002");
        navigator("/listForm")
    }

    async function renderNewFormPage() {
        activePageButtonSetup("Button003");
        navigator("/newForm")
    }

    async function renderExchangeFormPage() {
        activePageButtonSetup("Button004");
        navigator("/exchangeForm")
    }

    async function renderRequestFormPage() {
        activePageButtonSetup("Button005");
        navigator("/requestForm")
    }

    async function renderAdvanceSearchPage() {
        activePageButtonSetup("Button006");
        navigator("/advanceSearch")
    }

    const renderSimpleFormExplore = event => {
        if (event.key === 'Enter') navigator('/listForm/contractShow/' + document.getElementById("Ricerca").value);
    };

    return (
        <header className="p-5 bg-blue-900 text-gray-100">
            <div className="container flex justify-between mx-auto text-lg">
                <div className="flex">
                    <ul className="items-stretch space-x-4 flex">
                        <li className="flex">
                            <button id="Button001" className="flex items-center px-4 border-b-[1px] border-hidden hover:text-amber-500 ease-out duration-500" onClick={renderHomePage}>Homepage</button>
                        </li>
                        <li className="flex">
                            <button id="Button002" className="flex items-center px-4 border-b-[1px] border-hidden hover:text-amber-500 ease-out duration-500" onClick={renderListFormPage}>Lista form</button>
                        </li>
                        <li className="flex">
                            <button id="Button003" className="flex items-center px-4 border-b-[1px] border-hidden hover:text-amber-500 ease-out duration-500" onClick={renderNewFormPage}>Nuovo form</button>
                        </li>
                        <li className="flex">
                            <button id="Button004" className="flex items-center px-4 border-b-[1px] border-hidden hover:text-amber-500 ease-out duration-500" onClick={renderExchangeFormPage}>Trasferimento form</button>
                        </li>
                        <li className="flex">
                            <button id="Button005" className="flex items-center px-4 border-b-[1px] border-hidden hover:text-amber-500 ease-out duration-500" onClick={renderRequestFormPage}>Richieste form</button>
                        </li>
                        <li className="flex">
                            <button id="Button006" className="flex items-center px-4 border-b-[1px] border-hidden hover:text-amber-500 ease-out duration-500" onClick={renderAdvanceSearchPage}>Ricerca form avanzata</button>
                        </li>
                    </ul>
                </div>
                <input type="text" onKeyDown={renderSimpleFormExplore} id="Ricerca" placeholder="Ricerca ..." className="w-72 py-2 text-lg rounded-md border-white focus:border-amber-600 focus:ring-2 focus:ring-amber-600 text-blue-900 placeholder:border-gray-700 placeholder:focus:text-amber-600 ease-out duration-500" />
            </div>
        </header>
    );
}

export default Header;