import { useRouter } from "next/navigation";

import { LoginForm } from "@/components/features/auth/LoginForm";
import { useAuth } from "@/contexts/AuthContext";
import { useAuthLogin } from "@/hooks/useAuth";
import { /* fireEvent, */ render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toast } from "sonner";
import { describe, expect, test, vi } from "vitest";

vi.mock("@/contexts/AuthContext");
vi.mock("@/hooks/useAuth");
vi.mock("sonner");
vi.mock("next/navigation");

describe("LoginForm", () => {
  test.each([
    ["valid.address@mail.com", "validPassword", true],
    ["invalid.address", "short", false],
  ])("バリデーションが正しく挙動する", async (email, password, result) => {
    const meMutateMock = vi.fn();
    const triggerMock = vi.fn(async () => ({ ok: true }));
    const toastMock = vi.fn();
    const pushMock = vi.fn();
    vi.mocked(useAuth).mockReturnValue({
      me: null,
      meMutate: async () => {},
      logout: meMutateMock,
      isLoading: false,
      isMutating: false,
    });
    vi.mocked(useAuthLogin).mockReturnValue({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- 一旦anyで回避
      trigger: triggerMock as any,
      reset: () => {},
      isMutating: false,
      data: undefined,
      error: null,
    });
    vi.mocked(toast).mockImplementation(toastMock);
    vi.mocked(useRouter).mockReturnValue({
      push: pushMock,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- 一旦anyで回避
    } as any);

    render(<LoginForm />);

    const emailInput = screen.getByRole("textbox", { name: "メールアドレス" });
    const passwordInput = screen.getByLabelText("パスワード");
    const submitButton = screen.getByRole("button", { name: "ログイン" });

    // NOTE: fireEventだとreact hook formのバリデーション処理が反映されなかったためuserEventを利用
    // await fireEvent.change(emailInput, {
    //   target: { value: "valid.address@mail.com" },
    // });
    // await fireEvent.change(passwordInput, {
    //   target: { value: "validPassword" },
    // });
    // await fireEvent.click(submitButton);

    expect(submitButton).toHaveAttribute("disabled");

    await userEvent.type(emailInput, email);
    await userEvent.type(passwordInput, password);
    await userEvent.click(submitButton);

    if (result) {
      expect(submitButton).not.toHaveAttribute("disabled");
      expect(triggerMock).toHaveBeenCalled();
    } else {
      expect(submitButton).toHaveAttribute("disabled");
      expect(triggerMock).not.toHaveBeenCalled();
    }
  });
});
