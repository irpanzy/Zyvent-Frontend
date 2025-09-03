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
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const registerService = async (payload: IRegister) => {
    const response = await authServices.register(payload);
    return response.data;
  };

  const { mutate: registerUser, isPending: isRegistering } = useMutation({
    mutationFn: registerService,
    onSuccess: () => {
      router.push("/auth/register/success");
      reset();
    },
    onError: (error: unknown) => {
      // Cast error untuk mendapatkan backendError yang ditambahkan di interceptor
      const axiosError = error as {
        backendError?: {
          message?: string;
          errors?: Record<string, string | string[]>;
          status?: number;
        };
        message?: string;
      };
      
      // Periksa apakah ada backendError dari interceptor
      if (axiosError.backendError) {
        const { message, errors } = axiosError.backendError;
        
        // Jika ada pesan error umum, tampilkan
        if (message) {
          setError("root", { message });
        }
        
        // Jika ada error spesifik per field
        if (errors && typeof errors === 'object') {
          Object.entries(errors).forEach(([field, message]) => {
            // Konversi array message ke string (ambil yang pertama)
            const errorMessage = Array.isArray(message) ? message[0] : message;
            
            // Set error untuk field yang sesuai
            setError(field as keyof IRegister, { message: errorMessage as string });
          });
        }
      } else if (error instanceof Error) {
        // Fallback ke error message standar jika tidak ada response data
        setError("root", { message: "Registration failed. Please try again." });
      } else {
        setError("root", { message: "An unknown error occurred" });
      }
    },
  });

  const handleRegister = async (data: IRegister) => {
    await registerUser(data);
  };

  return {
    visiblePassword,
    togglePasswordVisibility,
    handleRegister,
    control,
    handleSubmit,
    isRegistering,
    errors,
  };
};

export default useRegister;
