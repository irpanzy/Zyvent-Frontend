import { Button } from "@heroui/react";
import Image from "next/image";
import { useEffect } from "react";
import { addToast } from "@heroui/toast";
import { useRouter } from "next/router";

const RegisterSuccess = () => {
  const router = useRouter();
  useEffect(() => {
    addToast({
      title: "Registration Success",
      description: "Your account has been created successfully!",
      color: "success",
    });
  }, []);

  return (
    <div className="mx-auto flex w-full flex-col items-center justify-center gap-10 p-4">
      <div className="flex h-full flex-col items-center justify-center gap-10">
        <Image
          src="/general/logo.png"
          alt="Register"
          width={180}
          height={180}
          style={{ height: "auto" }}
        />
        <Image
          src="/illustration/email-send.svg"
          alt="Success"
          width={300}
          height={300}
          style={{ height: "auto" }}
          priority
        />
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-danger-500 text-3xl font-bold">
          Create Account Success
        </h1>
        <p className="max-w-md px-4 text-center text-gray-600">
          Check your email to verify your account and start using all the
          features of Zyvent!
        </p>
        <Button
          onPress={() => router.push("/")}
          color="danger"
          variant="bordered"
          className="mt-4 w-fit transition-all duration-300 hover:scale-105 hover:shadow-md active:scale-95 active:shadow-sm"
        >
          Back To Home
        </Button>
      </div>
    </div>
  );
};

export default RegisterSuccess;
