import { useEffect, useState } from 'react';
import { TransactionType } from '../types/Transaction';
import axiosInstance from '../utils/axiosInstance';
import PaginationBar from './PaginationBar';
import SelectMonth from './SelectMonth';
import TransactionsTable from './TransactionsTable';

const Transactions = () => {
    const [transactions, setTransactions] = useState<TransactionType[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(5);
    const [searchText, setSearchText] = useState<string>("");
    const [selectedMonth, setSelectedMonth] = useState<number>(3);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                let url;

                if (searchText) {
                    url = `/transaction/all?searchText=${searchText}&limit=${itemsPerPage}&month=${selectedMonth}`
                }
                else {
                    url = `/transaction/all?page=${currentPage}&limit=${itemsPerPage}&month=${selectedMonth}`
                }

                const { data } = await axiosInstance.get(url);

                console.log(data.data)

                setTransactions(data.data.transactions)
                setTotalPages(Math.ceil(data.data.total / itemsPerPage))
            }
            catch (error) {
                console.log(error)
            }
        }

        fetchTransactions();

    }, [currentPage, searchText, itemsPerPage, selectedMonth])

    return (
        <div className='flex flex-col justify-center gap-4'>

            <div className='flex items-center gap-4'>
                <h1 className='text-2xl font-semibold'>Transctions List</h1>
                <SelectMonth
                    selectedMonth={selectedMonth}
                    setSelectedMonth={setSelectedMonth}
                />
            </div>

            <div className='flex items-center gap-4 max-w-[30rem] w-full'>
                <input
                    type="text"
                    placeholder='Search Transaction'
                    className='border p-2 rounded-[5px] w-full focus:outline-none'
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <div className='flex flex-col gap-1 w-[12rem]'>
                    {!searchText &&
                        <select
                            name=""
                            defaultValue={itemsPerPage}
                            className='border p-2 py-1 rounded-[5px] w-full focus:outline-none'
                            onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                        >
                            {[5, 10, 15].map((limit, index) => (
                                <option key={index} value={limit}>{limit} per page</option>
                            ))}
                        </select>
                    }
                </div>
            </div>

            <TransactionsTable transactions={transactions} />

            {(transactions?.length > 0 && !searchText) &&
                <PaginationBar
                    totalPages={totalPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            }
        </div>
    )
}

export default Transactions