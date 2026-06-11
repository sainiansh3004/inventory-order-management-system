import DashboardLayout from "../components/layout/DashboardLayout";

export default function Profile() {
  return (
    <DashboardLayout>
      <div>
        <h1 className="text-5xl font-bold text-white">
          Profile
        </h1>

        <p className="text-slate-400 mt-2">
          Manage your account information
        </p>

        <div className="mt-8 bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-2xl">
          <div className="space-y-6">
            <div>
              <label className="text-slate-400">
                Full Name
              </label>

              <input
                type="text"
                value="Admin User"
                readOnly
                className="w-full mt-2 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="text-slate-400">
                Email
              </label>

              <input
                type="email"
                value="admin@inventorypro.com"
                readOnly
                className="w-full mt-2 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3"
              />
            </div>

            <button className="bg-blue-600 px-6 py-3 rounded-xl">
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}