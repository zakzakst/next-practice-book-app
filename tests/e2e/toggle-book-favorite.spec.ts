/**
 * テスト内容
 * ユーザーが書籍をお気に入り登録・解除する
 */
import { users } from "@/dummy-db/user";
import { API_MOCK_DEFAULT_DELAY, apiDelay } from "@/lib/api";
import { UserRole } from "@/types/domain/user";
import { Page, expect, test } from "@playwright/test";

const login = async (page: Page, role: UserRole) => {
  await page.goto("http://localhost:3000/login");
  const emailInput = page.getByRole("textbox", { name: "メールアドレス" });
  const passwordInput = page.getByRole("textbox", { name: "パスワード" });
  const submitButton = page.getByRole("button", { name: "ログイン" });

  if (role === "admin") {
    await emailInput.pressSequentially(users[0].email);
    await passwordInput.pressSequentially(users[0].password);
  } else {
    await emailInput.pressSequentially(users[1].email);
    await passwordInput.pressSequentially(users[1].password);
  }

  await submitButton.click();
  await apiDelay(API_MOCK_DEFAULT_DELAY + 1000);
};

const logout = async (page: Page) => {
  const logoutButton = page.getByRole("button", { name: "ログアウト" });

  await logoutButton.click();
  await apiDelay(API_MOCK_DEFAULT_DELAY + 1000);
};

test("お気に入り登録・解除ボタンが正しく挙動する（一覧ページ）", async ({
  page,
}) => {
  // Arrange
  await login(page, "user");
  const favoriteButton = await page
    .locator('[data-testid^="books-list-favorite-button-"]')
    .first();

  // Assert
  await expect(favoriteButton).toHaveText("お気に入り登録");

  // ===== お気に入り登録の挙動確認 =====
  // Act
  await favoriteButton.click();
  // NOTE: お気に入り登録APIと一覧データ取得APIの実行時間分待機
  await apiDelay(API_MOCK_DEFAULT_DELAY * 2);

  // Assert
  await expect(favoriteButton).toHaveText("お気に入り解除");

  // ===== お気に入り解除の挙動確認 =====
  // Act
  await favoriteButton.click();
  // NOTE: お気に入り解除APIと一覧データ取得APIの実行時間分待機
  await apiDelay(API_MOCK_DEFAULT_DELAY * 2);

  // Assert
  await expect(favoriteButton).toHaveText("お気に入り登録");

  // 次のテストのためにログアウトして終わる
  await logout(page);
});

test("お気に入り登録・解除ボタンが正しく挙動する（詳細ページ）", async ({
  page,
}) => {
  // Arrange
  await login(page, "user");
  await page.goto("http://localhost:3000/books/1");
  const favoriteButton = await page
    .locator('[data-testid="book-detail-favorite-button"]')
    .first();

  // Assert
  await expect(favoriteButton).toHaveText("お気に入り登録");

  // ===== お気に入り登録の挙動確認 =====
  // Act
  await favoriteButton.click();
  // NOTE: お気に入り登録APIと一覧データ取得APIの実行時間分待機
  await apiDelay(API_MOCK_DEFAULT_DELAY * 2);

  // Assert
  await expect(favoriteButton).toHaveText("お気に入り解除");

  // ===== お気に入り解除の挙動確認 =====
  // Act
  await favoriteButton.click();
  // NOTE: お気に入り解除APIと一覧データ取得APIの実行時間分待機
  await apiDelay(API_MOCK_DEFAULT_DELAY * 2);

  // Assert
  await expect(favoriteButton).toHaveText("お気に入り登録");

  // 次のテストのためにログアウトして終わる
  await logout(page);
});

test("未ログインの場合、お気に入り登録ボタンが表示されない（一覧ページ）", async ({
  page,
}) => {
  // Arrange
  await page.goto("http://localhost:3000");
  const favoriteButton = await page
    .locator('[data-testid^="books-list-favorite-button-"]')
    .first();

  // Assert
  await expect(favoriteButton).not.toBeVisible();
});

test("未ログインの場合、お気に入り登録ボタンが表示されない（詳細ページ）", async ({
  page,
}) => {
  // Arrange
  await page.goto("http://localhost:3000/books/1");
  const favoriteButton = await page
    .locator('[data-testid="book-detail-favorite-button"]')
    .first();

  // Assert
  await expect(favoriteButton).not.toBeVisible();
});
