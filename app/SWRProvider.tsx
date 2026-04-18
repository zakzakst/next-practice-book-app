"use client";

import { ReactNode } from "react";
import { toast } from "sonner";
import { SWRConfig } from "swr";

export const SWRProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SWRConfig
      value={{
        onError: (error) => {
          if (error instanceof Error) {
            toast.error(error.message);
          } else {
            toast.error("エラーが発生しました");
          }
        },
      }}
    >
      {children}
    </SWRConfig>
  );
};
