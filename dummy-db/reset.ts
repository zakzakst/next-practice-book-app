import { books } from "./book";
import { favorites } from "./favorite";
import { reviews } from "./review";
import { users } from "./user";

// サーバー起動時の初期状態をディープコピーして保存しておく
const initialBooks = JSON.parse(JSON.stringify(books));
const initialFavorites = JSON.parse(JSON.stringify(favorites));
const initialReviews = JSON.parse(JSON.stringify(reviews));
const initialUsers = JSON.parse(JSON.stringify(users));

export const resetDummyDb = () => {
  // 配列の参照を維持したまま中身を初期状態に入れ替える
  books.splice(0, books.length, ...JSON.parse(JSON.stringify(initialBooks)));
  favorites.splice(
    0,
    favorites.length,
    ...JSON.parse(JSON.stringify(initialFavorites)),
  );
  reviews.splice(
    0,
    reviews.length,
    ...JSON.parse(JSON.stringify(initialReviews)),
  );
  users.splice(0, users.length, ...JSON.parse(JSON.stringify(initialUsers)));
};
