import authServices from "@/services/auth";
import { IRegister } from "@/types/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const registerSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  username: yup.string().required("Username is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  email: yup
    .string()
    .email("Email format is invalid")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const useRegister = () => {
  const router = useRouter();
  const [visiblePassword, setVisiblePassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = (key: "password" | "confirmPassword") => {
    setVisiblePassword((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const registerService = async (payload: IRegister) => {
    try {
      const response = await authServices.register(payload);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        setError("root", { message: error.message });
      } else {
        setError("root", { message: "An unknown error occurred" });
      }
    }
  };

  const { mutate } = useMutation({
    mutationFn: registerService,
    onSuccess: () => {
      router.push("/auth/register/success");
      reset();
    },
  });

  return {
    visiblePassword,
    togglePasswordVisibility,
  };
};

export default useRegister;
