import { useEffect, useState } from 'react';                // React hooks.
import Web3 from 'web3';                                    // Web3 library.
import { getFormAddress, getFormABI } from '../../abi/abi';    // Smart contract ABI.

function HomepageView() {

    const isConsoleActive = true;                                               // Enable/Disable console debug.
    // NOTE:    The double print of log is due to "React.StrictMode" in index.js.
    //          It is used to check the entire application for potential problems.

    const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:7575');       // Connect to blockchain.
    const FormContract = new web3.eth.Contract(getFormABI(), getFormAddress()); // Connect to smart contract.
    const [account, setAccount] = useState();                                   // Account address.
    const [contract, setContract] = useState();                                 // Contract data.

    // useEffect hook to load the account address.
    // It is called only once when the component is mounted.
    useEffect(() => {
        const loadAccountAddress = async () => {
            // Request and set account access if needed.
            const accounts = await web3.eth.requestAccounts();
            setAccount(accounts[0]);
            if (isConsoleActive) console.debug("account", accounts[0]);
            // Get contract address.
            const contractAddress = await FormContract.options.address;
            setContract(contractAddress);
        }
        loadAccountAddress();
    }, []);

    // Listen metamask account change.
    window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0]);
        if (isConsoleActive) console.debug("account", accounts[0]);
    });

    let addressForm;

    // Button to add a new form to the blockchain.
    const addForm = async () => {
        // Add form to blockchain.
        if (isConsoleActive) console.debug("Add new form request from account: ", account);
        // call(), send() and estimateGas() are the three methods to interact with the blockchain.
        // call() is used to read data from the blockchain.
        // send() is used to write data to the blockchain.
        // estimateGas() is used to estimate the gas needed to write data to the blockchain.
        const result = await FormContract.methods.createForm(
            Array.from([10, 2, 3388796778, 1675156832, 3244098990]),
            Array.from(["Spam delivery", "Found in office", "HDD", "John Evil Smith",
                "The HDD contains a database of email addresses and a message from a Nigerian prince",
                "Matilde Savior Jackson", "Cloning"]),
            web3.utils.asciiToHex("idk")
        ).send({ from: account });
        if (isConsoleActive) console.debug("Result of createForm: ", result);
    }


    // Button to read a form from the blockchain.
    const readForm = async () => {
        // Read form from blockchain.
        console.debug("readForm");
        const accounts = await web3.eth.requestAccounts();
        const account = accounts[0];
        console.debug("account", account);
        const result = await FormContract.methods.readFormAddress(addressForm).call({ from: account });
        console.debug("result", result);
    }

    // Subscribe to events.
    FormContract.events.newForm()
        .on("connected", (subscriptionId) => {
            // https://web3js.readthedocs.io/en/v1.2.11/web3-eth-subscribe.html#
            // console.log(subscriptionId);
        })
        .on('data', (event) => {
            console.debug("FormCreated", event.returnValues);
            addressForm = event.returnValues[1];
        })
        .on('changed', (event) => {
            // remove event from local database
        })
        .on('error', console.error);

    return (
        <div className="min-h-screen flex flex-col gap-10 p-4 sm:p-12 dark:bg-gray-900 dark:text-gray-100 ">
            <div className="container flex justify-between h-16 mx-auto bg-red-500">
                <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
                    <img src={require("../../Asset/Images/blueWoodchuckLogo.jpg")} alt="" className="self-center flex-shrink-0 w-24 h-24 border rounded-full md:justify-self-start dark:bg-gray-500 dark:border-gray-700" />
                    <div className="flex flex-col">
                        <h4 className="text-lg font-semibold text-center md:text-left">Utente: {account}</h4>
                        <h4 className="text-lg font-semibold text-center md:text-left">Contratto: {contract}</h4>
                    </div>
                </div>
            </div>


            <ul className="flex flex-col container justify-between mx-auto p-4 lg:p-8 dark:bg-gray-800 dark:text-gray-100">
                <h2 className="mb-4 text-2xl font-semibold">Lista contratti in carico</h2>
                <li>
                    <article>
                        <a rel="noopener noreferrer" href="#" className="grid p-4 overflow-hidden md:grid-cols-5 rounded-xl lg:p-6 xl:grid-cols-12 hover:dark:bg-gray-900">
                            <h3 className="mb-1 ml-8 font-semibold md:col-start-2 md:col-span-4 md:ml-0 xl:col-start-3 xl:col-span-9">Earum at ipsa aliquid quis, exercitationem est.</h3>
                            <time datetime="" className="row-start-1 mb-1 md:col-start-1 xl:col-span-2 dark:text-gray-400">Oct 13, 2020</time>
                            <p className="ml-8 md:col-start-2 md:col-span-4 xl:col-start-3 xl:col-span-9 md:ml-0 dark:text-gray-300">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique saepe exercitationem numquam, labore necessitatibus deleniti quasi. Illo porro nihil necessitatibus debitis delectus aperiam, fuga impedit assumenda odit, velit eveniet est.</p>
                        </a>
                    </article>
                </li>
                <li>
                    <article>
                        <a rel="noopener noreferrer" href="#" className="grid p-4 overflow-hidden md:grid-cols-5 rounded-xl lg:p-6 xl:grid-cols-12 hover:dark:bg-gray-900">
                            <h3 className="mb-1 ml-8 font-semibold md:col-start-2 md:col-span-4 md:ml-0 xl:col-start-3 xl:col-span-9">Earum at ipsa aliquid quis, exercitationem est.</h3>
                            <time datetime="" className="row-start-1 mb-1 md:col-start-1 xl:col-span-2 dark:text-gray-400">Oct 13, 2020</time>
                            <p className="ml-8 md:col-start-2 md:col-span-4 xl:col-start-3 xl:col-span-9 md:ml-0 dark:text-gray-300">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique saepe exercitationem numquam, labore necessitatibus deleniti quasi. Illo porro nihil necessitatibus debitis delectus aperiam, fuga impedit assumenda odit, velit eveniet est.</p>
                        </a>
                    </article>
                </li>
                <li>
                    <article>
                        <a rel="noopener noreferrer" href="#" className="grid p-4 overflow-hidden md:grid-cols-5 rounded-xl lg:p-6 xl:grid-cols-12 hover:dark:bg-gray-900">
                            <h3 className="mb-1 ml-8 font-semibold md:col-start-2 md:col-span-4 md:ml-0 xl:col-start-3 xl:col-span-9">Earum at ipsa aliquid quis, exercitationem est.</h3>
                            <time datetime="" className="row-start-1 mb-1 md:col-start-1 xl:col-span-2 dark:text-gray-400">Oct 13, 2020</time>
                            <p className="ml-8 md:col-start-2 md:col-span-4 xl:col-start-3 xl:col-span-9 md:ml-0 dark:text-gray-300">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique saepe exercitationem numquam, labore necessitatibus deleniti quasi. Illo porro nihil necessitatibus debitis delectus aperiam, fuga impedit assumenda odit, velit eveniet est.</p>
                        </a>
                    </article>
                </li>
                <li>
                    <article>
                        <a rel="noopener noreferrer" href="#" className="grid p-4 overflow-hidden md:grid-cols-5 rounded-xl lg:p-6 xl:grid-cols-12 hover:dark:bg-gray-900">
                            <h3 className="mb-1 ml-8 font-semibold md:col-start-2 md:col-span-4 md:ml-0 xl:col-start-3 xl:col-span-9">Earum at ipsa aliquid quis, exercitationem est.</h3>
                            <time datetime="" className="row-start-1 mb-1 md:col-start-1 xl:col-span-2 dark:text-gray-400">Oct 13, 2020</time>
                            <p className="ml-8 md:col-start-2 md:col-span-4 xl:col-start-3 xl:col-span-9 md:ml-0 dark:text-gray-300">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique saepe exercitationem numquam, labore necessitatibus deleniti quasi. Illo porro nihil necessitatibus debitis delectus aperiam, fuga impedit assumenda odit, velit eveniet est.</p>
                        </a>
                    </article>
                </li>
            </ul>

            {/* <section className="flex flex-col container justify-between mx-auto dark:bg-gray-800 dark:text-gray-100">
                <div className="container max-w-5xl px-4 py-12 mx-auto">
                    <div className="grid gap-4 mx-4 sm:grid-cols-12">
                        <div className="col-span-12 sm:col-span-3">
                            <div className="sm:text-left mb-14 before:block before:w-24 before:h-3 before:mb-5 before:rounded-md before:mx-auto sm:before:mx-0 ">
                                <h3 className="text-3xl font-semibold">Morbi tempor</h3>
                                <span className="text-sm font-bold tracking-wider uppercase dark:text-gray-400">Vestibulum diam nunc</span>
                            </div>
                        </div>
                        <div className="relative col-span-12 px-4 space-y-6 sm:col-span-9">
                            <div className="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:dark:bg-gray-700">
                                <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:dark:bg-violet-400">
                                    <h3 className="text-xl font-semibold tracking-wide">Donec porta enim vel </h3>
                                    <time className="text-xs tracking-wide uppercase dark:text-gray-400">Dec 2020</time>
                                    <p className="mt-3">Pellentesque feugiat ante at nisl efficitur, in mollis orci scelerisque. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
                                </div>
                                <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:dark:bg-violet-400">
                                    <h3 className="text-xl font-semibold tracking-wide">Aliquam sit amet nunc ut</h3>
                                    <time className="text-xs tracking-wide uppercase dark:text-gray-400">Jul 2019</time>
                                    <p className="mt-3">Morbi vulputate aliquam libero non dictum. Aliquam sit amet nunc ut diam aliquet tincidunt nec nec dui. Donec mollis turpis eget egestas sodales.</p>
                                </div>
                                <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:dark:bg-violet-400">
                                    <h3 className="text-xl font-semibold tracking-wide">Pellentesque habitant morbi</h3>
                                    <time className="text-xs tracking-wide uppercase dark:text-gray-400">Jan 2016</time>
                                    <p className="mt-3">Suspendisse tincidunt, arcu nec faucibus efficitur, justo velit consectetur nisl, sit amet condimentum lacus orci nec purus. Mauris quis quam suscipit, vehicula felis id, vehicula enim.</p>
                                </div>
                                <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:dark:bg-violet-400">
                                    <h3 className="text-xl font-semibold tracking-wide">Pellentesque habitant morbi</h3>
                                    <time className="text-xs tracking-wide uppercase dark:text-gray-400">Jan 2016</time>
                                    <p className="mt-3">Suspendisse tincidunt, arcu nec faucibus efficitur, justo velit consectetur nisl, sit amet condimentum lacus orci nec purus. Mauris quis quam suscipit, vehicula felis id, vehicula enim.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

            <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
                <h2 className="mb-4 text-2xl font-semibold leading-tight">Attività recenti</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-xs">
                        <thead className='dark:bg-gray-700'>
                            <tr className="text-left">
                                <th className="p-3">Invoice</th>
                                <th className="p-3">Client</th>
                                <th className="p-3">Date</th>
                                <th className="p-3 text-right">Amount</th>
                                <th className="p-3 w-24">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900">
                                <td className="p-3">INV-0001</td>
                                <td className="p-3">John Doe</td>
                                <td className="p-3">2020-01-01</td>
                                <td className="p-3 text-right">$ 1,000.00</td>
                                <td className="p-3 text-right">
                                    <span className="px-3 py-1 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900">
                                        <span>Pending</span>
                                    </span>
                                </td>
                            </tr>
                        </tbody>


                    </table>
                </div>
            </div>

        </div>

    );


}
export default HomepageView;