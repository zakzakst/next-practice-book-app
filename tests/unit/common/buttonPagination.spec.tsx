import { ButtonPagination } from "@/components/common/ButtonPagination";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

describe("ButtonPagination", () => {
  test("ボタンをクリックした際、対象のページを引数として関数が発火する", async () => {
    const handleMovePage = vi.fn();
    render(
      <ButtonPagination total={100} current={1} onMovePage={handleMovePage} />,
    );

    const page2Button = screen.getByTestId("button-pagination-button-2");
    await fireEvent.click(page2Button);
    expect(handleMovePage).toHaveBeenCalledWith(2);
  });

  test("現在のページをクリックした際、関数が発火しない", async () => {
    const handleMovePage = vi.fn();
    render(
      <ButtonPagination total={100} current={1} onMovePage={handleMovePage} />,
    );

    const page1Button = screen.getByTestId("button-pagination-button-1");
    await fireEvent.click(page1Button);
    expect(handleMovePage).not.toHaveBeenCalled();
  });

  test("現在のページが1ページ目の時、前へボタンが表示されない", () => {
    render(<ButtonPagination total={100} current={1} onMovePage={() => {}} />);

    const prevButton = screen.queryByTestId("button-pagination-button-prev");
    expect(prevButton).not.toBeInTheDocument();
  });

  test("前へボタンをクリックした際、現在のページ一つ前のページを引数として関数が発火する", async () => {
    const handleMovePage = vi.fn();
    render(
      <ButtonPagination total={100} current={2} onMovePage={handleMovePage} />,
    );

    const prevButton = screen.getByTestId("button-pagination-button-prev");
    await fireEvent.click(prevButton);
    expect(handleMovePage).toHaveBeenCalledWith(1);
  });

  test("現在のページが最終ページの時、次へボタンが表示されない", () => {
    render(<ButtonPagination total={101} current={11} onMovePage={() => {}} />);

    const nextButton = screen.queryByTestId("button-pagination-button-next");
    expect(nextButton).not.toBeInTheDocument();
  });

  test("次へボタンをクリックした際、現在のページ一つ次のページを引数として関数が発火する", async () => {
    const handleMovePage = vi.fn();
    render(
      <ButtonPagination total={101} current={10} onMovePage={handleMovePage} />,
    );

    const nextButton = screen.getByTestId("button-pagination-button-next");
    await fireEvent.click(nextButton);
    expect(handleMovePage).toHaveBeenCalledWith(11);
  });
});
