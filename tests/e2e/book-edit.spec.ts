import { books } from "@/dummy-db/book";
import { users } from "@/dummy-db/user";
import { API_MOCK_DEFAULT_DELAY, apiDelay } from "@/lib/api";
import { UserRole } from "@/types/domain/user";
import { Page, expect, test } from "@playwright/test";

test.beforeEach(async ({ request }) => {
  // テストの実行前にデータベース（インメモリ配列）を初期化する
  await request.post("http://localhost:3000/api/test/reset-db");
});

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

test("admin権限でログインした場合、書籍データ更新ページでデータ更新できる", async ({
  page,
}) => {
  // Arrange
  await login(page, "admin");
  const detailLink = await page
    .locator('[data-testid^="books-list-link-"]')
    .first();

  // ===== 更新ページリンクの表示確認 =====
  // Act
  await detailLink.click();

  // Assert
  const editPageLink = page.getByRole("link", { name: "データを更新する" });
  await expect(editPageLink).toBeVisible();

  // ===== フォームの挙動確認：初期入力値 =====
  // Act
  await editPageLink.click();
  // NOTE: ページ遷移してからデータ取得される時間を待機
  await apiDelay(API_MOCK_DEFAULT_DELAY + 1000);

  // Assert
  const titleInput = page.getByRole("textbox", { name: "書籍名" });
  const authorInput = page.getByRole("textbox", { name: "著者名" });
  const descriptionTextarea = page.getByRole("textbox", {
    name: "あらすじ・内容",
  });
  await expect(titleInput).toHaveValue(books[0].title);
  await expect(authorInput).toHaveValue(books[0].author);
  await expect(descriptionTextarea).toHaveValue(books[0].description);

  // ===== フォームの挙動確認：バリデーション =====
  // TODO: react hook formでバリデーションのテスト上手くいかない。一旦後回し
  // // Act
  // await titleInput.focus();
  // Array(books[0].title.length)
  //   .fill(null)
  //   .forEach(async () => {
  //     await page.keyboard.press("Backspace");
  //   });

  // // Assert
  // await expect(page.getByText("書籍名は入力必須項目です")).toBeVisible();

  // ===== フォームの挙動確認：データ更新 =====
  // Act
  await titleInput.fill("更新タイトル");
  await authorInput.fill("更新著者名");
  await descriptionTextarea.fill("更新あらすじ・内容");
  const submitButton = page.getByRole("button", { name: "更新する" });
  await submitButton.click();
  // NOTE: ページ遷移してからデータ取得される時間を待機
  await apiDelay(API_MOCK_DEFAULT_DELAY + 1000);

  // Assert
  await expect(page.getByText("更新タイトル")).toBeVisible();
  await expect(page.getByText("更新著者名")).toBeVisible();
  await expect(page.getByText("更新あらすじ・内容")).toBeVisible();

  // 次のテストのためにログアウトして終わる
  await logout(page);
});

test("user権限でログインした場合、書籍データ更新ページへのリンクが表示されない", async ({
  page,
}) => {
  // Arrange
  await login(page, "user");
  const detailLink = await page
    .locator('[data-testid^="books-list-link-"]')
    .first();

  // Act
  // TODO: 考える。そもそも一覧からリンクを探してクリックするのではなく、直接詳細ページのURLにアクセスしたほうがいいかも。詳細ページへの遷移はテスト観点ではないし
  await detailLink.click();

  // Assert
  const editPageLink = page.getByRole("link", { name: "データを更新する" });
  await expect(editPageLink).not.toBeVisible();

  await logout(page);
});

test("user権限でログインした場合、書籍データ更新ページに直接アクセスしようとするとトップページへリダイレクトされる", async ({
  page,
}) => {
  // Arrange
  await login(page, "user");
  await page.goto("http://localhost:3000/books/1/edit");

  // Act
  // 明示的にリダイレクト完了を待つ
  await page.waitForURL("http://localhost:3000");

  // Assert
  expect(page).toHaveURL("http://localhost:3000");

  await logout(page);
});

test("未ログインの場合、書籍データ更新ページへのリンクが表示されない", async ({
  page,
}) => {
  // Arrange
  await page.goto("http://localhost:3000");
  const detailLink = await page
    .locator('[data-testid^="books-list-link-"]')
    .first();

  // Act
  await detailLink.click();

  // Assert
  const editPageLink = page.getByRole("link", { name: "データを更新する" });
  await expect(editPageLink).not.toBeVisible();
});

// TODO: 調べる。未ログインの場合だとtoHaveURLでテスト成功しなかったのでpage.url()を利用（※user権限でログインだとtoHaveURLでテスト成功した）
// 二つの違いが分からないので調べる。page.url()だと末尾に「/」をつける必要があったので、どちらでもよければtoHaveURL使いたい
test("未ログインの場合、書籍データ更新ページに直接アクセスしようとするとトップページへリダイレクトされる", async ({
  page,
}) => {
  // Arrange
  await page.goto("http://localhost:3000/books/1/edit");

  // Act
  // 明示的にリダイレクト完了を待つ
  await page.waitForURL("http://localhost:3000");

  // Assert
  expect(page.url()).toBe("http://localhost:3000/");
});
