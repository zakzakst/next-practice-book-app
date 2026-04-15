import { BooksList } from "@/components/features/books/BooksList";
import { Book } from "@/types/domain/book";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

const DummyBooks: Book[] = [
  {
    id: 1,
    title: "深夜特急",
    author: "沢木耕太郎",
    description:
      "アジアからヨーロッパへと旅するバックパッカーの体験を綴った紀行文。旅の自由と出会いが描かれる名著。",
    // thumbnail: "https://placehold.jp/800x450.png?text=No+Image",
    createdAt: "2024-01-15T10:00:00.000Z",
    updatedAt: "2024-01-15T10:00:00.000Z",
  },
  {
    id: 2,
    title: "コンビニ人間",
    author: "村田沙耶香",
    description:
      "コンビニで暮らす女性の視点から、社会の常識と個性の関係を鮮やかに描いた現代小説。",
    thumbnail: "https://placehold.jp/800x450.png?text=コンビニ人間の書影",
    createdAt: "2024-02-01T12:30:00.000Z",
    updatedAt: "2024-02-01T12:30:00.000Z",
  },
];

describe("BooksList", () => {
  test("渡された書籍データに対応した内容が表示される", () => {
    // Arrange
    render(<BooksList items={DummyBooks} />);
    const bookItems = screen.queryAllByRole("listitem");

    // Assert
    expect(screen.getByText("深夜特急")).toBeInTheDocument();
    expect(screen.getByText("沢木耕太郎")).toBeInTheDocument();
    expect(bookItems[0].querySelector("a")).toHaveAttribute("href", "/books/1");
    expect(bookItems[0].querySelector("img")).toHaveAttribute(
      "src",
      "https://placehold.jp/150x150.png?text=No+Image",
    );
    expect(bookItems[0].querySelector("img")).toHaveAttribute(
      "alt",
      "登録された書影がありません",
    );

    // 書影ありの場合の表示を確認
    expect(bookItems[1].querySelector("img")).toHaveAttribute(
      "src",
      "https://placehold.jp/800x450.png?text=コンビニ人間の書影",
    );
    expect(bookItems[1].querySelector("img")).toHaveAttribute(
      "alt",
      "コンビニ人間の書影",
    );
  });

  test("渡された書籍データがない場合、「書籍が見つかりません」と表示される", () => {
    // Arrange
    render(<BooksList items={[]} />);

    // Assert
    expect(screen.getByText("書籍が見つかりません")).toBeInTheDocument();
  });
});
