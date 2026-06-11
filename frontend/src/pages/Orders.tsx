import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { getOrders } from "../services/orderService";

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await getOrders();

      console.log("Orders API:", data);

      setOrders(data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <DashboardLayout title="Orders">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-xl text-white font-semibold mb-6">
          Orders List
        </h2>

        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="text-left py-3 text-slate-400">
                Customer
              </th>

              <th className="text-left py-3 text-slate-400">
                Amount
              </th>

              <th className="text-left py-3 text-slate-400">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map((order: any) => (
                <tr
                  key={order._id}
                  className="border-b border-slate-800"
                >
                  <td className="py-4 text-white">
                    {order.customer?.name || "N/A"}
                  </td>

                  <td className="py-4 text-green-400">
                    ₹{order.totalAmount}
                  </td>

                  <td className="py-4">
                    <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full">
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="py-6 text-center text-slate-400"
                >
                  No Orders Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}