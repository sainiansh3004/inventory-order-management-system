import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  Boxes,
  Settings,
  User,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menus = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Products",
      path: "/products",
      icon: Package,
    },
    {
      name: "Customers",
      path: "/customers",
      icon: Users,
    },
    {
      name: "Orders",
      path: "/orders",
      icon: ShoppingCart,
    },
    {
      name: "Inventory",
      path: "/inventory",
      icon: Boxes,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="w-72 min-h-screen bg-slate-900 border-r border-slate-800 p-6">

      <div className="mb-12">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
          Inventory Pro
        </h1>

        <p className="text-slate-500 text-sm mt-2">
          SaaS Management Suite
        </p>
      </div>

      <nav className="space-y-3">

        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.name}
              to={menu.path}
              className={({ isActive }) =>
                `
                flex
                items-center
                gap-3
                p-4
                rounded-xl
                transition-all
                duration-300

                ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }
              `
              }
            >
              <Icon size={20} />

              <span>{menu.name}</span>
            </NavLink>
          );
        })}

      </nav>

      <div className="mt-12 p-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600">

        <h3 className="text-white font-bold">
          Pro Dashboard
        </h3>

        <p className="text-blue-100 text-sm mt-2">
          Inventory Analytics
          <br />
          Order Tracking
          <br />
          Revenue Insights
        </p>

      </div>

    </aside>
  );
};

export default Sidebar;