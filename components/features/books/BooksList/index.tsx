"use client";

import Link from "next/link";

import {
  Card,
  CardContent,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Book } from "@/types/domain/book";

type Props = {
  items: Book[];
};

export const BooksList = ({ items }: Props) => {
  if (!items.length) return <p className="text-center">書籍が見つかりません</p>;

  return (
    <ul className="grid grid-cols-3 gap-4">
      {items.map((item) => (
        <li key={item.id}>
          <Link
            href={`/books/${item.id}`}
            className="block h-full"
            data-testid={`books-list-link-${item.id}`}
          >
            <article className="h-full">
              <Card className="h-full pt-0 duration-300 hover:shadow-lg">
                <div>
                  <img
                    className="aspect-video h-full w-full object-cover"
                    src={
                      item?.thumbnail ||
                      "https://placehold.jp/800x450.png?text=No+Image"
                    }
                    alt={
                      item?.thumbnail
                        ? `${item.title}の書影`
                        : "登録された書影がありません"
                    }
                  />
                </div>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{item.author}</p>
                </CardContent>
                {/* NOTE: 後で評価情報を足した時にここにお気に入りボタンと評価数とレビュー数を表示する */}
                {/* <CardFooter className="mt-auto">
                  <p></p>
                </CardFooter> */}
              </Card>
            </article>
          </Link>
        </li>
      ))}
    </ul>
  );
};
