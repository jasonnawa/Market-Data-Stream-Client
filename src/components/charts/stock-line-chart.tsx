'use client'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface StockPoint {
  timestamp: string;
  price: number;
}

export default function StockLineChart({ data }: { data: StockPoint[] }) {
  return (
    <>
    <h2 className="text-xl font-bold mb-4">AAPL</h2>
    <LineChart width={800} height={400} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="timestamp" />
      <YAxis domain={['auto', 'auto']} />
      <Tooltip />
      <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
    </LineChart>
    </>
  );
}
