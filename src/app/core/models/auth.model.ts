export interface IUser {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}

export interface ISuccessAuth {
  message: string;
  token: string;
  user: {
    email: string;
    name: string;
    role: string;
  };
}
