import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export interface StockTickDto {
    symbol: string;
    name: string;
    price: number;
    timestamp: number;
}

export interface StockPercentageDto {
    symbol: string;
    price: number;
    percentageChange: number;
}

export function useStockStream() {
    const socketRef = useRef<Socket | null>(null);
    const [tick, setTick] = useState<StockTickDto | null>(null);
    const [stockListData, setStockListData] = useState<Map<string, StockPercentageDto>>(new Map());
    const API_URL = process.env.NEXT_PUBLIC_API_URL
    useEffect(() => {
        
        socketRef.current = io(API_URL);

        socketRef.current.on('connect', () => {
            console.log('Connected to stock stream');
        });

        socketRef.current.on('stock:tick', (data: StockTickDto) => {
            setTick(data);
        });

        socketRef.current.on('stock:percentage.change', (data:StockPercentageDto) => {
            setStockListData((prev) => {
                const updated = new Map(prev);
                updated.set(data.symbol, data);
                return new Map(updated);
            });
        });


        socketRef.current.on('disconnect', () => {
            console.log('Disconnected from stock stream');
        });

        return () => {
            socketRef.current?.disconnect();
        };
    }, []);

    return { tick, stockListData };
}

