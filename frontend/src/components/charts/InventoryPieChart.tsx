import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function InventoryPieChart() {
  const data = [
    {
      name: "Healthy Stock",
      value: 8,
    },
    {
      name: "Low Stock",
      value: 2,
    },
  ];

  const COLORS = [
    "#22c55e",
    "#ef4444",
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg min-w-0">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">
          Inventory Status
        </h2>

        <span className="text-blue-400 text-sm">
          Live Tracking
        </span>
      </div>

      <div style={{ width: "100%", height: 300 }}>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>
        </ResponsiveContainer>

      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">

        <div className="bg-slate-800 rounded-xl p-4">
          <p className="text-slate-400 text-sm">
            Healthy Stock
          </p>

          <p className="text-green-400 text-2xl font-bold">
            8
          </p>
        </div>

        <div className="bg-slate-800 rounded-xl p-4">
          <p className="text-slate-400 text-sm">
            Low Stock
          </p>

          <p className="text-red-400 text-2xl font-bold">
            2
          </p>
        </div>

      </div>

    </div>
  );
}