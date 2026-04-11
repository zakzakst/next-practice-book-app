import { User } from "@/types/domain/user";

export const users: User[] = [
  {
    id: 1,
    name: "Taro Yamada",
    email: "taro@example.com",
    password: "password123",
    roles: ["user"],
    createdAt: "2026-04-01T08:00:00.000Z",
    updatedAt: "2026-04-01T08:00:00.000Z",
  },
  {
    id: 2,
    name: "Hanako Suzuki",
    email: "hanako@example.com",
    password: "securepass456",
    roles: ["user"],
    createdAt: "2026-04-02T09:30:00.000Z",
    updatedAt: "2026-04-02T09:30:00.000Z",
  },
  {
    id: 3,
    name: "Admin Ken",
    email: "admin@example.com",
    password: "adminpass789",
    roles: ["admin"],
    createdAt: "2026-04-03T10:45:00.000Z",
    updatedAt: "2026-04-03T10:45:00.000Z",
  },
];
