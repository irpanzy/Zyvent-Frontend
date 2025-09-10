import authServices from "@/services/auth.service";
import { IRegister } from "@/types/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { addToast } from "@heroui/toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useState } from "react";
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
      
      // Tambahkan toast sukses
      addToast({
        title: "Registration Success",
        description: "Your account has been created successfully!",
        color: "success"
      });
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
        
        // Jika ada pesan error umum, tampilkan sebagai toast dan set di form
        if (message) {
          setError("root", { message });
          addToast({
            title: "Registration Failed",
            description: message,
            color: "danger"
          });
        }
        
        // Jika ada error spesifik per field
        if (errors && typeof errors === 'object') {
          // Kumpulkan semua pesan error untuk toast
          const errorMessages: string[] = [];
          
          Object.entries(errors).forEach(([field, message]) => {
            // Konversi array message ke string (ambil yang pertama)
            const errorMessage = Array.isArray(message) ? message[0] : message;
            
            // Set error untuk field yang sesuai
            setError(field as keyof IRegister, { message: errorMessage as string });
            
            // Tambahkan ke kumpulan pesan error
            errorMessages.push(`${field}: ${errorMessage}`);
          });
          
          // Tampilkan semua error dalam satu toast
          if (errorMessages.length > 0) {
            addToast({
              title: "Validation Errors",
              description: React.createElement(
                "ul", 
                { className: "list-disc pl-4" },
                errorMessages.map((msg, index) => 
                  React.createElement("li", { key: index }, msg)
                )
              ),
              color: "danger"
            });
          }
        }
      } else if (error instanceof Error) {
        // Fallback ke error message standar jika tidak ada response data
        const errorMessage = "Registration failed. Please try again.";
        setError("root", { message: errorMessage });
        addToast({
          title: "Error",
          description: errorMessage,
          color: "danger"
        });
      } else {
        const errorMessage = "An unknown error occurred";
        setError("root", { message: errorMessage });
        addToast({
          title: "Error",
          description: errorMessage,
          color: "danger"
        });
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
