function ContractEntry(props) {


    return (
        <li>
            <article>
                <a rel="noopener noreferrer" href="#" className="grid p-4 overflow-hidden md:grid-cols-5 rounded-xl lg:p-6 xl:grid-cols-12 hover:dark:bg-gray-900">
                    <h3 className="mb-1 ml-8 font-semibold md:col-start-2 md:col-span-4 md:ml-0 xl:col-start-3 xl:col-span-9">Earum at ipsa aliquid quis, exercitationem est. {props.id}</h3>
                    <time className="row-start-1 mb-1 md:col-start-1 xl:col-span-2 dark:text-gray-400">Oct 13, 2020</time>
                    <p className="ml-8 md:col-start-2 md:col-span-4 xl:col-start-3 xl:col-span-9 md:ml-0 dark:text-gray-300">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique saepe exercitationem numquam, labore necessitatibus deleniti quasi. Illo porro nihil necessitatibus debitis delectus aperiam, fuga impedit assumenda odit, velit eveniet est.</p>
                </a>
            </article>
        </li>
    )
}

export default ContractEntry;
