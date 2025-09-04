import AuthLayout from "@/components/layouts/AuthLayout";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { addToast } from "@heroui/toast";

const RegisterSuccessPage = () => {
  useEffect(() => {
    addToast({
      title: "Registration Success",
      description: "Your account has been created successfully!",
      color: "success",
    });
  }, []);

  return (
    <AuthLayout
      title="Zyvent | Register Success"
      description="Registration successful"
    >
      <div className="flex flex-col items-center justify-center gap-6 p-8 text-center">
        <Image
          src="/illustration/success.svg"
          alt="Success"
          width={200}
          height={200}
          className="h-auto w-60"
        />

        <h1 className="text-danger-500 text-3xl font-bold">
          Registration Successful!
        </h1>
        <p className="max-w-md text-gray-600">
          Your account has been created successfully. You can now login to
          access your account.
        </p>

        <Link href="/auth/login">
          <Button color="danger" className="mt-4">
            Aktivasi Akun dan Login
          </Button>
        </Link>
      </div>
    </AuthLayout>
  );
};

export default RegisterSuccessPage;
