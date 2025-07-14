'use client'
import StockLineChart from "@/components/charts/stock-line-chart";
import { SiteHeader } from "@/components/site-header";
import StockList from "@/components/stock-list";
import { StockTickDto, useStockStream } from "@/hooks/use-socket";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const {tick, stockListData} = useStockStream();
  const dataRef = useRef<Map<string, StockTickDto[]>>(new Map());
  const [symbol, setSymbol] = useState('AAPL');
  const [, forceRerender] = useState(0);

  // Incrementally add tick data and cap it at 100 entries
useEffect(() => {
  if (!tick) return;

  const existing = dataRef.current.get(tick.symbol) || [];
  const updated = [...existing, tick];
  const trimmed = updated.slice(-100); // keep only last 100
  dataRef.current.set(tick.symbol, trimmed);

  if (tick.symbol === symbol) {
    forceRerender((c) => c + 1);
  }
}, [tick, symbol]);


  return (
    <div className="p-6 space-y-6">
      <SiteHeader title="Live Stocks Chart" />

      <div className="flex flex-col md:flex-row gap-6">
        {/* Chart - 60% width */}
        <div className="w-full md:w-[60%] bg-white p-4 rounded-lg shadow">
          <StockLineChart symbol={symbol} data={dataRef.current.get(symbol) || []} />
        </div>

        {/* Stock List - 40% width */}
        <div className="w-full md:w-[40%] bg-white p-4 rounded-lg shadow">
          <StockList
           symbol={symbol}
           setSymbol={setSymbol}
           stockListData={stockListData}/>
        </div>
      </div>
    </div>
  );
}
