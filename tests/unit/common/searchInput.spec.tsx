import { SearchInput } from "@/components/common/SearchInput";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

describe("SearchInput", () => {
  // NOTE: 自分の作業ミス記録用にコメントアウトで残す
  // 入力欄が空かどうかでボタンの有効無効を判定していないため、下記テストは不要（だし「有効になる」のほうはテストが失敗する
  // test("検索入力欄が空の時、「検索」ボタンが無効になる", () => {
  //   // Arrange
  //   render(<SearchInput value="" onSubmit={() => {}} />);
  //   const searchButton = screen.getByRole("button", { name: "検索" });

  //   // Assert
  //   expect(searchButton).toHaveAttribute("disabled");
  // });

  // test("検索入力欄に内容入力されている時、「検索」ボタンが有効になる", () => {
  //   // Arrange
  //   render(<SearchInput value="入力テキスト" onSubmit={() => {}} />);
  //   const searchButton = screen.getByRole("button", { name: "検索" });

  //   // Assert
  //   expect(searchButton).not.toHaveAttribute("disabled");
  // });

  test("現在の絞り込み文言がない場合、「クリア」ボタンが表示されない", () => {
    // Arrange
    render(<SearchInput value="" onSubmit={() => {}} />);
    const clearButton = screen.queryByRole("button", { name: "クリア" });

    // Assert
    expect(clearButton).not.toBeInTheDocument();
  });

  test("現在の絞り込み文言がある場合、「クリア」ボタンが表示される", () => {
    // Arrange
    render(<SearchInput value="入力テキスト" onSubmit={() => {}} />);
    const clearButton = screen.getByRole("button", { name: "クリア" });

    // Assert
    expect(clearButton).toBeInTheDocument();
  });

  test("検索入力欄の内容と現在の絞り込み文言が同じ場合、「検索」ボタンが無効になる", async () => {
    // Arrange
    render(<SearchInput value="入力テキスト" onSubmit={() => {}} />);
    const input = screen.getByRole("textbox");
    const searchButton = screen.getByRole("button", { name: "検索" });

    // Act
    // NOTE: 再入力の場合を再現するため、一度clearしている
    await userEvent.clear(input);
    await userEvent.type(input, "入力テキスト");

    // Assert
    expect(searchButton).toHaveAttribute("disabled");
  });

  test("検索入力欄の内容と現在の絞り込み文言が異なる場合、「検索」ボタンが有効になる", async () => {
    // Arrange
    render(<SearchInput value="入力テキスト" onSubmit={() => {}} />);
    const input = screen.getByRole("textbox");
    const searchButton = screen.getByRole("button", { name: "検索" });

    // Act
    // NOTE: 再入力の場合を再現するため、一度clearしている
    await userEvent.clear(input);
    await userEvent.type(input, "変更テキスト");

    // Assert
    expect(searchButton).not.toHaveAttribute("disabled");
  });

  test("「検索」ボタンをクリックした時、検索入力欄の内容を引数として関数が発火する", async () => {
    // Arrange
    const submitMock = vi.fn();
    render(<SearchInput value="" onSubmit={submitMock} />);
    const input = screen.getByRole("textbox");
    const searchButton = screen.getByRole("button", { name: "検索" });

    // Act
    await userEvent.type(input, "入力テキスト");
    await userEvent.click(searchButton);

    // Assert
    expect(submitMock).toHaveBeenCalledWith("入力テキスト");
  });

  test("「クリア」ボタンをクリックした時、入力欄が空になる", async () => {
    // Arrange
    render(<SearchInput value="入力テキスト" onSubmit={() => {}} />);
    const clearButton = screen.getByRole("button", { name: "クリア" });
    const input = screen.getByRole("textbox");

    // Act
    await userEvent.click(clearButton);

    // Assert
    expect(input).toHaveAttribute("value", "");
  });

  test("disabledがtrueの場合、入力欄・「検索」ボタンともに無効になる", () => {
    // Arrange
    render(<SearchInput value="入力テキスト" onSubmit={() => {}} disabled />);
    const input = screen.getByRole("textbox");
    const searchButton = screen.getByRole("button", { name: "検索" });

    // Assert
    expect(searchButton).toHaveAttribute("disabled");
    expect(input).toHaveAttribute("disabled");
  });

  test("disabledがtrueの場合、「クリア」ボタンが表示されない", () => {
    // Arrange
    render(<SearchInput value="入力テキスト" onSubmit={() => {}} disabled />);
    const clearButton = screen.queryByRole("button", { name: "クリア" });

    // Assert
    expect(clearButton).not.toBeInTheDocument();
  });
});
