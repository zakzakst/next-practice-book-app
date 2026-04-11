import { Book } from "./book";
import { User } from "./user";

export type Like = {
  id: number;
  bookId: Book["id"];
  userId: User["id"];
  createdAt: string;
  updatedAt: string;
};
