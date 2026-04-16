"use client";

import { useCallback } from "react";

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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// TODO: 画像アップロードについては一旦後回し
export const bookEditFormSchema = z.object({
  title: z.string().min(1, { error: "書籍名は入力必須項目です" }),
  author: z.string().min(1, { error: "著者名は入力必須項目です" }),
  description: z.string().min(1, { error: "あらすじ・内容は入力必須項目です" }),
});

export type BookEditFormValues = z.infer<typeof bookEditFormSchema>;

type Props = {
  values: BookEditFormValues;
  onSubmit: (values: BookEditFormValues) => void;
  isLoading?: boolean;
};

export const BookEditForm = ({ values, onSubmit, isLoading }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<BookEditFormValues>({
    resolver: zodResolver(bookEditFormSchema),
    defaultValues: values,
    mode: "onBlur",
  });

  const submit = useCallback(
    (values: BookEditFormValues) => {
      onSubmit(values);
    },
    [onSubmit],
  );

  return (
    <div className="w-full max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>書籍データ更新フォーム</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-[max-content_1fr] gap-2">
            <div className="col-span-2 grid grid-cols-subgrid">
              <Label htmlFor="title">書籍名</Label>
              <div>
                <Input id="title" {...register("title")} disabled={isLoading} />
                {errors.title && <p>{errors.title.message}</p>}
              </div>
            </div>
            <div className="col-span-2 grid grid-cols-subgrid">
              <Label htmlFor="author">著者名</Label>
              <div>
                <Input
                  id="author"
                  {...register("author")}
                  disabled={isLoading}
                />
                {errors.author && <p>{errors.author.message}</p>}
              </div>
            </div>
            <div className="col-span-2 grid grid-cols-subgrid">
              <Label htmlFor="description">あらすじ・内容</Label>
              <div>
                <Textarea
                  id="description"
                  {...register("description")}
                  disabled={isLoading}
                />
                {errors.description && <p>{errors.description.message}</p>}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleSubmit(submit)}
            disabled={isLoading || !isValid}
          >
            更新する
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
