'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { StockTickDto } from '@/hooks/use-socket';

interface Props {
  data: StockTickDto[];
  symbol: string;
}

export default function StockLineChart({ data, symbol }: Props) {
  const latest = data[data.length - 1];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{symbol}</h2>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(ts) => new Date(ts).toLocaleTimeString()}
          />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip
            labelFormatter={(ts) => `Time: ${new Date(+ts).toLocaleTimeString()}`}
            formatter={(value) => [`$${value}`, 'Price']}
          />
          <Line type="monotone" dataKey="price" stroke="#4f46e5" dot={false} />
        </LineChart>
      </ResponsiveContainer>

      {latest ? (
        <div className="mt-4 text-sm text-gray-600">
          <p><strong>Live:</strong> {latest.symbol}</p>
          <p><strong>Price:</strong> ${latest.price.toFixed(2)}</p>
          <p><strong>Time:</strong> {new Date(latest.timestamp).toLocaleTimeString()}</p>
        </div>
      ) : (
        <p className="text-sm text-gray-500">Waiting for data...</p>
      )}
    </div>
  );
}
