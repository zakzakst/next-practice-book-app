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
import { FrontBook } from "@/types/api/books";
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
export const useFindOneBook = (id: FrontBook["id"]) => {
  return useSWR(
    getApiPath(`/books/${id}`),
    findOneFetcher<FindOneBookResponse>,
  );
};

// Update
export const useUpdateBook = (id: FrontBook["id"]) => {
  return useSWRMutation(
    getApiPath(`/books/${id}`),
    updateFetcher<UpdateBookRequest, UpdateBookResponse>,
  );
};
