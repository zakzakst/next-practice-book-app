import { BooksList } from "@/components/features/books/BooksList";
import { useAuth } from "@/contexts/AuthContext";
import { users } from "@/dummy-db/user";
import { FrontBook } from "@/types/api/books";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

vi.mock("@/contexts/AuthContext");

const DummyBooks: FrontBook[] = [
  {
    id: 1,
    title: "深夜特急",
    author: "沢木耕太郎",
    description:
      "アジアからヨーロッパへと旅するバックパッカーの体験を綴った紀行文。旅の自由と出会いが描かれる名著。",
    // thumbnail: "https://placehold.jp/800x450.png?text=No+Image",
    createdAt: "2024-01-15T10:00:00.000Z",
    updatedAt: "2024-01-15T10:00:00.000Z",
    favorite: {
      count: 0,
      state: false,
    },
    reviews: {
      count: 0,
      state: false,
    },
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
    favorite: {
      count: 8,
      state: true,
    },
    reviews: {
      count: 6,
      state: true,
    },
  },
];

describe("BooksList", () => {
  test("渡された書籍データに対応した内容が表示される", () => {
    // Arrange
    vi.mocked(useAuth).mockReturnValue({
      me: null,
      isLoading: false,
      isMutating: false,
      meMutate: vi.fn(),
      logout: vi.fn(),
    });
    render(<BooksList items={DummyBooks} onUpdateFavorite={() => {}} />);
    const bookItems = screen.queryAllByRole("listitem");

    // Assert
    expect(screen.getByText("深夜特急")).toBeInTheDocument();
    expect(screen.getByText("沢木耕太郎")).toBeInTheDocument();
    expect(bookItems[0].querySelector("a")).toHaveAttribute("href", "/books/1");
    expect(bookItems[0].querySelector("img")).toHaveAttribute(
      "src",
      "https://placehold.jp/800x450.png?text=No+Image",
    );
    expect(bookItems[0].querySelector("img")).toHaveAttribute(
      "alt",
      "登録された書影がありません",
    );
    expect(screen.getByTestId("book-list-favorite-count-2")).toHaveTextContent(
      "8",
    );
    expect(screen.getByTestId("book-list-reviews-count-2")).toHaveTextContent(
      "6",
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
    vi.mocked(useAuth).mockReturnValue({
      me: null,
      isLoading: false,
      isMutating: false,
      meMutate: vi.fn(),
      logout: vi.fn(),
    });
    render(<BooksList items={[]} onUpdateFavorite={() => {}} />);

    // Assert
    expect(screen.getByText("書籍が見つかりません")).toBeInTheDocument();
  });

  test("未ログインの場合、お気に入りボタンが表示されない", () => {
    // Arrange
    vi.mocked(useAuth).mockReturnValue({
      me: null,
      isLoading: false,
      isMutating: false,
      meMutate: vi.fn(),
      logout: vi.fn(),
    });
    render(<BooksList items={DummyBooks} onUpdateFavorite={() => {}} />);
    const favoriteButton = screen.queryByTestId("books-list-favorite-button-1");

    // Assert
    expect(favoriteButton).not.toBeInTheDocument();
  });

  test("お気に入りボタンが正しく挙動する", async () => {
    // Arrange
    vi.mocked(useAuth).mockReturnValue({
      me: users[0],
      isLoading: false,
      isMutating: false,
      meMutate: vi.fn(),
      logout: vi.fn(),
    });
    const updateFavoriteMock = vi.fn();
    render(
      <BooksList items={DummyBooks} onUpdateFavorite={updateFavoriteMock} />,
    );
    const favoriteButton = screen.getByTestId("books-list-favorite-button-1");

    // Act
    await userEvent.click(favoriteButton);

    // Assert
    expect(updateFavoriteMock).toHaveBeenCalledWith(DummyBooks[0]);
  });
});
