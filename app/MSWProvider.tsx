"use client";

import { Suspense, use } from "react";

const mockingEnabledPromise =
  process.env.NODE_ENV === "development" &&
  process.env.NEXT_PUBLIC_MSW_STATE === "active" &&
  typeof window !== "undefined"
    ? import("@/lib/msw/browser").then(async ({ worker }) => {
        // モックサーバーを起動
        await worker.start({
          // 未処理のリクエストが発生した場合の挙動を定義
          onUnhandledRequest(request, print) {
            // Next.js関連のリクエストは無視
            if (request.url.includes("_next")) {
              return;
            }
            // それ以外の未処理リクエストは警告を出力
            print.warning();
          },
        });
        // 現在登録されているモックハンドラーをデバッグ用に出力
        // console.log(worker.listHandlers());
      })
    : Promise.resolve();

const MSWProviderWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  use(mockingEnabledPromise);
  return children;
};

export const MSWProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Suspense fallback={null}>
      <MSWProviderWrapper>{children}</MSWProviderWrapper>
    </Suspense>
  );
};
