import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axiosInstance from "../utils/axiosInstance";
import SelectMonth from "./SelectMonth";

const BarChart = () => {
    const [selectedMonth, setSelectedMonth] = useState<number>(3);
    const [counts, setCounts] = useState<string[]>([]);

    const labels = [
        "0-100", "101-200", "201-300", "301-400", "401-500", "501-600", "601-700", "701-800", "801-900", "901-above"
    ]

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axiosInstance.get(`/transaction/barchart?month=${selectedMonth}`);

                console.log(data.data)

                setCounts(data.data)
            }
            catch (error) {
                console.log(error)
            }
        }

        fetchData();
    }, [selectedMonth])

    return (
        <div>
            <div className='flex items-center gap-4'>
                <h1 className='text-2xl font-semibold'>Transactions Bar Chart</h1>
                <SelectMonth
                    selectedMonth={selectedMonth}
                    setSelectedMonth={setSelectedMonth}
                />
            </div>

            <div className="w-[800px] h-auto">
                <Bar
                    className=""
                    data={{
                        labels: labels,
                        datasets: [
                            {
                                label: "Items",
                                data: counts,
                                backgroundColor: "#6CE5E9",
                            }
                        ]
                    }}
                />
            </div>
        </div>
    )
}

export default BarChart