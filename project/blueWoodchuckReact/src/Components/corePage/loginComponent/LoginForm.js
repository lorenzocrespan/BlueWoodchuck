// Import - React and React Router
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Import - Components
import ErrorPopup from "../../popupComponent/ErrorPopup";

function LoginForm() {

    const isConsoleActive = true;                           // Enable/Disable console debug.

    const navigator = useNavigate();                        // Variable to navigate to another page.
    const [errorPopup, setErrorPopup] = useState(false);    // Variable to show the popup modal.
    const [title, setTitle] = useState("Titolo del popup"); // Variable to customize the title of the popup modal.
    const [body, setBody] = useState("Corpo del popup");

    // Function to connect to MetaMask.
    async function login() {
        if (isConsoleActive) console.log("Verifica presenza di MetaMask");
        // Check if MetaMask is installed.
        if (typeof window.ethereum === 'undefined') {
            setTitle("Errore di connessione");
            setBody("Non è stato trovato nessun provider di Ethereum. Assicurati di aver installato MetaMask.");
            setErrorPopup(true);
            return;
        }
        // Try to connect to MetaMask.
        if (isConsoleActive) console.log("Tentativo di accesso a MetaMask");
        window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(() => {
                if (isConsoleActive) console.log("Accesso avvenuto con successo");
                // If the connection is successful, navigate to the homepage.
                navigator("/homepage");
            })
            .catch((err) => {
                if (err.code === -32002) {
                    setTitle("EIP-1193 userRejectedRequest error");
                    setBody("Accesso negato. Per accedere devi autorizzare MetaMask.");
                    setErrorPopup(true);
                } else {
                    setTitle("Errore di connessione");
                    setBody("Si è verificato un errore durante la connessione a MetaMask. Riprova più tardi.");
                    setErrorPopup(true);
                }
            });
    }

    // Function to close the popup modal.
    const popupCloseHandler = (dataHandler) => {
        setErrorPopup(dataHandler);
    };

    return (
        <div className="w-fit h-fit flex rounded bg-white bg-opacity-60">
            <ErrorPopup
                onClose={popupCloseHandler}
                errorPopup={errorPopup}
                title={title}
                body={body}
            />
            <div name="leftSideLoginForm" className="w-1/2 h-full flex p-4 rounded-l bg-white">
                <img src={require("../../../Asset/Images/blueWoodchuckLogo.jpg")} alt="blueWoodchuckLogo" />
            </div>
            <div name="rightSideLoginForm" className="w-1/2 h-full flex flex-col p-4 rounded-r self-center text-center">
                <p name="title" className="pb-12 text-3xl font-bold">
                    <span className="text-blue-600">Blue</span>
                    <span className="text-amber-600">Woodchuck</span>
                </p>
                <button className="w-1/2 h-12 font-semibold rounded-md self-center text-white bg-blue-800 hover:bg-amber-600  ease-out duration-500" onClick={login}> Login con Metamask</button>
            </div>
        </div>
    );
}

export default LoginForm;