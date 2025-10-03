import environment from "@/config/environment";
import { SessionExtended } from "@/types/Auth";
import axios from "axios";
import { getSession } from "next-auth/react";

const headers = {
  "Content-Type": "application/json",
};

const instance = axios.create({
  baseURL: environment.API_URL,
  headers,
  timeout: 60 * 1000,
});

instance.interceptors.request.use(
  async (request) => {
    const session: SessionExtended | null = await getSession();
    if (session && session.accessToken) {
      request.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Tambahkan informasi error ke objek error untuk penggunaan lebih mudah
    if (error.response) {
      error.backendError = {
        message: error.response.data?.message || error.response.statusText,
        errors: error.response.data?.errors || {},
        status: error.response.status,
      };
    }

    return Promise.reject(error);
  },
);

export default instance;
