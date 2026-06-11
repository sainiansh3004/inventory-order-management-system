import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", orders: 12 },
  { month: "Feb", orders: 18 },
  { month: "Mar", orders: 14 },
  { month: "Apr", orders: 22 },
  { month: "May", orders: 19 },
  { month: "Jun", orders: 28 },
];

export default function OrdersTrendChart() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">
          Orders Trend
        </h2>

        <span className="text-green-400 text-sm font-medium">
          +18.2%
        </span>
      </div>

      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>

            <CartesianGrid
              stroke="#1e293b"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="month"
              stroke="#94a3b8"
            />

            <YAxis
              stroke="#94a3b8"
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Line
              type="monotone"
              dataKey="orders"
              stroke="#22c55e"
              strokeWidth={4}
              dot={{
                fill: "#22c55e",
                r: 5,
              }}
              activeDot={{
                r: 8,
              }}
            />

          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}