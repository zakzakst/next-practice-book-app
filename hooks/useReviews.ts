import {
  createFetcher,
  findOneFetcher,
  getApiPath,
  removeFetcher,
  updateFetcher,
} from "@/lib/api";
import { FrontBook } from "@/types/api/books";
import {
  CreateReviewRequest,
  CreateReviewResponse,
  FindAllReviewsByBookIdResponse,
  UpdateReviewRequest,
  UpdateReviewResponse,
} from "@/types/api/reviews";
import { FrontReview } from "@/types/api/reviews";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

// Create
export const useCreateReview = (id: FrontBook["id"]) => {
  return useSWRMutation(
    getApiPath(`/books/${id}/reviews`),
    createFetcher<CreateReviewRequest, CreateReviewResponse>,
  );
};

// Update
export const useUpdateReview = (id: FrontReview["id"]) => {
  return useSWRMutation(
    getApiPath(`/reviews/${id}`),
    updateFetcher<UpdateReviewRequest, UpdateReviewResponse>,
  );
};

// Remove
export const useRemoveReview = (id: FrontReview["id"]) => {
  return useSWRMutation(getApiPath(`/reviews/${id}`), removeFetcher);
};

// FindAllReviewsByBookIdResponse
export const useFindAllReviewsByBookId = (id: FrontBook["id"]) => {
  // TODO: 考える。現状パラメータの有無でfindOneFetcherとfindAllFetcherを作っているが、意味や使い方と合致しなくなる。。ちょっとSWRの共通fetcher作るのイマイチか？
  return (
    useSWR(getApiPath(`/books/${id}/reviews`)),
    findOneFetcher<FindAllReviewsByBookIdResponse>
  );
};
