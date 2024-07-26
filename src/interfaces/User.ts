export interface User {
  _id?: string | number;
  username: string;
  email: string;
  password: string;
  confirmPass: string;
  avatar?: string;
  role?: "admin" | "member" | "guest";
}
