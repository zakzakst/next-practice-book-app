import {
  findAllFetcher,
  findOneFetcher,
  getApiPath,
  updateFetcher,
} from "@/lib/api";
import {
  FindAllBooksParams,
  FindAllBooksResponse,
  FindOneBookResponse,
  UpdateBookRequest,
  UpdateBookResponse,
} from "@/types/api/books";
import { Book } from "@/types/domain/book";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

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

// Update
export const useUpdateBook = (id: Book["id"]) => {
  return useSWRMutation(
    getApiPath(`/books/${id}`),
    updateFetcher<UpdateBookRequest, UpdateBookResponse>,
  );
};
