import { BookDetail } from "@/components/features/books/BookDetail";
import { useAuth } from "@/contexts/AuthContext";
import { users } from "@/dummy-db/user";
import { FrontBook } from "@/types/api/books";
import { FrontReview } from "@/types/api/reviews";
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
    },
  },
];

const DummyReviews: FrontReview[] = [
  {
    id: 1,
    bookId: 1,
    userId: 1,
    rating: 5,
    comment: "とても面白かったです！！",
    createdAt: "2024-01-15T10:00:00.000Z",
    updatedAt: "2024-01-15T10:00:00.000Z",
    user: {
      id: 1,
      name: "Taro Yamada",
      email: "taro@example.com",
      roles: ["user", "admin"],
      createdAt: "2026-04-01T08:00:00.000Z",
      updatedAt: "2026-04-01T08:00:00.000Z",
    },
  },
  {
    id: 3,
    bookId: 1,
    userId: 2,
    rating: 3,
    comment: "登場人物に共感できました",
    createdAt: "2024-10-15T10:00:00.000Z",
    updatedAt: "2024-10-15T10:00:00.000Z",
    user: {
      id: 2,
      name: "Hanako Suzuki",
      email: "hanako@example.com",
      roles: ["user"],
      createdAt: "2026-04-02T09:30:00.000Z",
      updatedAt: "2026-04-02T09:30:00.000Z",
    },
  },
];

describe("BookDetail", () => {
  test("渡されたデータに対応した内容が表示される", () => {
    // Arrange
    vi.mocked(useAuth).mockReturnValue({
      me: null,
      isLoading: false,
      isMutating: false,
      meMutate: vi.fn(),
      logout: vi.fn(),
    });
    render(
      <BookDetail
        book={DummyBooks[1]}
        reviews={DummyReviews}
        onUpdateFavorite={() => {}}
        onDeleteReview={() => {}}
      />,
    );
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
    expect(screen.getByText("お気に入り登録した人数：8")).toBeInTheDocument();
    expect(screen.getByText("レビュー数：6")).toBeInTheDocument();
    expect(screen.getByText("とても面白かったです！！")).toBeInTheDocument();
  });

  test("書影なしのデータの場合、書影なしの画像が表示される", () => {
    // Arrange
    vi.mocked(useAuth).mockReturnValue({
      me: null,
      isLoading: false,
      isMutating: false,
      meMutate: vi.fn(),
      logout: vi.fn(),
    });
    render(
      <BookDetail
        book={DummyBooks[0]}
        reviews={[]}
        onUpdateFavorite={() => {}}
        onDeleteReview={() => {}}
      />,
    );
    const thumbnail = screen.getByRole("img");

    // Assert
    expect(thumbnail).toHaveAttribute(
      "src",
      "https://placehold.jp/800x450.png?text=No+Image",
    );
    expect(thumbnail).toHaveAttribute("alt", "登録された書影がありません");
  });

  test("未ログインの場合、お気に入りボタンとレビューボタンが表示されない", () => {
    // Arrange
    vi.mocked(useAuth).mockReturnValue({
      me: null,
      isLoading: false,
      isMutating: false,
      meMutate: vi.fn(),
      logout: vi.fn(),
    });
    render(
      <BookDetail
        book={DummyBooks[0]}
        reviews={[]}
        onUpdateFavorite={() => {}}
        onDeleteReview={() => {}}
      />,
    );
    const favoriteButton = screen.queryByTestId("book-detail-favorite-button");
    const reviewButton = screen.queryByRole("link", { name: "レビューを書く" });

    // Assert
    expect(favoriteButton).not.toBeInTheDocument();
    expect(reviewButton).not.toBeInTheDocument();
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
      <BookDetail
        book={DummyBooks[0]}
        reviews={[]}
        onUpdateFavorite={updateFavoriteMock}
        onDeleteReview={() => {}}
      />,
    );
    const favoriteButton = screen.getByTestId("book-detail-favorite-button");

    // Act
    await userEvent.click(favoriteButton);

    // Assert
    expect(updateFavoriteMock).toHaveBeenCalledWith(DummyBooks[0]);
  });

  test("レビューボタンのリンクが正しく設定される", () => {
    // Arrange
    vi.mocked(useAuth).mockReturnValue({
      me: users[0],
      isLoading: false,
      isMutating: false,
      meMutate: vi.fn(),
      logout: vi.fn(),
    });
    render(
      <BookDetail
        book={DummyBooks[0]}
        reviews={[]}
        onUpdateFavorite={() => {}}
        onDeleteReview={() => {}}
      />,
    );
    const reviewButton = screen.getByRole("link", { name: "レビューを書く" });

    // Assert
    expect(reviewButton).toHaveAttribute("href", "/reviews/create?bookId=1");
  });

  test("自身が投稿したレビューのみ削除ボタンが表示される", () => {
    // Arrange
    vi.mocked(useAuth).mockReturnValue({
      me: users[0],
      isLoading: false,
      isMutating: false,
      meMutate: vi.fn(),
      logout: vi.fn(),
    });
    render(
      <BookDetail
        book={DummyBooks[0]}
        reviews={DummyReviews}
        onUpdateFavorite={() => {}}
        onDeleteReview={() => {}}
      />,
    );
    const myReviewDeleteButton = screen.getByTestId(
      "reviews-list-delete-button-1",
    );
    const othersReviewDeleteButton = screen.queryByTestId(
      "reviews-list-delete-button-3",
    );

    // Assert
    expect(myReviewDeleteButton).toBeInTheDocument();
    expect(othersReviewDeleteButton).not.toBeInTheDocument();
  });

  test("削除ボタンが正しく挙動する", async () => {
    // Arrange
    vi.mocked(useAuth).mockReturnValue({
      me: users[0],
      isLoading: false,
      isMutating: false,
      meMutate: vi.fn(),
      logout: vi.fn(),
    });
    const deleteReviewMock = vi.fn();
    render(
      <BookDetail
        book={DummyBooks[0]}
        reviews={DummyReviews}
        onUpdateFavorite={() => {}}
        onDeleteReview={deleteReviewMock}
      />,
    );
    const myReviewDeleteButton = screen.getByTestId(
      "reviews-list-delete-button-1",
    );

    // Act
    await userEvent.click(myReviewDeleteButton);

    // Assert
    expect(deleteReviewMock).toHaveBeenCalledWith(DummyReviews[0]);
  });
});
