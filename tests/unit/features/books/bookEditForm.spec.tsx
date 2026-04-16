import {
  BookEditForm,
  BookEditFormValues,
} from "@/components/features/books/BookEditForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

const valuesMock: BookEditFormValues = {
  title: "深夜特急",
  author: "沢木耕太郎",
  description:
    "アジアからヨーロッパへと旅するバックパッカーの体験を綴った紀行文。旅の自由と出会いが描かれる名著。",
};

describe("BookEditForm", () => {
  test("更新する書籍の元のデータがデフォルト値として入力欄に設定されている", () => {
    // Arrange
    render(<BookEditForm values={valuesMock} onSubmit={() => {}} />);
    const titleInput = screen.getByRole("textbox", { name: "書籍名" });
    const authorInput = screen.getByRole("textbox", { name: "著者名" });
    const descriptionTextarea = screen.getByRole("textbox", {
      name: "あらすじ・内容",
    });

    // Assert
    expect(titleInput).toHaveValue(valuesMock.title);
    expect(authorInput).toHaveValue(valuesMock.author);
    expect(descriptionTextarea).toHaveValue(valuesMock.description);
  });

  // TODO: react hook formで単体テスト上手くいかない。一旦e2eのほうでテストする。こっちは後回し
  // test.todo("タイトル入力欄のバリデーションが正しく挙動する", async () => {
  //   // Arrange
  //   render(<BookEditForm values={valuesMock} onSubmit={() => {}} />);
  //   const titleInput = screen.getByRole("textbox", { name: "書籍名" });

  //   // Act
  //   titleInput.focus();
  //   await userEvent.keyboard("Backspace");
  //   // Array(valuesMock.title.length).forEach(async () => {
  //   //   await userEvent.keyboard("Backspace");
  //   // });
  //   // await userEvent.clear(titleInput);
  //   // await userEvent.type(titleInput, "");

  //   // Assert
  //   expect(screen.getByText("書籍名は入力必須項目です")).toBeInTheDocument();
  // });

  // test.todo("著者名入力欄のバリデーションが正しく挙動する", () => {});

  // test.todo("概要入力欄のバリデーションが正しく挙動する", () => {});

  // TODO: 画像アップロードについては一旦後回し
  // test.todo("画像アップロードのバリデーションが正しく挙動する", () => {});

  test("「送信」ボタンをクリックすると、入力された値を反映し関数が発火する", async () => {
    // Arrange
    const submitMock = vi.fn();
    render(<BookEditForm values={valuesMock} onSubmit={submitMock} />);
    const titleInput = screen.getByRole("textbox", { name: "書籍名" });
    const authorInput = screen.getByRole("textbox", { name: "著者名" });
    const descriptionTextarea = screen.getByRole("textbox", {
      name: "あらすじ・内容",
    });
    const submitButton = screen.getByRole("button", { name: "更新する" });

    // Act
    await userEvent.type(titleInput, "追加文言");
    await userEvent.type(authorInput, "追加文言");
    await userEvent.type(descriptionTextarea, "追加文言");
    await userEvent.click(submitButton);

    // Assert
    expect(submitMock).toHaveBeenCalledWith({
      title: `${valuesMock.title}追加文言`,
      author: `${valuesMock.author}追加文言`,
      description: `${valuesMock.description}追加文言`,
    });
  });

  test("ロード中の場合、入力欄とボタンが無効になる", () => {
    // Arrange
    render(<BookEditForm values={valuesMock} onSubmit={() => {}} isLoading />);
    const titleInput = screen.getByRole("textbox", { name: "書籍名" });
    const authorInput = screen.getByRole("textbox", { name: "著者名" });
    const descriptionTextarea = screen.getByRole("textbox", {
      name: "あらすじ・内容",
    });
    const submitButton = screen.getByRole("button", { name: "更新する" });

    // Assert
    expect(titleInput).toHaveAttribute("disabled");
    expect(authorInput).toHaveAttribute("disabled");
    expect(descriptionTextarea).toHaveAttribute("disabled");
    expect(submitButton).toHaveAttribute("disabled");
  });
});
