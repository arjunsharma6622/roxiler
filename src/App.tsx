import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js/auto";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import Transactions from "./components/Transactions";
import TransactionStats from "./components/TransactionStats";

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  return (
    <div className="w-[80%] mx-auto flex flex-col gap-8 p-4">
      <h1 className="text-center text-3xl font-bold">Transaction Dashboard</h1>
      <Transactions />
      <TransactionStats />
      <BarChart />
      <PieChart />
    </div>
  )
}

export default App