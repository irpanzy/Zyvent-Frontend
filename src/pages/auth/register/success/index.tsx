import AuthLayout from "@/components/layouts/AuthLayout";
import RegisterSuccess from "@/components/views/Auth/RegisterSuccess";

const RegisterSuccessPage = () => {
  return (
    <AuthLayout
      title="Zyvent | Register Success"
      description="Registration successful"
    >
      <RegisterSuccess />
    </AuthLayout>
  );
};

export default RegisterSuccessPage;
