import instance from "@/libs/axios/instance";
import { IActivationAccount, ILogin, IRegister } from "@/types/Auth";
import endpoint from "./endpoint.constant";

const authServices = {
  register: (payload: IRegister) => {
    return instance.post(`${endpoint.AUTH}/register`, payload);
  },
  activation: (payload: IActivationAccount) => {
    return instance.post(`${endpoint.AUTH}/activation`, payload);
  },

  login: (payload: ILogin) => {
    return instance.post(`${endpoint.AUTH}/login`, payload);
  },
  getMeProfile: (token: string) => {
    return instance.get(`${endpoint.AUTH}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default authServices;
