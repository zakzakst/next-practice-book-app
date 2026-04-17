import { getApiPath } from "@/lib/api";
import { FrontBook } from "@/types/api/books";
import {
  DeleteFavoriteResponse,
  PostFavoriteResponse,
} from "@/types/api/favorites";
import useSWRMutation from "swr/mutation";

// Post
const postBookFavoriteFetcher = (
  _url: string,
  { arg }: { arg: { id: FrontBook["id"] } },
) => {
  return fetch(getApiPath(`/books/${arg.id}/favorite`), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json() as Promise<PostFavoriteResponse>);
};

export const usePostBookFavorite = () => {
  return useSWRMutation(
    getApiPath(`/books/:id/favorite`),
    postBookFavoriteFetcher,
  );
};

// Delete
const deleteBookFavoriteFetcher = (
  _url: string,
  { arg }: { arg: { id: FrontBook["id"] } },
) => {
  return fetch(getApiPath(`/books/${arg.id}/favorite`), {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json() as Promise<DeleteFavoriteResponse>);
};

export const useDeleteBookFavorite = () => {
  return useSWRMutation(
    getApiPath(`/books/:id/favorite`),
    deleteBookFavoriteFetcher,
  );
};
