import { useNavigate } from "react-router-dom";

function Core404() {

    const navigator = useNavigate()

    async function redirectDefaultPage() {
        // TODO: Redirect to login page if user is not logged in else redirect to homepage
        navigator("/")
    }

    return (
        <section className="flex items-center h-screen p-16  bg-gray-200  text-blue-900">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div className="max-w-md text-center">
                    <h2 className="mb-8 font-extrabold text-9xl  text-gray-200">
                        <span className="text-amber-600">404</span>
                    </h2>
                    <p className="mb-8 text-2xl font-semibold md:text-3xl">Ci dispiace, ma la pagina che stai cercando non esiste.</p>
                    <button className="w-1/2 h-12 font-semibold rounded-md self-center text-white bg-blue-800 hover:bg-amber-600  ease-out duration-500" onClick={redirectDefaultPage}>Torna indietro</button>
                </div>
            </div>
        </section>
    );
}

export default Core404;