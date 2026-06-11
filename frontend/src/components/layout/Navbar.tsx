const Navbar = () => {
  return (
    <header className="h-20 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-8">

      <div>
        <h2 className="text-white text-2xl font-bold">
          Inventory Pro
        </h2>

        <p className="text-slate-400 text-sm">
          Inventory & Order Management System
        </p>
      </div>

      <div className="flex items-center gap-4">

        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600" />

        <span className="text-white font-medium">
          Admin
        </span>

      </div>

    </header>
  );
};

export default Navbar;