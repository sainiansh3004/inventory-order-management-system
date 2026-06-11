import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { getCustomers } from "../services/customerService";
import { Users, Search } from "lucide-react";

export default function Customers() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      customer.email
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <DashboardLayout title="Customers">
      <div className="space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center">

          <div>
            <h1 className="text-3xl font-bold text-white">
              Customers
            </h1>

            <p className="text-slate-400 mt-1">
              Manage customer records
            </p>
          </div>

          <div className="bg-blue-600 px-4 py-2 rounded-xl flex items-center gap-2">
            <Users size={18} />
            <span>{customers.length} Customers</span>
          </div>

        </div>

        {/* Search */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">

          <div className="relative">

            <Search
              className="absolute left-4 top-3 text-slate-500"
              size={18}
            />

            <input
              type="text"
              placeholder="Search customers..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                w-full
                bg-slate-800
                border
                border-slate-700
                rounded-xl
                py-3
                pl-12
                pr-4
                text-white
                outline-none
              "
            />

          </div>

        </div>

        {/* Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <table className="w-full">

            <thead>
              <tr className="border-b border-slate-800">

                <th className="text-left py-4 text-slate-400">
                  Name
                </th>

                <th className="text-left py-4 text-slate-400">
                  Email
                </th>

                <th className="text-left py-4 text-slate-400">
                  Phone
                </th>

                <th className="text-left py-4 text-slate-400">
                  Address
                </th>

              </tr>
            </thead>

            <tbody>

              {filteredCustomers.map((customer) => (
                <tr
                  key={customer._id}
                  className="border-b border-slate-800 hover:bg-slate-800/40"
                >
                  <td className="py-4 text-white">
                    {customer.name}
                  </td>

                  <td className="py-4 text-white">
                    {customer.email}
                  </td>

                  <td className="py-4 text-white">
                    {customer.phone}
                  </td>

                  <td className="py-4 text-white">
                    {customer.address}
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