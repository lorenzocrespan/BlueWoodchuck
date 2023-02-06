function RecentActivity() {

    return (
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
    )
}

export default RecentActivity;