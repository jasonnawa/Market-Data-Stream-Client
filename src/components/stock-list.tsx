'use client';

import { StockPercentageDto } from "@/hooks/use-socket";
import News from "./news";

const stocks = [
  { symbol: 'AAPL', price: 188.12 },
  { symbol: 'TSLA', price: 276.55 },
  { symbol: 'MSFT', price: 412.3 },
  { symbol: 'GOOGL', price: 134.67 },
  { symbol: 'AMZN', price: 130.12 },
];

interface Props {
  setSymbol: (symbol: string) => void;
  symbol: string;
  stockListData: Map<string, StockPercentageDto>; // added prop
}

export default function StockList({ setSymbol, symbol, stockListData }: Props) {
  return (
    <div className="flex flex-col h-[600px] w-full bg-white rounded-lg shadow overflow-hidden">
      {/* Table section – 60% of height */}
      <div className="h-[60%] overflow-hidden flex flex-col">
        <div className="overflow-y-auto flex-1">
          <table className="min-w-full text-sm text-left">
            <thead className="sticky top-0 bg-gray-100 z-10">
              <tr className="text-xs text-gray-500 uppercase tracking-wider">
                <th className="px-4 py-2">Symbol</th>
                <th className="px-4 py-2 text-right">Last</th>
                <th className="px-4 py-2 text-right">Change/10min</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock) => {
                const isActive = stock.symbol === symbol;
                const stockData = stockListData.get(stock.symbol);
                const price = stockData?.price ?? 0;
                const percentChange = stockData?.percentageChange ?? 0;

                const percentColor =
                  percentChange > 0
                    ? "text-green-600"
                    : percentChange < 0
                    ? "text-red-600"
                    : "text-gray-500";

                return (
                  <tr
                    key={stock.symbol}
                    onClick={() => setSymbol(stock.symbol)}
                    className={`cursor-pointer hover:bg-gray-50 ${
                      isActive ? "bg-indigo-100 border-l-4 border-indigo-400" : ""
                    }`}
                  >
                    <td className="px-4 py-2 font-medium">{stock.symbol}</td>
                    <td className="px-4 py-2 text-right font-medium text-black">
                      ${price.toFixed(2)}
                    </td>
                    <td className={`px-4 py-2 text-right ${percentColor}`}>
                      {percentChange.toFixed(2)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* News section – 40% of height */}
      <div className="h-[40%] overflow-auto border-t p-4">
        <News />
      </div>
    </div>
  );
}