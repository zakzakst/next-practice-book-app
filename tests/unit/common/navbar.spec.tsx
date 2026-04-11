import { usePathname } from "next/navigation";

import { Navbar } from "@/components/common/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { users } from "@/dummy-db/user";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

vi.mock("@/contexts/AuthContext");
vi.mock("next/navigation");

describe("Navbar", () => {
  test("未ログイン時の表示内容が正しい", () => {
    vi.mocked(useAuth).mockReturnValue({
      me: null,
      meMutate: async () => {},
      logout: async () => {},
      isLoading: false,
      isMutating: false,
    });
    vi.mocked(usePathname).mockReturnValue("/");
    render(<Navbar />);

    expect(screen.getByText("TOP")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "ログイン" })).toBeInTheDocument();
  });

  test("未ログイン時かつログインページの場合の表示内容が正しい", () => {
    vi.mocked(useAuth).mockReturnValue({
      me: null,
      meMutate: async () => {},
      logout: async () => {},
      isLoading: false,
      isMutating: false,
    });
    vi.mocked(usePathname).mockReturnValue("/login");
    render(<Navbar />);

    expect(screen.getByText("TOP")).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "ログイン" }),
    ).not.toBeInTheDocument();
  });

  test("ログイン時の表示内容が正しい", async () => {
    const logoutMock = vi.fn();
    vi.mocked(useAuth).mockReturnValue({
      me: {
        ...users[0],
      },
      meMutate: async () => {},
      logout: logoutMock,
      isLoading: false,
      isMutating: false,
    });
    vi.mocked(usePathname).mockReturnValue("/");
    render(<Navbar />);

    const logoutButton = screen.getByRole("button", { name: "ログアウト" });
    expect(screen.getByText("TOP")).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();

    await fireEvent.click(logoutButton);
    expect(logoutMock).toHaveBeenCalled();
  });
});
