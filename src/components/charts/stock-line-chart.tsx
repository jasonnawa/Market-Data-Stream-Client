'use client';
import { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { StockTickDto } from '@/hooks/use-socket';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { toast } from "sonner";
import StockSubscription from '../stock-subscribtion-modal';

interface Props {
  data: StockTickDto[];
  symbol: string;
}

export default function StockLineChart({ data, symbol }: Props) {
  const [open, setOpen] = useState(false);
  const latest = data[data.length - 1];


  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{symbol}</h2>

        {/* Subscribe Modal Trigger */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">
              Toggle Subscription
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Toggle subscription to {symbol}</DialogTitle>
            </DialogHeader>
            <StockSubscription
              symbol={symbol}
              onSuccess={(message) => {
                toast.success(message);
                setOpen(false);
              }}
              onError={(message) => {
                toast.error(message);
                setOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data}>
          <CartesianGrid horizontal={true} vertical={false} />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(ts) => new Date(ts).toLocaleTimeString()}
          />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip
            labelFormatter={(ts) => `Time: ${new Date(ts).toLocaleTimeString()}`}
            formatter={(value) => [`$${value}`, "Price"]}
            contentStyle={{ backgroundColor: "#4f46e5", color: "#fff" }}
            itemStyle={{ color: "#fff" }}
            cursor={false}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#4f46e5"
            fill="url(#gradient)"
            dot={false}
            activeDot={{ fill: "#2e4355", stroke: "#8884d8", strokeWidth: 2, r: 5 }}
          />
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.1} />
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>

      {latest ? (
        <div className="mt-4 text-sm text-gray-700 space-y-1">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </span>
            <p className="font-semibold text-red-600">Live</p>
          </div>
          <p>
            <span className="font-medium text-gray-500">Symbol:</span> {latest.symbol}
          </p>
          <p>
            <span className="font-medium text-gray-500">Time:</span>{" "}
            {new Date(latest.timestamp).toLocaleTimeString()}
          </p>
        </div>
      ) : (
        <div className="mt-4 text-sm text-gray-500 italic flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-500"></span>
          </span>
          <span>Waiting for live data...</span>
        </div>
      )
      }

    </div>
  );
}
