import AuthLayout from "@/components/layouts/AuthLayout";
import Register from "@/components/views/Auth/Register";

const RegisterPage = () => {
  return (
    <AuthLayout title="Zyvent | Register" description="Create a new account">
      <Register />
    </AuthLayout>
  );
};

export default RegisterPage;
