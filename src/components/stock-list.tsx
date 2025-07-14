'use client';

import { StockPercentageDto } from "@/hooks/use-socket";

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
    <div>
      <h2 className="text-xl font-bold mb-4">📋 Stock List</h2>
      <ul className="space-y-2">
        {stocks.map((stock) => {
          const isActive = stock.symbol === symbol;
          const stockData = stockListData.get(stock.symbol)
          const percentChange = stockData?.percentageChange ?? 0;

          const percentColor =
            percentChange > 0
              ? 'text-green-600'
              : percentChange < 0
              ? 'text-red-600'
              : 'text-gray-500';

          return (
            <li
              key={stock.symbol}
              onClick={() => setSymbol(stock.symbol)}
              className={`flex justify-between items-center px-4 py-2 border rounded cursor-pointer hover:bg-gray-50 ${
                isActive ? 'bg-indigo-100 border-indigo-400' : ''
              }`}
            >
              <span className="font-medium">{stock.symbol}</span>
              <div className="flex flex-col items-end">
                <span className="text-green-700 font-semibold">
                  ${stockData?.price}
                </span>
                <span className={`text-xs ${percentColor}`}>
                  {percentChange.toFixed(2)}%
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
