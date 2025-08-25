import { useState } from "react";

const useRegister = () => {
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

  return {
    visiblePassword,
    togglePasswordVisibility,
  };
};

export default useRegister;
