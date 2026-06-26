import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import {
  getOrders,
  createOrder,
  deleteOrder,
} from "../services/orderService";
import { getCustomers } from "../services/customerService";
import { getProducts } from "../services/productService";
import { Plus, Trash2 } from "lucide-react";

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [orderData, setOrderData] = useState({
    customer: "",
    product: "",
    quantity: 1,
  });

  useEffect(() => {
  loadOrders();
}, []);

const loadOrders = async () => {
  try {
    const [orderRes, customerRes] = await Promise.all([
      getOrders(),
      getCustomers(),
    ]);

    setOrders(orderRes || []);
    setCustomers(customerRes || []);
  } catch (error) {
    console.error(error);
  }
};

const loadProducts = async () => {
  try {
    const productRes = await getProducts();
    setProducts(productRes || []);
  } catch (error) {
    console.error(error);
  }
};

  const handleAddOrder = async () => {
    if (
      !orderData.customer ||
      !orderData.product ||
      orderData.quantity <= 0
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      await createOrder({
        customer: orderData.customer,
        items: [
          {
            product: orderData.product,
            quantity: Number(orderData.quantity),
          },
        ],
      });

      setShowModal(false);

      setOrderData({
        customer: "",
        product: "",
        quantity: 1,
      });

     loadOrders();
    } catch (error: any) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Unable to create order"
      );
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this order?")) return;

    try {
      await deleteOrder(id);
      loadOrders();
    } catch (error) {
      console.error(error);
      alert("Unable to delete order");
    }
  };
  
    return (
    <DashboardLayout title="Orders">
      <div className="space-y-6">

        {/* Header */}

        <div className="flex justify-between items-center">

          <div>
            <h1 className="text-3xl font-bold text-white">
              Orders
            </h1>

            <p className="text-slate-400 mt-1">
              Manage customer orders
            </p>
          </div>

          <button
  onClick={async () => {
    if (products.length === 0) {
      await loadProducts();
    }
    setShowModal(true);
  }}
  className="bg-green-600 hover:bg-green-700 transition px-5 py-3 rounded-xl flex items-center gap-2 text-white"
>
  <Plus size={18} />
  Add Order
</button>

        </div>

        {/* Orders Table */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <table className="w-full">

            <thead>

              <tr className="border-b border-slate-800">

                <th className="text-left py-3 text-slate-400">
                  Customer
                </th>

                <th className="text-left py-3 text-slate-400">
                  Product
                </th>

                <th className="text-left py-3 text-slate-400">
                  Qty
                </th>

                <th className="text-left py-3 text-slate-400">
                  Amount
                </th>

                <th className="text-left py-3 text-slate-400">
                  Status
                </th>

                <th className="text-center py-3 text-slate-400">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {orders.length > 0 ? (

                orders.map((order: any) => (

                  <tr
                    key={order._id}
                    className="border-b border-slate-800 hover:bg-slate-800/40"
                  >

                    <td className="py-4 text-white">
                      {order.customer?.name}
                    </td>

                    <td className="py-4 text-white">
                      {order.items?.[0]?.product?.name}
                    </td>

                    <td className="py-4 text-white">
                      {order.items?.[0]?.quantity}
                    </td>

                    <td className="py-4 text-green-400 font-semibold">
                      ₹{order.totalAmount}
                    </td>

                    <td className="py-4">

                      <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full">
                        {order.status}
                      </span>

                    </td>

                    <td className="py-4 text-center">

                      <button
                        onClick={() => handleDelete(order._id)}
                        className="bg-red-600 hover:bg-red-700 p-2 rounded-lg"
                      >
                        <Trash2 size={18} />
                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan={6}
                    className="text-center py-8 text-slate-500"
                  >
                    No Orders Found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* Add Order Modal */}

        {showModal && (

          <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

            <div className="bg-slate-900 w-[450px] rounded-2xl border border-slate-700 p-6">

              <h2 className="text-2xl font-bold text-white mb-6">
                Add New Order
              </h2>
                            <div className="space-y-4">

                {/* Customer */}

                <select
                  value={orderData.customer}
                  onChange={(e) =>
                    setOrderData({
                      ...orderData,
                      customer: e.target.value,
                    })
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
                >
                  <option value="">Select Customer</option>

                  {customers.map((customer: any) => (
                    <option
                      key={customer._id}
                      value={customer._id}
                    >
                      {customer.name}
                    </option>
                  ))}
                </select>

                {/* Product */}

                <select
                  value={orderData.product}
                  onChange={(e) =>
                    setOrderData({
                      ...orderData,
                      product: e.target.value,
                    })
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
                >
                  <option value="">Select Product</option>

                  {products.map((product: any) => (
                    <option
                      key={product._id}
                      value={product._id}
                    >
                      {product.name} (₹{product.price})
                    </option>
                  ))}
                </select>

                {/* Quantity */}

                <input
                  type="number"
                  min="1"
                  value={orderData.quantity}
                  onChange={(e) =>
                    setOrderData({
                      ...orderData,
                      quantity: Number(e.target.value),
                    })
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
                  placeholder="Quantity"
                />

              </div>

              <div className="flex justify-end gap-3 mt-6">

                <button
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white"
                >
                  Cancel
                </button>

                <button
                  onClick={handleAddOrder}
                  className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white"
                >
                  Save Order
                </button>

              </div>

            </div>

          </div>

        )}

      </div>
    </DashboardLayout>
  );
}