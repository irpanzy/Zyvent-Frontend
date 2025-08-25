import useRegister from "@/hooks/useRegister";
import { Button, Card, CardBody, Input } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const { visiblePassword, togglePasswordVisibility } = useRegister();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 lg:flex-row lg:gap-20">
      <div className="flex w-full flex-col items-center justify-center gap-10 lg:w-1/3">
        <Image
          src="/general/logo.png"
          alt="Register"
          width={180}
          height={180}
        />
        <Image
          src="/illustration/login.svg"
          alt="Register"
          width={180}
          height={180}
          className="w-2/3 lg:w-full"
        />
      </div>
      <Card>
        <CardBody>
          <h2 className="text-danger-500 text-xl font-bold">Create Account</h2>
          <p className="text-small text-gray-500">
            Have an account?&nbsp;
            <Link href="/auth/login" className="text-danger-500 font-semibold">
              Login here
            </Link>
          </p>
          <form className="flex w-80 flex-col gap-4 pt-4">
            <Input
              isClearable
              type="text"
              label="Full Name"
              variant="bordered"
              autoComplete="off"
            />
            <Input
              isClearable
              type="text"
              label="Username"
              variant="bordered"
              autoComplete="off"
            />
            <Input
              isClearable
              type="tel"
              label="Phone Number"
              variant="bordered"
              autoComplete="off"
            />
            <Input
              isClearable
              type="email"
              label="Email"
              variant="bordered"
              autoComplete="off"
            />
            <Input
              endContent={
                <button
                  aria-label="toggle password visibility"
                  className="cursor-pointer outline-transparent focus:outline-solid"
                  type="button"
                  onClick={() => togglePasswordVisibility("password")}
                >
                  {visiblePassword.password ? (
                    <FaEye className="text-default-400 pointer-events-none text-xl" />
                  ) : (
                    <FaEyeSlash className="text-default-400 pointer-events-none text-xl" />
                  )}
                </button>
              }
              label="Password"
              type={visiblePassword.password ? "text" : "password"}
              variant="bordered"
            />
            <Input
              endContent={
                <button
                  aria-label="toggle password visibility"
                  className="cursor-pointer outline-transparent focus:outline-solid"
                  type="button"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                >
                  {visiblePassword.confirmPassword ? (
                    <FaEye className="text-default-400 pointer-events-none text-xl" />
                  ) : (
                    <FaEyeSlash className="text-default-400 pointer-events-none text-xl" />
                  )}
                </button>
              }
              label="Confirm Password"
              type={visiblePassword.confirmPassword ? "text" : "password"}
              variant="bordered"
            />
            <Button type="submit" fullWidth color="primary">
              Create Account
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Register;
