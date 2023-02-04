import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';                // React hooks.

function Header() {

    useEffect(() => {
        console.log("Header mounted");
    }, []);

    const navigator = useNavigate()

    async function login() {
        navigator("/")
    }

    async function navigateNewForm() {
        // Modify style of the button

        navigator("/NewForm")
    }

    return (
        <header className="p-4 bg-blue-600 text-gray-100">
            <div className="container flex justify-between h-16 mx-auto">
                <div className="flex">
                    <ul className="items-stretch hidden space-x-4 lg:flex">
                        <li className="flex">
                            <button className="flex items-center px-4 border-b-[1px] border-hidden" onClick={navigateNewForm}>Nuovo Form</button>
                        </li>
                        <li className="flex">
                            <button className="flex items-center px-4 border-b-[1px] border-hidden">Link 2</button>
                        </li>
                        <li className="flex">
                            <button className="flex items-center px-4 border-b-[1px] border-hidden">Link 3</button>
                        </li>
                        <li className="flex">
                            <button className="flex items-center px-4 border-b-[1px] border-hidden">Link 4</button>
                        </li>
                    </ul>
                </div>
                <div className="items-center flex-shrink-0 hidden lg:flex">
                    <button className="px-8 py-3 font-semibold rounded-md bg-amber-600 hover:bg-blue-800" onClick={login}>Disconetti</button>
                </div>
            </div>
        </header>
    );
}

export default Header;