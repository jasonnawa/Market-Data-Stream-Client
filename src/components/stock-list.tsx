const stocks = [
  { symbol: "AAPL", price: 188.12 },
  { symbol: "TSLA", price: 276.55 },
  { symbol: "MSFT", price: 412.30 },
  { symbol: "GOOGL", price: 134.67 },
  { symbol: "AMZN", price: 130.12 },
];

export default function StockList() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">📋 Stock List</h2>
      <ul className="space-y-2">
        {stocks.map((stock) => (
          <li
            key={stock.symbol}
            className="flex justify-between items-center px-4 py-2 border rounded hover:bg-gray-50"
          >
            <span className="font-medium">{stock.symbol}</span>
            <span className="text-green-600 font-semibold">${stock.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
