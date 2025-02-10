import months from '../utils/months';

interface selectMonthProps{
    selectedMonth : number;
    setSelectedMonth : (month : number) => void;
}

const SelectMonth = ({selectedMonth, setSelectedMonth} : selectMonthProps) => {
    return (
        <div className='flex flex-col gap-1 w-fit'>
            <select
                name=""
                defaultValue={selectedMonth}
                className='border p-2 py-1 rounded-[5px] w-full focus:outline-none'
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            >
                {months.map((m, index) => (
                    <option key={index} value={m.value}>{m.name}</option>
                ))}
            </select>
        </div>
    )
}

export default SelectMonth