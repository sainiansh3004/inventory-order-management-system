import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { getProducts } from "../services/productService";
import { Search, Package } from "lucide-react";

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      product.sku
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <DashboardLayout title="Products">
      <div className="space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center">

          <div>
            <h1 className="text-3xl font-bold text-white">
              Products
            </h1>

            <p className="text-slate-400 mt-1">
              Manage inventory products
            </p>
          </div>

          <div className="bg-blue-600 px-4 py-2 rounded-xl flex items-center gap-2 text-white">
            <Package size={18} />
            <span>{products.length} Products</span>
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
              placeholder="Search products..."
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
                  SKU
                </th>

                <th className="text-left py-4 text-slate-400">
                  Category
                </th>

                <th className="text-left py-4 text-slate-400">
                  Stock
                </th>

                <th className="text-left py-4 text-slate-400">
                  Price
                </th>

                <th className="text-left py-4 text-slate-400">
                  Status
                </th>

              </tr>
            </thead>

            <tbody>

              {filteredProducts.map((product) => (
                <tr
                  key={product._id}
                  className="border-b border-slate-800 hover:bg-slate-800/40"
                >

                  <td className="py-4 text-white">
                    {product.name}
                  </td>

                  <td className="py-4 text-white">
                    {product.sku}
                  </td>

                  <td className="py-4">

                    <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                      {product.category}
                    </span>

                  </td>

                  <td className="py-4 text-white">
                    {product.quantity}
                  </td>

                  <td className="py-4 text-green-400 font-semibold">
                    ₹{product.price}
                  </td>

                  <td className="py-4">

                    {product.quantity < 10 ? (
                      <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm">
                        Low Stock
                      </span>
                    ) : (
                      <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                        In Stock
                      </span>
                    )}

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