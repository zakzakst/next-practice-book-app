// TODO: データ取得のルールの考え方がまとまらない。。一旦POSTで取得・条件はすべてリクエストに含める方針でやってみる
import { Book } from "@/types/domain/book";
import { User } from "@/types/domain/user";

// Create
export type CreateBookRequest = {
  title: string;
  author: string;
  description: string;
  thumbnail?: string;
};

export type CreateBookResponse = Book;

// FindAll
export type FindAllBooksParams = {
  keyword?: string;
  page?: string;
};

export type FindAllBooksResponse = {
  total: number;
  page: number;
  limit: number;
  items: Book[];
};

// FindOne
export type FindOneBookResponse = Book;

// Update
export type UpdateBookRequest = {
  title: string;
  author: string;
  description: string;
  thumbnail?: string;
};

export type UpdateBookResponse = Book;

// FindByUserLike
export type FindAllBooksByUserLikeRequest = {
  userId: User["id"];
  page?: string;
};

export type FindAllBooksByUserLikeResponse = {
  total: number;
  page: number;
  limit: number;
  items: Book[];
};
