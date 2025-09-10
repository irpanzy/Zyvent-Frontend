import { Button } from "@heroui/react";
import Image from "next/image";
import { useEffect } from "react";
import { addToast } from "@heroui/toast";
import { useRouter } from "next/router";

interface ActivationProps {
  status: "success" | "failed";
}

const Activation = (props: ActivationProps) => {
  const router = useRouter();
  const { status } = props;
  useEffect(() => {
    if (status === "success") {
      addToast({
        title: "Activation Success",
        description: "Your account has been activated successfully!",
        color: "success",
      });
    } else {
      addToast({
        title: "Activation Failed",
        description: "Sorry, the activation code is invalid or expired.",
        color: "danger",
      });
    }
  }, [status]);

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
          src={
            status === "success"
              ? "/illustration/success.svg"
              : "/illustration/pending.svg"
          }
          alt="Success"
          width={280}
          height={280}
          style={{ height: "auto" }}
          priority
        />
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-danger-500 text-3xl font-bold">
          {status === "success"
            ? "Activation Account Success"
            : "Activation Account Failed"}
        </h1>
        <p className="max-w-md px-4 text-center text-gray-600">
          {status === "success"
            ? "Your account is now active. You can login to Zyvent."
            : "Sorry, confirmation code is invalid or expired."}
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

export default Activation;
