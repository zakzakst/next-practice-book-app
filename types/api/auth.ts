import { User } from "@/types/domain/user";

// Register
export type AuthRegisterRequest = {
  email: string;
  password: string;
};

export type AuthRegisterResponse = {
  message: string;
  ok: boolean;
};

// Login
export type AuthLoginRequest = {
  email: string;
  password: string;
};

export type AuthLoginResponse = {
  message: string;
  ok: boolean;
};

// Logout
export type AuthLogoutResponse = {
  message: string;
};

// Me
export type AuthMe = Omit<User, "password">;

export type AuthMeResponse = AuthMe | null;
