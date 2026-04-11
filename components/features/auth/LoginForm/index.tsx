"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useAuthLogin } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export const loginFormSchema = z.object({
  email: z.email({ error: "有効なメールアドレスを入力してください" }),
  password: z
    .string()
    .min(8, { error: "パスワードは8文字以上で入力してください" }),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export const LoginForm = () => {
  const router = useRouter();
  const { trigger, isMutating } = useAuthLogin();
  const { meMutate } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    if (isMutating) return;
    const res = await trigger(values);
    if (res.ok) {
      await meMutate();
      toast("ログインしました");
      router.push("/");
    } else {
      toast("ログインに失敗しました");
    }
  };

  return (
    <div className="w-full max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>ログインフォーム</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-[max-content_1fr] gap-2">
            <div className="col-span-2 grid grid-cols-subgrid">
              <Label htmlFor="email">メールアドレス</Label>
              <div>
                <Input id="email" {...register("email")} />
                {errors.email && <p>{errors.email.message}</p>}
              </div>
            </div>
            <div className="col-span-2 grid grid-cols-subgrid">
              <Label htmlFor="password">パスワード</Label>
              <div>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
                {errors.password && <p>{errors.password.message}</p>}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="grid grid-cols-2 gap-2">
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={isMutating || !isValid}
          >
            ログイン
          </Button>
          <Button variant="outline" asChild>
            <Link href="/register">ユーザー登録</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
