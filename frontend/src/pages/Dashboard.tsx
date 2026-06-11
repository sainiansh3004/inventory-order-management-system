import { useEffect, useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";
import StatCard from "../components/dashboard/StatCard";

import RevenueChart from "../components/charts/RevenueChart";
import OrdersTrendChart from "../components/charts/OrdersTrendChart";
import InventoryPieChart from "../components/charts/InventoryPieChart";

import { getDashboardStats } from "../services/dashboardService";

import {
  Package,
  Users,
  ShoppingCart,
  IndianRupee,
} from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    customers: 0,
    orders: 0,
    revenue: 0,
    lowStockProducts: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getDashboardStats();

      setStats({
        products: data.products || 0,
        customers: data.customers || 0,
        orders: data.orders || 0,
        revenue: data.revenue || 0,
        lowStockProducts: data.lowStockProducts || 0,
      });
    } catch (error) {
      console.error("Dashboard Error:", error);
    }
  };

  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-8">

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 shadow-lg">
          <h1 className="text-4xl font-bold text-white">
            Welcome Back 👋
          </h1>

          <p className="text-blue-100 mt-3">
            Monitor products, customers, orders and revenue in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">

          <StatCard
            title="Products"
            value={String(stats.products)}
            icon={Package}
          />

          <StatCard
            title="Customers"
            value={String(stats.customers)}
            icon={Users}
          />

          <StatCard
            title="Orders"
            value={String(stats.orders)}
            icon={ShoppingCart}
          />

          <StatCard
            title="Revenue"
            value={`₹${stats.revenue.toLocaleString()}`}
            icon={IndianRupee}
          />

          <StatCard
            title="Low Stock"
            value={String(stats.lowStockProducts)}
            icon={Package}
          />

        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          <RevenueChart />

          <OrdersTrendChart />

          <InventoryPieChart />

        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">
                Recent Orders
              </h2>

              <span className="text-blue-400">
                {stats.orders} Orders
              </span>
            </div>

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

                <tr>
                  <td className="py-4 text-white">
                    Ansh Saini
                  </td>

                  <td className="py-4 text-green-400">
                    ₹50,000
                  </td>

                  <td className="py-4">
                    <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full">
                      Pending
                    </span>
                  </td>
                </tr>

              </tbody>

            </table>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">
                Inventory Alerts
              </h2>

              <span className="text-red-400">
                {stats.lowStockProducts} Low Stock
              </span>
            </div>

            <table className="w-full">

              <thead>
                <tr className="border-b border-slate-800">

                  <th className="text-left py-3 text-slate-400">
                    Product
                  </th>

                  <th className="text-left py-3 text-slate-400">
                    SKU
                  </th>

                  <th className="text-left py-3 text-slate-400">
                    Stock
                  </th>

                </tr>
              </thead>

              <tbody>

                <tr>
                  <td className="py-4 text-white">
                    Monitor
                  </td>

                  <td className="py-4 text-white">
                    MN001
                  </td>

                  <td className="py-4 text-red-400">
                    4
                  </td>
                </tr>

                <tr>
                  <td className="py-4 text-white">
                    Gaming Mouse
                  </td>

                  <td className="py-4 text-white">
                    GM001
                  </td>

                  <td className="py-4 text-yellow-400">
                    6
                  </td>
                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}