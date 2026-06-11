import type { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

const AuthLayout = ({
  title,
  subtitle,
  children,
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">

      <div className="absolute w-96 h-96 bg-blue-600/20 blur-3xl rounded-full" />

      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative">

        <div className="text-center mb-8">
          <h1 className="text-white text-4xl font-bold">
            {title}
          </h1>

          <p className="text-slate-400 mt-2">
            {subtitle}
          </p>
        </div>

        {children}

      </div>

    </div>
  );
};

export default AuthLayout;