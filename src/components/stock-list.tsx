'use client';

import { StockPercentageDto } from "@/hooks/use-socket";
import News from "./news";

const stocks = [
 { symbol: 'AAPL', name: 'Apple Inc.', currentPrice: 190.00 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', currentPrice: 179.55 },
  { symbol: 'MSFT', name: 'Microsoft Corporation', currentPrice: 438.45 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', currentPrice: 201.34 },
  { symbol: 'TSLA', name: 'Tesla Inc.', currentPrice: 246.19 },
  { symbol: 'META', name: 'Meta Platforms Inc.', currentPrice: 467.21 },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', currentPrice: 129.38 },
  { symbol: 'NFLX', name: 'Netflix Inc.', currentPrice: 668.74 },
  { symbol: 'BRK.B', name: 'Berkshire Hathaway Inc.', currentPrice: 420.11 },
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.', currentPrice: 207.88 },
  { symbol: 'V', name: 'Visa Inc.', currentPrice: 278.92 },
  { symbol: 'JNJ', name: 'Johnson & Johnson', currentPrice: 162.30 },
  { symbol: 'PG', name: 'Procter & Gamble Co.', currentPrice: 166.45 },
  { symbol: 'DIS', name: 'The Walt Disney Company', currentPrice: 92.50 },
  { symbol: 'INTC', name: 'Intel Corporation', currentPrice: 34.67 },
  { symbol: 'KO', name: 'The Coca-Cola Company', currentPrice: 62.84 },
  { symbol: 'PEP', name: 'PepsiCo Inc.', currentPrice: 169.33 },
  { symbol: 'CSCO', name: 'Cisco Systems Inc.', currentPrice: 48.29 },
  { symbol: 'XOM', name: 'Exxon Mobil Corporation', currentPrice: 112.09 },
  { symbol: 'BAC', name: 'Bank of America Corporation', currentPrice: 38.40 }
];

interface Props {
  setSymbol: (symbol: string) => void;
  symbol: string;
  stockListData: Map<string, StockPercentageDto>; 
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

    const isMarketClosed = !stockData;
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
        onClick={() => {
          if (!isMarketClosed) setSymbol(stock.symbol);
        }}
        className={`
          ${isMarketClosed ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "cursor-pointer hover:bg-gray-50"}
          ${isActive && !isMarketClosed ? "bg-indigo-100 border-l-4 border-indigo-400" : ""}
        `}
      >
        <td className="px-4 py-2 font-medium flex items-center gap-2">
          {stock.symbol}
                    {isMarketClosed && (
            <span className="inline-block w-1 h-1 rounded-full bg-red-600" title="Market Closed" />
          )}
        </td>

        <td className="px-4 py-2 text-right font-medium">
          {isMarketClosed ? "Market Closed" : `$${price.toFixed(2)}`}
        </td>

        <td className={`px-4 py-2 text-right ${percentColor}`}>
          {isMarketClosed ? "--" : `${percentChange.toFixed(2)}%`}
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