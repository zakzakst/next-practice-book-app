import { Book } from "./book";
import { User } from "./user";

export type Review = {
  id: number;
  bookId: Book["id"];
  userId: User["id"];
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
};
