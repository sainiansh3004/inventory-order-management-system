import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import {
  getCustomers,
  createCustomer,
  deleteCustomer,
} from "../services/customerService";
import { Users, Search, Plus, Trash2 } from "lucide-react";

export default function Customers() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
  const cached = sessionStorage.getItem("customers");

  if (cached) {
    setCustomers(JSON.parse(cached));
    return;
  }

  try {
    const data = await getCustomers();
    setCustomers(data);
    sessionStorage.setItem("customers", JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
};

  const handleAddCustomer = async () => {
    if (
      !newCustomer.name ||
      !newCustomer.email ||
      !newCustomer.phone ||
      !newCustomer.address
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      await createCustomer(newCustomer);

      setNewCustomer({
        name: "",
        email: "",
        phone: "",
        address: "",
      });

      setShowModal(false);
      loadCustomers();
    } catch (error) {
      console.log(error);
      alert("Unable to add customer");
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) return;

    try {
      await deleteCustomer(id);
      loadCustomers();
    } catch (error) {
      console.log(error);
      alert("Unable to delete customer");
    }
  };

  const filteredCustomers = Array.isArray(customers)
  ? customers.filter(
      (customer) =>
        customer.name?.toLowerCase().includes(search.toLowerCase()) ||
        customer.email?.toLowerCase().includes(search.toLowerCase())
    )
  : [];

  return (
    <DashboardLayout title="Customers">
      <div className="space-y-6">

        <div className="flex justify-between items-center">

          <div>
            <h1 className="text-3xl font-bold text-white">Customers</h1>
            <p className="text-slate-400 mt-1">
              Manage customer records
            </p>
          </div>

          <div className="flex items-center gap-3">

            <button
              onClick={() => setShowModal(true)}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl flex items-center gap-2 text-white"
            >
              <Plus size={18} />
              Add Customer
            </button>

            <div className="bg-blue-600 px-4 py-2 rounded-xl flex items-center gap-2 text-white">
              <Users size={18} />
              <span>{customers.length} Customers</span>
            </div>

          </div>

        </div>

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
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white outline-none"
            />

          </div>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-slate-800">

                <th className="text-left py-4 text-slate-400">Name</th>
                <th className="text-left py-4 text-slate-400">Email</th>
                <th className="text-left py-4 text-slate-400">Phone</th>
                <th className="text-left py-4 text-slate-400">Address</th>
                <th className="text-center py-4 text-slate-400">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredCustomers.length === 0 ? (

                <tr>

                  <td
                    colSpan={5}
                    className="text-center py-8 text-slate-500"
                  >
                    No Customers Found
                  </td>

                </tr>

              ) : (

                filteredCustomers.map((customer) => (

                  <tr
                    key={customer._id}
                    className="border-b border-slate-800 hover:bg-slate-800/40"
                  >

                    <td className="py-4 text-white">{customer.name}</td>
                    <td className="py-4 text-white">{customer.email}</td>
                    <td className="py-4 text-white">{customer.phone}</td>
                    <td className="py-4 text-white">{customer.address}</td>

                    <td className="py-4 text-center">

                      <button
                        onClick={() => handleDelete(customer._id)}
                        className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg text-white flex items-center gap-2 mx-auto"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

        {showModal && (

          <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

            <div className="bg-slate-900 rounded-2xl p-6 w-[420px] border border-slate-700">

              <h2 className="text-2xl font-bold text-white mb-6">
                Add Customer
              </h2>

              <div className="space-y-4">

                <input
                  type="text"
                  placeholder="Customer Name"
                  value={newCustomer.name}
                  onChange={(e) =>
                    setNewCustomer({
                      ...newCustomer,
                      name: e.target.value,
                    })
                  }
                  className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={newCustomer.email}
                  onChange={(e) =>
                    setNewCustomer({
                      ...newCustomer,
                      email: e.target.value,
                    })
                  }
                  className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
                />

                <input
                  type="text"
                  placeholder="Phone"
                  value={newCustomer.phone}
                  onChange={(e) =>
                    setNewCustomer({
                      ...newCustomer,
                      phone: e.target.value,
                    })
                  }
                  className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
                />

                <textarea
                  placeholder="Address"
                  value={newCustomer.address}
                  onChange={(e) =>
                    setNewCustomer({
                      ...newCustomer,
                      address: e.target.value,
                    })
                  }
                  className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
                />

              </div>

              <div className="flex justify-end gap-3 mt-6">

                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-600 hover:bg-gray-700 px-5 py-2 rounded-lg text-white"
                >
                  Cancel
                </button>

                <button
                  onClick={handleAddCustomer}
                  className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg text-white"
                >
                  Save Customer
                </button>

              </div>

            </div>

          </div>

        )}

      </div>
    </DashboardLayout>
  );
}