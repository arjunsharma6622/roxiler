import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axiosInstance from "../utils/axiosInstance";
import SelectMonth from "./SelectMonth";

const PieChart = () => {
    const [selectedMonth, setSelectedMonth] = useState<number>(3);
    const [labels, setLabels] = useState<string[]>([]);
    const [counts, setCounts] = useState<string[]>([]);

    const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF", "#FFD700",
    "#FF8C00", "#8B0000", "#008080", "#800080", "#00CED1", "#2E8B57"]

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axiosInstance.get(`transaction/piechart?month=${selectedMonth}`);

                const newLabels = data.data.uniqueCategories.map((i : [string, number]) => i[0]);
                const newCount = data.data.uniqueCategories.map((i : [string, number]) => i[1]);

                setLabels(newLabels)
                setCounts(newCount)
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
                <h1 className='text-2xl font-semibold'>Unique Categories</h1>
                <SelectMonth
                    selectedMonth={selectedMonth}
                    setSelectedMonth={setSelectedMonth}
                />
            </div>

            <div className="w-[400px] h-[400px]">
                <Pie
                    className=""
                    data={{
                        labels: labels,
                        datasets: [
                            {
                                label: "category",
                                data: counts,
                                backgroundColor: colors,
                            }
                        ]
                    }}
                />
            </div>
        </div>
    )
}

export default PieChart