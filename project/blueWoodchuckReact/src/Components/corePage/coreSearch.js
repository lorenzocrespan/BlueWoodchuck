import ListContract from './commonComponent/formListSection';

function CoreSearch() {

    return (
        <div className="min-h-screen flex flex-col gap-10 p-4 sm:p-12 dark:bg-gray-100 dark:text-gray-100 ">
            <div className="container flex flex-col justify-between h-auto mx-auto bg-blue-900 p-10 rounded-md">

                <form class="flex items-center p-4">
                    <label for="simple-search" class="sr-only">Search</label>
                    <div class="relative w-full">                        
                        <input type="text" name="Search" id="Search" placeholder="Ricerca..." className="w-full text-sm rounded-md border-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500 text-blue-900 placeholder:border-gray-700 placeholder:focus:text-amber-500 ease-out duration-500" />
                    </div>
                </form>


                <ListContract />

            </div>
        </div>

    );
}

export default CoreSearch;