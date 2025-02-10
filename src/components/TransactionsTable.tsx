import { TransactionType } from '../types/Transaction'

const TransactionsTable = ({ transactions }: { transactions: TransactionType[] }) => {
    return (
        <table >
            <thead className="bg-gray-200 text-gray-700">
                <tr>
                    <th className="p-3 border">ID</th>
                    <th className="p-3 border">Title</th>
                    <th className="p-3 border">Description</th>
                    <th className="p-3 border">Price</th>
                    <th className="p-3 border">Category</th>
                    <th className="p-3 border">Sold</th>
                    <th className="p-3 border">Month</th>
                    <th className="p-3 border">Image</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((t, index) => {

                    const dateOfSale = new Date(t.dateOfSale)

                    const month = dateOfSale.toLocaleString("en-US", { month: "short" })

                    return (
                        <tr
                            key={index}
                            className="text-center border-b hover:bg-gray-100 transition text-xs"
                        >
                            <td className="p-3 border">{t.id}</td>
                            <td className="p-3 border font-medium text-gray-800 text-start">{t.title}</td>
                            <td className="p-3 border text-sm text-gray-600 max-w-[20rem] truncate">{t.description}</td>
                            <td className="p-3 border font-semibold text-gray-900">${t.price.toFixed(2)}</td>
                            <td className="p-3 border text-gray-700">{t.category}</td>
                            <td className="p-3 border">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${t.sold ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                                    {t.sold ? "YES" : "NO"}
                                </span>
                            </td>
                            <td className="p-3 border text-gray-700">{month}</td>
                            <td className="p-3 border">
                                <img src={t.image} alt={t.title} className="w-12 h-12 object-cover rounded-md border" />
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default TransactionsTable