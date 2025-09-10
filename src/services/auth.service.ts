import instance from "@/libs/axios/instance";
import { IActivationAccount, IRegister } from "@/types/Auth";
import endpoint from "./endpoint.constant";
import environment from "@/config/environment";

const authServices = {
  register: (payload: IRegister) => {
    return instance.post(
      `${environment.API_URL}${endpoint.AUTH}/register`,
      payload,
    );
  },
  activation: (payload: IActivationAccount) => {
    return instance.post(
      `${environment.API_URL}${endpoint.AUTH}/activation`,
      payload,
    );
  },
};

export default authServices;
