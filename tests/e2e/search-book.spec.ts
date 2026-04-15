/**
 * テスト内容
 * ユーザーが書籍を検索して情報を確認する
 */
import { expect, test } from "@playwright/test";

test("書籍一覧で書籍を選択すると詳細が確認できる", async ({ page }) => {
  // Arrange
  await page.goto("http://localhost:3000");
  const link = await page.waitForSelector('[data-testid="books-list-link-1"]');

  // Act
  await link.click();

  // Assert
  await expect(page).toHaveURL("http://localhost:3000/books/1");
});

test("書籍一覧でページ移動して書籍を探せる", async ({ page }) => {
  // Arrange
  await page.goto("http://localhost:3000");

  // ===== 次へボタンの挙動確認 =====
  // Act
  const nextButton = await page.waitForSelector(
    '[data-testid="button-pagination-button-next"]',
  );
  await nextButton.click();

  // Assert
  await expect(page.getByText("羊をめぐる冒険")).toBeVisible();

  // ===== 前へボタンの挙動確認 =====
  // Act
  const prevButton = await page.waitForSelector(
    '[data-testid="button-pagination-button-prev"]',
  );
  await prevButton.click();

  // Assert
  await expect(page.getByText("深夜特急")).toBeVisible();

  // ===== ページ指定の挙動確認 =====
  // Act
  const page3Button = await page.waitForSelector(
    '[data-testid="button-pagination-button-3"]',
  );
  await page3Button.click();

  // Assert
  await expect(page.getByText("アヒルと鴨のコインロッカー")).toBeVisible();
});

test("書籍一覧でキーワード絞り込みして書籍を探せる", async ({ page }) => {
  // Arrange
  await page.goto("http://localhost:3000");
  const input = await page.locator('[data-testid="search-input-input"]');
  const submitButton = await page.locator(
    '[data-testid="search-input-submit-button"]',
  );

  // ===== キーワード絞り込みの挙動確認 =====
  // Act
  await input.fill("夜");
  await submitButton.click();

  // Assert
  await expect(page.getByText("夜のピクニック")).toBeVisible();

  // ===== キーワード絞り込み変更の挙動確認 =====
  // Act
  await input.fill("社会");
  await submitButton.click();

  // Assert
  await expect(page.getByText("コンビニ人間")).toBeVisible();

  // ===== キーワード絞り込みクリアの挙動確認 =====
  // Act
  const clearButton = await page.waitForSelector(
    '[data-testid="search-input-clear-button"]',
  );
  await clearButton.click();

  // Assert
  await expect(input).toHaveAttribute("value", "");
});
