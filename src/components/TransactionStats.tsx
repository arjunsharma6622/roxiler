import { useEffect, useState } from 'react';
import SelectMonth from './SelectMonth';
import axiosInstance from '../utils/axiosInstance';

const TransactionStats = () => {
    const [selectedMonth, setSelectedMonth] = useState<number>(3);

    const [totalSale, setTotalSale] = useState<number>(0);
    const [totalSoldItem, setTotalSoldItem] = useState<number>(0);
    const [totalUnsoldItem, setTotalUnsoldItem] = useState<number>(0);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const { data } = await axiosInstance.get(`transaction/stats?month=${selectedMonth}`);

                setTotalSale(data.data.totalSaleAmount)
                setTotalSoldItem(data.data.totalSoldItems)
                setTotalUnsoldItem(data.data.totalUnsoldItems)
            }
            catch (error) {
                console.log(error)
            }
        }

        fetchData()

    }, [selectedMonth])

    return (
        <div className='flex flex-col gap-6'>
            <div className='flex items-center gap-4'>
                <h1 className='text-2xl font-semibold'>Statistics</h1>
                <SelectMonth
                    selectedMonth={selectedMonth}
                    setSelectedMonth={setSelectedMonth}
                />
            </div>

            <div className='p-4 rounded-2xl flex flex-col gap-4 max-w-[300px] w-full bg-[#F7DE8B]'>
                <div className='flex items-center justify-between'>
                    <span>Total Sale</span>
                    <span>${totalSale.toFixed(2)}</span>
                </div>
                <div className='flex items-center justify-between'>
                    <span>Total Sold Items</span>
                    <span>{totalSoldItem}</span>
                </div>
                <div className='flex items-center justify-between'>
                    <span>Total Unsold Items</span>
                    <span>{totalUnsoldItem}</span>
                </div>
            </div>
        </div>
    )
}

export default TransactionStats