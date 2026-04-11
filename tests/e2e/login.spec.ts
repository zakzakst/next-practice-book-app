import { users } from "@/dummy-db/user";
import { expect, test } from "@playwright/test";

test("ログイン成功したらトップページに遷移する", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  const emailInput = page.getByRole("textbox", { name: "メールアドレス" });
  const passwordInput = page.getByRole("textbox", { name: "パスワード" });
  const submitButton = page.getByRole("button", { name: "ログイン" });

  await emailInput.fill(users[0].email);
  await passwordInput.fill(users[0].password);
  await submitButton.click();

  await expect(page).toHaveURL("http://localhost:3000");
});
