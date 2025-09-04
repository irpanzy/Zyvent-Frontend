import useRegister from "@/hooks/useRegister";
import { cn } from "@/utils/cn";
import { Button, Card, CardBody, Input, Spinner } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { Controller } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const {
    visiblePassword,
    togglePasswordVisibility,
    control,
    handleRegister,
    handleSubmit,
    isRegistering,
    errors,
  } = useRegister();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 lg:flex-row lg:gap-20">
      <div className="flex w-full flex-col items-center justify-center gap-10 lg:w-1/3">
        <Image
          src="/general/logo.png"
          alt="Register"
          width={180}
          height={180}
          style={{ width: "50%", height: "auto" }}
        />
        <Image
          src="/illustration/login.svg"
          alt="Register"
          width={180}
          height={180}
          className="w-2/3 lg:w-full"
          priority
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
          <form
            onSubmit={handleSubmit(handleRegister)}
            className={cn(
              "flex w-80 flex-col pt-4",
              Object.keys(errors).length > 0 ? "gap-2" : "gap-4",
            )}
          >
            <Controller
              control={control}
              name="fullName"
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  isClearable
                  onClear={() => field.onChange("")}
                  type="text"
                  label="Full Name"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={!!errors.fullName?.message}
                  errorMessage={errors.fullName?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="username"
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  isClearable
                  onClear={() => field.onChange("")}
                  type="text"
                  label="Username"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={!!errors.username?.message}
                  errorMessage={errors.username?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="phoneNumber"
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  isClearable
                  onClear={() => field.onChange("")}
                  type="tel"
                  label="Phone Number"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={!!errors.phoneNumber?.message}
                  errorMessage={errors.phoneNumber?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  isClearable
                  onClear={() => field.onChange("")}
                  type="email"
                  label="Email"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={!!errors.email?.message}
                  errorMessage={errors.email?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
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
                  isInvalid={!!errors.password?.message}
                  errorMessage={errors.password?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="confirmPassword"
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  endContent={
                    <button
                      aria-label="toggle password visibility"
                      className="cursor-pointer outline-transparent focus:outline-solid"
                      type="button"
                      onClick={() =>
                        togglePasswordVisibility("confirmPassword")
                      }
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
                  isInvalid={!!errors.confirmPassword?.message}
                  errorMessage={errors.confirmPassword?.message}
                />
              )}
            />
            <Button
              type="submit"
              fullWidth
              color="primary"
              disabled={isRegistering}
            >
              {isRegistering ? <Spinner color="white" size="sm" /> : "Register"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Register;
