interface IRegister {
  fullName: string;
  username: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface IActivationAccount {
  code: string;
}

export type { IRegister, IActivationAccount };
