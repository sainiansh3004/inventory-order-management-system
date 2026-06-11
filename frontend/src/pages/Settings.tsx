import DashboardLayout from "../components/layout/DashboardLayout";

export default function Settings() {
  return (
    <DashboardLayout>
      <div>
        <h1 className="text-5xl font-bold text-white">
          Settings
        </h1>

        <p className="text-slate-400 mt-2">
          Application settings
        </p>

        <div className="mt-8 bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-2xl">
          <div className="space-y-6">

            <div className="flex justify-between items-center">
              <span>Enable Notifications</span>
              <input type="checkbox" defaultChecked />
            </div>

            <div className="flex justify-between items-center">
              <span>Dark Mode</span>
              <input type="checkbox" defaultChecked />
            </div>

            <div className="flex justify-between items-center">
              <span>Email Alerts</span>
              <input type="checkbox" />
            </div>

            <button className="bg-blue-600 px-6 py-3 rounded-xl">
              Save Settings
            </button>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}