"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export const Navbar = ({ className }: Props) => {
  const { me, logout, isLoading, isMutating } = useAuth();
  const pathname = usePathname();

  return (
    <nav className={cn("bg-white p-2 shadow-sm", className)}>
      <div className="flex items-center gap-2">
        <div>
          {pathname === "/" ? (
            <h1 className="text-xl font-bold">TOP</h1>
          ) : (
            <Link className="text-xl font-bold" href="/">
              TOP
            </Link>
          )}
        </div>
        {!isLoading && !isMutating && (
          <div className="ml-auto flex items-center gap-2">
            {me ? (
              <>
                <span className="leading-none">{me.name || "名前未設定"}</span>
                <Button onClick={logout}>ログアウト</Button>
              </>
            ) : (
              <>
                {pathname !== "/login" && (
                  <Button asChild>
                    <Link href="/login">ログイン</Link>
                  </Button>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
