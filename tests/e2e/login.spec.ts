import { users } from "@/dummy-db/user";
import { API_MOCK_DEFAULT_DELAY, apiDelay } from "@/lib/api";
import { expect, test } from "@playwright/test";

test("ログインページの挙動", () => {
  test("ログイン成功したらトップページに遷移する", async ({ page }) => {
    await page.goto("http://localhost:3000/login");
    const emailInput = page.getByRole("textbox", { name: "メールアドレス" });
    const passwordInput = page.getByRole("textbox", { name: "パスワード" });
    const submitButton = page.getByRole("button", { name: "ログイン" });

    // TODO: テンプレートのほうにも反映
    // NOTE: 基本的には「fill」を利用したほうがいいとのことだが、バリデーションが通らなかったので、「pressSequentially」を利用
    // https://playwright.dev/docs/input#type-characters
    await emailInput.pressSequentially(users[0].email);
    await passwordInput.pressSequentially(users[0].password);
    // await emailInput.fill(users[0].email);
    // await passwordInput.fill(users[0].password);

    await submitButton.click();
    await apiDelay(API_MOCK_DEFAULT_DELAY + 1000);

    await expect(page).toHaveURL("http://localhost:3000");
  });
});
