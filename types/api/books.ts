// TODO: データ取得のルールの考え方がまとまらない。。一旦POSTで取得・条件はすべてリクエストに含める方針でやってみる
import { Book } from "@/types/domain/book";

// import { Review } from "@/types/domain/review";

export type FrontBook = Book & {
  favorite: {
    count: number;
    state: boolean;
  };
  reviews: {
    count: number;
  };
};

// Create
export type CreateBookRequest = {
  title: string;
  author: string;
  description: string;
  thumbnail?: string;
};

export type CreateBookResponse = FrontBook;

// FindAll
export type FindAllBooksParams = {
  q?: string;
  page?: number;
};

export type FindAllBooksResponse = {
  total: number;
  page: number;
  limit: number;
  items: FrontBook[];
};

// FindOne
export type FindOneBookResponse = FrontBook;

// Update
export type UpdateBookRequest = {
  title: string;
  author: string;
  description: string;
  thumbnail?: string;
};

export type UpdateBookResponse = FrontBook;

// FindByUserFavorite
export type FindAllBooksByUserFavoriteRequest = {
  page?: string;
};

export type FindAllBooksByUserFavoriteResponse = {
  total: number;
  page: number;
  limit: number;
  items: FrontBook[];
};
