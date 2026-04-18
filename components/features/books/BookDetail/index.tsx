"use client";

import { useCallback } from "react";

import Link from "next/link";

import { ReviewsList } from "../../reviews/ReviewsList";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { FrontBook } from "@/types/api/books";
import { FrontReview } from "@/types/api/reviews";

type Props = {
  book: FrontBook;
  onUpdateFavorite: (book: FrontBook) => void;
  // TODO: 考える。APIがごちゃつきそうなので書籍詳細データとレビューデータのAPIを分けた、一旦バケツリレーで対応するが、APIの設計を見直す必要もあるかも
  reviews: FrontReview[];
  onDeleteReview: (review: FrontReview) => void;
};

export const BookDetail = ({
  book,
  onUpdateFavorite,
  reviews,
  onDeleteReview,
}: Props) => {
  const { me } = useAuth();

  const handleUpdateFavorite = useCallback(
    (book: FrontBook) => {
      onUpdateFavorite(book);
    },
    [onUpdateFavorite],
  );

  return (
    <div className="grid grid-cols-[240px_1fr] gap-4">
      <div className="flex flex-col gap-2">
        <div>
          <img
            className="aspect-video h-full w-full object-cover"
            src={
              book?.thumbnail ||
              "https://placehold.jp/800x450.png?text=No+Image"
            }
            alt={
              book?.thumbnail
                ? `${book.title}の書影`
                : "登録された書影がありません"
            }
            loading="lazy"
          />
        </div>
        {me && (
          <>
            <div>
              <Button
                onClick={() => handleUpdateFavorite(book)}
                className="w-full"
                data-testid="book-detail-favorite-button"
              >
                {book.favorite.state ? "お気に入り解除" : "お気に入り登録"}
              </Button>
            </div>
            {book.reviews.state ? (
              <div>
                <Button className="w-full" asChild>
                  {/* TODO: 考える。レビュー編集ページのURL自信ない。。（bookIdではなくreview自体のidを指定するほうが適切ではないか？ ※/reviews/edit/[reviewId]的な）考えまとまらないので一旦作ってみる */}
                  <Link
                    href={`/reviews/edit?bookId=${book.id}`}
                    data-testid="book-detail-edit-review-button"
                  >
                    レビューを編集
                  </Link>
                </Button>
              </div>
            ) : (
              <div>
                <Button className="w-full" asChild>
                  <Link
                    href={`/reviews/create?bookId=${book.id}`}
                    data-testid="book-detail-create-review-button"
                  >
                    レビューを書く
                  </Link>
                </Button>
              </div>
            )}
          </>
        )}
      </div>
      <div>
        <div>
          <h1 className="text-2xl font-bold">{book.title}</h1>
          <p>{book.author}</p>
          <p>お気に入り登録した人数：{book.favorite.count}</p>
          <p>レビュー数：{book.reviews.count}</p>
        </div>
        <Separator className="my-6" />
        <div className="grid grid-cols-1 gap-2">
          <h2 className="text-xl font-bold">あらすじ・内容</h2>
          <p>{book.description}</p>
        </div>
        <Separator className="my-6" />
        <div className="grid grid-cols-1 gap-2">
          <h2 className="text-xl font-bold">レビュー</h2>
          <ReviewsList items={reviews} onDeleteReview={onDeleteReview} />
        </div>
      </div>
    </div>
  );
};
