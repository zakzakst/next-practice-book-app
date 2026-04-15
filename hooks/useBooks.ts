import { findAllFetcher, findOneFetcher, getApiPath } from "@/lib/api";
import {
  FindAllBooksParams,
  FindAllBooksResponse,
  FindOneBookResponse,
} from "@/types/api/books";
import { Book } from "@/types/domain/book";
import useSWR from "swr";

// FindAll
export const useFindAllBooks = (params?: FindAllBooksParams) => {
  return useSWR(
    { url: getApiPath(`/books`), params },
    findAllFetcher<FindAllBooksResponse, FindAllBooksParams>,
  );
};

// FindOne
export const useFindOneBook = (id: Book["id"]) => {
  return useSWR(
    getApiPath(`/books/${id}`),
    findOneFetcher<FindOneBookResponse>,
  );
};
