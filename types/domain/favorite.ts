import { Book } from "./book";
import { User } from "./user";

export type Favorite = {
  id: number;
  bookId: Book["id"];
  userId: User["id"];
  // 論理削除やってみたかったが、最初はシンプルに進めたいので対応しない（※createdAtとupdatedAtは利用されないがお作法的に残しておく）
  // state: boolean;
  createdAt: string;
  updatedAt: string;
};
