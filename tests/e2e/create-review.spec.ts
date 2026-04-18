/**
 * テスト内容
 * ユーザーがレビューを投稿・編集・確認・削除する
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

test("レビュー未登録の書籍にレビューを投稿する", async ({ page }) => {
  // Arrange
  await login(page, "user");
  await page.goto("http://localhost:3000/books/5");
  await apiDelay();
  const createReviewButton = await page
    .locator('[data-testid="book-detail-create-review-button"]')
    .first();

  // Act
  await createReviewButton.click();
  const textarea = await page.locator("textarea").first();
  await textarea.fill("コメント入力");
  await page.keyboard.press("Tab");
  const submitButton = await page
    .locator('[data-testid="review-create-form-submit-button"]')
    .first();
  await submitButton.click();
  // 明示的にレビュー登録後のリダイレクト完了を待つ
  await page.waitForURL("http://localhost:3000/books/5");

  // Assert
  expect(page).toHaveURL("http://localhost:3000/books/5");
  await apiDelay(API_MOCK_DEFAULT_DELAY + 1000);
  expect(page.getByText("コメント入力")).toBeVisible();

  await logout(page);
});

test("登録済のレビューを編集する", async ({ page }) => {
  // Arrange
  await login(page, "user");
  await page.goto("http://localhost:3000/books/2");
  await apiDelay();
  const editReviewButton = await page
    .locator('[data-testid="book-detail-edit-review-button"]')
    .first();

  // Act
  await editReviewButton.click();
  const textarea = await page.locator("textarea").first();
  await textarea.fill("コメント入力");
  await page.keyboard.press("Tab");
  const submitButton = await page
    .locator('[data-testid="review-create-form-submit-button"]')
    .first();
  await submitButton.click();
  // 明示的にレビュー登録後のリダイレクト完了を待つ
  await page.waitForURL("http://localhost:3000/books/2");

  // Assert
  expect(page).toHaveURL("http://localhost:3000/books/2");
  await apiDelay(API_MOCK_DEFAULT_DELAY + 1000);
  expect(page.getByText("コメント入力")).toBeVisible();

  await logout(page);
});

test("登録済のレビューを削除する", async ({ page }) => {
  // Arrange
  await login(page, "user");
  await page.goto("http://localhost:3000/books/2");
  await apiDelay();

  // Assert
  const deleteReviewButton = await page
    .locator('[data-testid^="reviews-list-delete-button-"]')
    .first();
  expect(deleteReviewButton).toBeVisible();

  // Act
  await deleteReviewButton.click();
  await apiDelay(API_MOCK_DEFAULT_DELAY + 1000);

  // Assert
  expect(deleteReviewButton).not.toBeVisible();

  await logout(page);
});
