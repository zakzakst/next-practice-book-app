export type UserRole = "user" | "admin";

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  roles: UserRole[];
  createdAt: string;
  updatedAt: string;
};
