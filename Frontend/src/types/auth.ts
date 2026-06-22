export interface AuthUser {
  email: string;
  username: string;
  role: "admin" | "user";
}
