import StockLineChart from "@/components/charts/stock-line-chart";
import { SiteHeader } from "@/components/site-header";
import StockList from "@/components/stock-list";
export default function Home() {

  const dummyStockData = [
    { timestamp: "17:00", price: 187.23 },
    { timestamp: "17:01", price: 187.31 },
    { timestamp: "17:02", price: 187.45 },
    { timestamp: "17:03", price: 187.22 },
    { timestamp: "17:04", price: 187.10 },
    { timestamp: "17:05", price: 187.42 },
    { timestamp: "17:06", price: 187.76 },
    { timestamp: "17:07", price: 187.91 },
    { timestamp: "17:08", price: 187.83 },
    { timestamp: "17:09", price: 188.01 },
  ];

  return (
    <>
      <div className="p-6 space-y-6">
        <SiteHeader title="Live Stocks Chart" />


        <div className="flex flex-col md:flex-row gap-6">
          {/* Chart - 60% width */}
          <div className="w-full md:w-[60%] bg-white p-4 rounded-lg shadow">
            <StockLineChart data={dummyStockData} />
          </div>

          {/* Stock List - 40% width */}
          <div className="w-full md:w-[40%] bg-white p-4 rounded-lg shadow">
            <StockList />
          </div>
        </div>
      </div>
    </>
  );
}
