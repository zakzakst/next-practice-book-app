import {
  ReviewCreateForm,
  ReviewCreateFormValues,
} from "@/components/features/reviews/ReviewCreateForm";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

describe("ReviewCreateForm", () => {
  test("初期値がフォームに反映される", () => {
    // Arrange
    const valuesMock: ReviewCreateFormValues = {
      comment: "コメント初期値",
      rating: "3.0",
    };
    act(() => {
      render(<ReviewCreateForm onSubmit={() => {}} values={valuesMock} />);
    });
    const textarea = screen.getByRole("textbox", { name: "コメント" });
    // TODO: shadcnのselect、単体テストするのちょっとクセあるかも
    const selectTrigger = screen.getByTestId(
      "review-create-form-rating-select",
    );

    // Assert
    expect(textarea).toHaveValue("コメント初期値");
    expect(
      selectTrigger.querySelector('[data-slot="select-value"]'),
    ).toHaveTextContent("3.0");
  });

  test("バリデーションが正しく挙動する", async () => {
    // Arrange
    act(() => {
      render(<ReviewCreateForm onSubmit={() => {}} />);
    });
    const submitButton = screen.getByRole("button", { name: "登録" });

    // Assert
    expect(submitButton).toHaveAttribute("disabled");

    // ===== コメントを入力すると登録ボタンが有効になる確認 =====
    // Act
    const textarea = screen.getByRole("textbox", { name: "コメント" });
    await userEvent.type(textarea, "コメント入力");
    // NOTE: フォーカスアウトするとreact hook form挙動した。他のところでも同じ対応で上手くいくかも
    await userEvent.tab();

    // Assert
    expect(submitButton).not.toHaveAttribute("disabled");

    // ===== 再度コメントを空欄にすると登録ボタンが無効になる確認 =====
    // Act
    await userEvent.clear(textarea);
    await userEvent.tab();

    // Assert
    expect(submitButton).toHaveAttribute("disabled");
    expect(screen.getByText("コメントは入力必須項目です")).toBeInTheDocument();
  });

  test("登録ボタンをクリックした時、フォームの入力値で関数が発火する", async () => {
    // Arrange
    const submitMock = vi.fn();
    act(() => {
      render(<ReviewCreateForm onSubmit={submitMock} />);
    });

    // Act
    const textarea = screen.getByRole("textbox", { name: "コメント" });
    await userEvent.type(textarea, "コメント入力");
    // TODO: selectの操作上手くいかなかった。一旦保留
    // const selectTrigger = screen.getByTestId(
    //   "review-create-form-rating-select",
    // );
    // await userEvent.click(selectTrigger);
    // const targetValueOption = screen.getByText("2.5");
    // await userEvent.click(targetValueOption);

    // NOTE: 一度フォーカスアウトしてバリデーションを発火し、登録ボタンを有効にする
    await userEvent.tab();
    const submitButton = screen.getByRole("button", { name: "登録" });
    await userEvent.click(submitButton);

    // Assert
    expect(submitMock).toHaveBeenCalledWith({
      comment: "コメント入力",
      rating: "0.0",
    });
  });

  test("isLoadingがtrueの場合、フォームと登録ボタンが無効になる", () => {
    // Arrange
    act(() => {
      render(<ReviewCreateForm onSubmit={() => {}} isLoading />);
    });
    const textarea = screen.getByRole("textbox", { name: "コメント" });
    const selectTrigger = screen.getByTestId(
      "review-create-form-rating-select",
    );
    const submitButton = screen.getByRole("button", { name: "登録" });

    // Assert
    expect(textarea).toHaveAttribute("disabled");
    expect(selectTrigger).toHaveAttribute("disabled");
    expect(submitButton).toHaveAttribute("disabled");
  });
});
