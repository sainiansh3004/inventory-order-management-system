import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import AuthLayout from "../components/auth/AuthLayout";

const Register = () => {
  return (
    <AuthLayout
      title="Inventory Pro"
      subtitle="Create your account"
    >
      <form className="space-y-5">

       <Input
         placeholder="Full Name"
        />

       <Input
         type="email"
         placeholder="Email Address"
        />

        <Input
         type="password"
         placeholder="Password"
        />

       <Button
          text="Create Account"
          type="submit"
        />

      </form>

      <p className="text-center text-slate-400 mt-6">
        Already have an account?
        <span className="text-blue-400 ml-2 cursor-pointer">
          Login
        </span>
      </p>

    </AuthLayout>
  );
};

export default Register;