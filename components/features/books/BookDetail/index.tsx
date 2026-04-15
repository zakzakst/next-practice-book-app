"use client";

import { Separator } from "@/components/ui/separator";
import { Book } from "@/types/domain/book";

type Props = {
  book: Book;
};

export const BookDetail = ({ book }: Props) => {
  return (
    <div className="grid grid-cols-[240px_1fr] gap-4">
      <div>
        <img
          className="aspect-video h-full w-full object-cover"
          src={
            book?.thumbnail || "https://placehold.jp/800x450.png?text=No+Image"
          }
          alt={
            book?.thumbnail
              ? `${book.title}の書影`
              : "登録された書影がありません"
          }
        />
      </div>
      <div>
        <div>
          <h1 className="text-2xl font-bold">{book.title}</h1>
          <p>{book.author}</p>
        </div>
        <Separator className="my-6" />
        <div>
          <h2 className="text-xl font-bold">あらすじ・内容</h2>
          <p>{book.description}</p>
        </div>
      </div>
    </div>
  );
};
