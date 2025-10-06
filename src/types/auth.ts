export type TLoginInput = {
  email: string;
  password: string;
};

export type TSignUpInput = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type TUser = {
  _id: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
};

export type TUserInfo = {
  _id: string;
  name: string;
  role: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  image: string;
};
