import { BookDetail } from "@/components/features/books/BookDetail";
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

describe("BookDetail", () => {
  test("渡されたデータに対応した内容が表示される", () => {
    // Arrange
    render(<BookDetail book={DummyBooks[1]} />);
    const thumbnail = screen.getByRole("img");

    // Assert
    expect(screen.getByText("コンビニ人間")).toBeInTheDocument();
    expect(screen.getByText("村田沙耶香")).toBeInTheDocument();
    expect(
      screen.getByText(
        "コンビニで暮らす女性の視点から、社会の常識と個性の関係を鮮やかに描いた現代小説。",
      ),
    ).toBeInTheDocument();
    expect(thumbnail).toHaveAttribute(
      "src",
      "https://placehold.jp/800x450.png?text=コンビニ人間の書影",
    );
    expect(thumbnail).toHaveAttribute("alt", "コンビニ人間の書影");
  });

  test("書影なしのデータの場合、書影なしの画像が表示される", () => {
    // Arrange
    render(<BookDetail book={DummyBooks[0]} />);
    const thumbnail = screen.getByRole("img");

    // Assert
    expect(thumbnail).toHaveAttribute(
      "src",
      "https://placehold.jp/800x450.png?text=No+Image",
    );
    expect(thumbnail).toHaveAttribute("alt", "登録された書影がありません");
  });
});
