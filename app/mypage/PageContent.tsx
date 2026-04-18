"use client";

import { BooksList } from "@/components/features/books/BooksList";
import { ReviewsList } from "@/components/features/reviews/ReviewsList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const PageContent = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>名前</CardTitle>
        </CardHeader>
        <CardContent>
          <p>登録日：2026/01/01</p>
        </CardContent>
      </Card>
      <Tabs defaultValue="favorites" className="mt-8 w-full">
        <TabsList>
          <TabsTrigger value="favorites">お気に入り（2）</TabsTrigger>
          <TabsTrigger value="reviews">レビュー（2）</TabsTrigger>
        </TabsList>
        <TabsContent value="favorites">
          <BooksList items={[]} onUpdateFavorite={() => {}} />
        </TabsContent>
        <TabsContent value="reviews">
          <ReviewsList items={[]} onDeleteReview={() => {}} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
