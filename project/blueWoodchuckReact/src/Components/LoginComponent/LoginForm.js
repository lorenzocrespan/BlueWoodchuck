import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMetaMask } from "metamask-react";
import Modal from "../ErrorComponent/ErrorModal";

function LoginForm() {

    // Variable to navigate to another page
    const navigator = useNavigate();
    // Variable to check the status of MetaMask
    const { status, connect, account } = useMetaMask();
    // Variable to show the popup modal
    const [errorPopup, setErrorPopup] = useState(false);
    // Variable to personalize the popup modal
    const [title, setTitle] = useState("Titolo del popup");
    const [body, setBody] = useState("Corpo del popup");

    async function login() {
        if (status === "unavailable") {
            setTitle("MetaMask non installato");
            setBody("Per un corretto funzionamento del sito è necessario installare MetaMask.");
            setErrorPopup(true);
            return;
        }
        if (status === "notConnected") {
            setTitle("Accesso negato");
            setBody("Per un corretto funzionamento del sito è necessario accedere al proprio account.");
            setErrorPopup(true);
            return;
        }
        await connect();
        navigator("/Homepage")
    }

    const popupCloseHandler = (e) => {
        setErrorPopup(e);
    };

    return (
        <div className="w-fit h-fit flex rounded bg-white bg-opacity-50">
            <Modal
                onClose={popupCloseHandler}
                errorPopup={errorPopup}
                title={title}
                body={body}
            />
            <div name="leftSideLoginForm" className="w-1/2 h-full flex p-4 rounded-l bg-white">
                <img src={require("../../Asset/Images/blueWoodchuckLogo.jpg")} alt="blueWoodchuckLogo" />
            </div>
            <div name="rightSideLoginForm" className="w-1/2 h-full flex flex-col p-4 text-center self-center rounded-r">
                <p className="pb-12 text-3xl">
                    <span className="font-bold text-blue-600">Blue</span>
                    <span className="font-semibold text-amber-600">Woodchuck</span>
                </p>
                <button className="w-1/2 h-12 self-center font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-800"
                    onClick={login}> Login with Metamask</button>
            </div>
        </div>
    );
}

export default LoginForm;