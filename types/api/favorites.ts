// TODO: REST APIでないものとの命名の区別の方法考える
// import { User } from "@/types/domain/user";

// POST
// NOTE: ログイン情報から判断する実装にしたので不要
// export type PostFavoriteRequest = {
//   userId: User["id"];
// };

export type PostFavoriteResponse = {
  count: number;
};

// DELETE
// NOTE: ログイン情報から判断する実装にしたので不要
// export type DeleteFavoriteRequest = {
//   userId: User["id"];
// };

export type DeleteFavoriteResponse = {
  count: number;
};
