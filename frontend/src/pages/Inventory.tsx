import DashboardLayout from "../components/layout/DashboardLayout";

export default function Inventory() {
  const inventory = [
    {
      id: 1,
      product: "Laptop",
      stock: 15,
      status: "In Stock",
    },
    {
      id: 2,
      product: "Keyboard",
      stock: 8,
      status: "Low Stock",
    },
    {
      id: 3,
      product: "Mouse",
      stock: 25,
      status: "In Stock",
    },
    {
      id: 4,
      product: "Monitor",
      stock: 3,
      status: "Low Stock",
    },
  ];

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-5xl font-bold text-white">
          Inventory
        </h1>

        <p className="text-slate-400 mt-2">
          Monitor stock availability
        </p>

        <div className="mt-8 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Product</th>
                <th className="p-4 text-left">Stock</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {inventory.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-slate-800"
                >
                  <td className="p-4">{item.id}</td>
                  <td className="p-4">{item.product}</td>
                  <td className="p-4">{item.stock}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        item.status === "In Stock"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}