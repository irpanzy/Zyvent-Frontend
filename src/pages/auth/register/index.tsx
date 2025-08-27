import AuthLayout from "@/components/layouts/AuthLayout";
import Register from "@/components/views/Register";

const RegisterPage = () => {
  return (
    <AuthLayout title="Zyvent | Register" description="Create a new account">
      <Register />
    </AuthLayout>
  );
};

export default RegisterPage;
