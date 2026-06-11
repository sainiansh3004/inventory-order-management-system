import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../components/layout/DashboardLayout";

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/orders"
      );

      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout title="Orders">
      <div>

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-5xl font-bold text-white">
              Orders
            </h1>

            <p className="text-slate-400 mt-2">
              Manage customer orders
            </p>
          </div>

          <div className="bg-green-600 text-white px-5 py-3 rounded-2xl font-semibold">
            {orders.length} Orders
          </div>
        </div>

        <div className="mt-8 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">

          <table className="w-full">

            <thead>
              <tr className="border-b border-slate-800">

                <th className="p-4 text-left text-slate-400">
                  Customer
                </th>

                <th className="p-4 text-left text-slate-400">
                  Product
                </th>

                <th className="p-4 text-left text-slate-400">
                  Quantity
                </th>

                <th className="p-4 text-left text-slate-400">
                  Amount
                </th>

                <th className="p-4 text-left text-slate-400">
                  Status
                </th>

              </tr>
            </thead>

            <tbody>

              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-slate-800 hover:bg-slate-800/40"
                >

                  <td className="p-4 text-white">
                    {order.customer?.name}
                  </td>

                  <td className="p-4 text-white">
                    {order.items?.[0]?.product?.name}
                  </td>

                  <td className="p-4 text-white">
                    {order.items?.[0]?.quantity}
                  </td>

                  <td className="p-4 text-green-400 font-semibold">
                    ₹{order.totalAmount}
                  </td>

                  <td className="p-4">

                    <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm">
                      {order.status}
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