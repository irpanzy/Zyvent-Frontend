import instance from "@/libs/axios/instance";
import { IRegister } from "@/types/Auth";
import endpoint from "./endpoint.constant";
import environment from "@/config/environment";

const authServices = {
  register: (payload: IRegister) =>
    instance.post(`${environment.API_URL}${endpoint.AUTH}/register`, payload),
  //   login: (payload: ILogin) =>
  //     instance.post(`${environment.API_URL}${endpoint.AUTH}/login`, payload),
};

export default authServices;
