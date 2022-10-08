export interface ILogin {
  account: string;
  password: string;
}

export interface IUserInfo {
  _id: string;
  username: string;
  email: string;
  role: number;
  createdAt: string;
  updatedAt: string;
  avatar: string;
}
