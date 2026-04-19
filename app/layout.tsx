import type { Metadata } from "next";

import { MSWProvider } from "./MSWProvider";
import "./globals.css";
import { Navbar } from "@/components/common/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import { SWRProvider } from "./SWRProvider";

export const metadata: Metadata = {
  title: "アプリのタイトル",
  description: "アプリの説明",
};

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="grid min-h-full grid-rows-[min-content_1fr]">
        <MSWProvider>
          <SWRProvider>
            <AuthProvider>
              <Navbar className="sticky top-0 z-30" />
              <main className="container mx-auto py-6">{children}</main>
              <Toaster />
            </AuthProvider>
          </SWRProvider>
        </MSWProvider>
      </body>
    </html>
  );
};

export default Layout;
