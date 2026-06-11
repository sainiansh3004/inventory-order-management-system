import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import AuthLayout from "../components/auth/AuthLayout";

const Login = () => {
  return (
    <AuthLayout
      title="Inventory Pro"
      subtitle="Sign in to your account"
    >
      <form className="space-y-5">

        <Input
          type="email"
          placeholder="Email Address"
        />

        <Input
          type="password"
          placeholder="Password"
        />

       <Button
         text="Login"
         type="submit"
        />

      </form>

      <p className="text-center text-slate-400 mt-6">
        Don't have an account?
        <span className="text-blue-400 ml-2 cursor-pointer">
          Register
        </span>
      </p>
    </AuthLayout>
  );
};

export default Login;