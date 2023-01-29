import {useNavigate} from "react-router-dom";

function LoginForm() {

    const navigator = useNavigate()

    async function login() {
        navigator("/Homepage")
    }

    return (
        <div className="w-fit h-fit flex rounded bg-white bg-opacity-50">
            <div name="leftSideLoginForm" className="w-1/2 h-full flex p-4 rounded-l bg-white">
                <img src={require("../../Asset/Images/blueWoodchuckLogo.jpg")} alt="blueWoodchuckLogo" />
            </div>
            <div name="rightSideLoginForm" className="w-1/2 h-full flex flex-col p-4 text-center self-center rounded-r">
                <p className="pb-12 text-3xl">
                    <span className="font-bold text-blue-600">Blue</span>
                    <span className="font-semibold text-amber-600">Woodchuck</span>
                </p>
                <button className="w-1/2 h-12 self-center font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    onClick={login}> Login with Metamask</button>
            </div>

        </div>
    );
}

export default LoginForm;