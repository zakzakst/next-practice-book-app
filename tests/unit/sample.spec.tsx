import { Button } from "@/components/ui/button";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

describe("Sample", () => {
  test("サンプルのテスト", async () => {
    const clickMock = vi.fn();
    render(<Button onClick={clickMock}>ボタン</Button>);

    const button = screen.getByRole("button", { name: "ボタン" });
    await fireEvent.click(button);

    expect(screen.getByText("ボタン")).toBeInTheDocument();
    expect(clickMock).toHaveBeenCalled();
  });
});
