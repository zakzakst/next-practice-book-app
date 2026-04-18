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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

const ratingValues = [
  "0.0",
  "0.5",
  "1.0",
  "1.5",
  "2.0",
  "2.5",
  "3.0",
  "3.5",
  "4.0",
  "4.5",
  "5.0",
] as const;

export const reviewCreateFormSchema = z.object({
  comment: z.string().min(1, { error: "コメントは入力必須項目です" }),
  rating: z.enum(ratingValues),
});

export type ReviewCreateFormValues = z.infer<typeof reviewCreateFormSchema>;

export const DefaultValues: ReviewCreateFormValues = {
  comment: "",
  rating: "0.0",
};

type Props = {
  values?: Partial<ReviewCreateFormValues>;
  onSubmit: (values: ReviewCreateFormValues) => void;
  isLoading?: boolean;
};

export const ReviewCreateForm = ({ values, onSubmit, isLoading }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<ReviewCreateFormValues>({
    resolver: zodResolver(reviewCreateFormSchema),
    defaultValues: {
      ...DefaultValues,
      ...values,
    },
    mode: "onBlur",
  });

  const submit = useCallback(
    (values: ReviewCreateFormValues) => {
      onSubmit(values);
    },
    [onSubmit],
  );

  return (
    <div className="w-full max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>レビュー登録フォーム</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-[max-content_1fr] gap-2">
            <div className="col-span-2 grid grid-cols-subgrid">
              <Label htmlFor="comment">コメント</Label>
              <div>
                <Textarea
                  id="comment"
                  {...register("comment")}
                  disabled={isLoading}
                />
                {errors.comment && <p>{errors.comment.message}</p>}
              </div>
            </div>
            <div className="col-span-2 grid grid-cols-subgrid">
              <Label>評価</Label>
              <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    disabled={isLoading}
                  >
                    <SelectTrigger
                      className="w-full max-w-48"
                      data-testid="review-create-form-rating-select"
                    >
                      <SelectValue placeholder="評価を0.0～5.0の間で選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {ratingValues.map((rValue) => (
                          <SelectItem key={rValue} value={rValue}>
                            {rValue}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="grid grid-cols-2 gap-2">
          <Button
            onClick={handleSubmit(submit)}
            disabled={isLoading || !isValid}
          >
            登録
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
