"use client";

import { Book } from "@/types/domain/book";

type ItemProps = {
  book: Book;
};

export const BooksListItem = ({ book }: ItemProps) => {
  return <div>BooksListItem</div>;
};

type Props = {
  items: Book[];
};

export const BooksList = ({ items }: Props) => {
  return <div>BooksList</div>;
};
