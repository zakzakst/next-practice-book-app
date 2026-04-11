import { usePathname } from "next/navigation";

// import * as AuthContext from "@/contexts/AuthContext";
// import * as AuthContext from "../../contexts/AuthContext";
import { Navbar } from "@/components/common/Navbar";
// import * as nextNavigation from "next/navigation";

import { useAuth } from "@/contexts/AuthContext";
// import { users } from "@/dummy-db/user";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
// import { fn, mocked, sb } from "storybook/test";
import { vi } from "vitest";

// sb.mock(import("next/navigation"), { spy: true });
// // sb.mock(import("@/contexts/AuthContext"), { spy: true });
// sb.mock(import("../../contexts/AuthContext"), { spy: true });

vi.mock("@/contexts/AuthContext");
vi.mock("next/navigation");

const meta = {
  title: "Common/Navbar",
  // component: () => (
  //   <AuthContext.AuthProvider>
  //     <Navbar />
  //   </AuthContext.AuthProvider>
  // ),
  component: Navbar,
  parameters: {
    layout: "centered",
    moduleMock: {},
  },
  tags: ["autodocs"],
  beforeEach: async () => {
    // console.log(AuthContext.useAuth);
    // mocked(nextNavigation.usePathname).mockReturnValue("/");
    // mocked(nextNavigation.useRouter).mockReturnValue({
    //   push: () => {},
    // } as any);
    // mocked(AuthContext.useAuth).mockReturnValue({
    //   me: null,
    //   meMutate: async () => {},
    //   logout: async () => {},
    //   isLoading: false,
    //   isMutating: false,
    // });
    vi.mocked(useAuth).mockReturnValue({
      me: null,
      meMutate: async () => {},
      logout: async () => {},
      isLoading: false,
      isMutating: false,
    });
    vi.mocked(usePathname).mockReturnValue("/");
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
