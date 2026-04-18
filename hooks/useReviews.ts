import {
  createFetcher,
  findOneFetcher,
  getApiPath,
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
const removeReviewFetcher = (
  _url: string,
  { arg }: { arg: { id: FrontReview["id"] } },
) => {
  return fetch(getApiPath(`/reviews/${arg.id}`), {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
};
export const useRemoveReview = () => {
  return useSWRMutation(getApiPath(`/reviews/:id`), removeReviewFetcher);
};

// FindAllReviewsByBookIdResponse
export const useFindAllReviewsByBookId = (id: FrontBook["id"]) => {
  // TODO: 考える。現状パラメータの有無でfindOneFetcherとfindAllFetcherを作っているが、意味や使い方と合致しなくなる。。ちょっとSWRの共通fetcher作るのイマイチか？
  return useSWR(
    getApiPath(`/books/${id}/reviews`),
    findOneFetcher<FindAllReviewsByBookIdResponse>,
  );
};
