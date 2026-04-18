# 開発のセオリーとおすすめのベストプラクティス

ご質問いただいた「エラーレスポンス」「エラーハンドリング」「テスト時のデータベース初期化」の3点について、モダンなWebアプリ（特にNext.jsやPrismaを使った環境）でのセオリーやおすすめの方法を解説します。

---

## 1. エラーレスポンスの実装方法（API側）

APIのエラーレスポンスで最も重要なのは**「常に同じ構造（フォーマット）で返すこと」**と**「適切なHTTPステータスコードを使うこと」**です。

### おすすめのフォーマット
成功時と失敗時でレスポンスの型を明確に分けます。

```typescript
// 失敗時の共通フォーマット例
{
  "error": {
    "code": "BAD_REQUEST",      // プログラムで判定しやすいエラーコード
    "message": "入力内容に誤りがあります", // ユーザーにそのまま見せても良い、またはログ用のメッセージ
    "details": [...]            // バリデーションエラーの詳細など（任意）
  }
}
```

### Next.js (App Router) での実装例
ルートハンドラー（`app/api/.../route.ts`）では、以下のように実装します。

```typescript
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // ... 処理 ...
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error) {
    // 例: バリデーションエラーの場合
    return NextResponse.json(
      { error: { code: 'BAD_REQUEST', message: '不正な入力です' } },
      { status: 400 } // ← 適切なHTTPステータスコードを指定する
    );
  }
}
```

> [!TIP]
> `200 OK` で返して中身に `{"status": "error"}` を含める設計もありますが、`400` や `500` などのHTTPステータスコードを正しく使う方が、SWRなどのクライアントライブラリが自動で「エラーだ」と認識してくれるため圧倒的に管理が楽になります。

---

## 2. エラーハンドリングをシンプルに管理するアイデア

エラー処理が複雑になる原因は「各コンポーネントで個別にエラー処理を書いている」ことです。これを**「共通化」**することでシンプルになります。

### アイデア1: API呼び出し（Fetcher）の共通化
SWRなどで使う `fetcher` 関数の中で、「ステータスコードがエラー（`!res.ok`）なら `Error` を投げる」というルールを作ります。

```typescript
// lib/fetcher.ts
export const fetcher = async (url: string) => {
  const res = await fetch(url);
  
  if (!res.ok) {
    // さきほど設計したエラーレスポンスを受け取る
    const errorData = await res.json();
    const error = new Error(errorData.error.message || 'エラーが発生しました');
    // 必要に応じてエラーオブジェクトに情報を追加
    (error as any).status = res.status; 
    throw error; // ← ここで投げることで、SWRの error オブジェクトに入る
  }

  return res.json();
};
```

### アイデア2: 共通のトースト表示（SWRのグローバル設定）
SWRを利用している場合、`SWRConfig` を使って**「エラーが起きたら自動的にトーストを表示する」**というグローバルな設定が可能です。こうすれば、各ページで `if(error) toast(...)` と書く必要がなくなります。

```tsx
// app/providers.tsx または layout.tsx
<SWRConfig 
  value={{
    fetcher,
    onError: (error) => {
      // エラーが発生したら自動でトーストを表示
      toast.error(error.message);
    }
  }}
>
  {children}
</SWRConfig>
```

### アイデア3: APIルート（バックエンド）のラッパー関数を作る
APIルートでも、各ファイルで `try...catch` を書くのが面倒な場合は、処理をラップする関数を作るとスッキリします。

```typescript
// 例: withErrorHandler.ts
export const withErrorHandler = (handler: Function) => {
  return async (req: Request, ...args: any[]) => {
    try {
      return await handler(req, ...args);
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: { code: 'INTERNAL_SERVER_ERROR', message: 'サーバーエラー' } },
        { status: 500 }
      );
    }
  };
};

// 実際のAPIファイル
export const GET = withErrorHandler(async (req: Request) => {
  // ここには成功時の処理だけ書けばOK。エラーが起きてもラッパーが吸収する
});
```

---

## 3. テスト後のデータベース初期化（クリーンアップ）のセオリー

E2Eテスト（Playwright）や統合テストでデータベースを触る場合、**「テストが他のテストに影響を与えない（独立している）」**ことが絶対に必要です。

### 最も一般的なセオリー: 「テストの前にDBを綺麗にする」

`afterAll` で消すアプローチもありますが、テストが途中で強制終了した時にデータが残ってしまうため、**「次のテストが始まる前（または各テストの直前）にDBをリセットする」**のが現在の主流です。

#### Playwright + Prismaの例
Playwrightの `test.beforeEach` や `test.beforeAll` で、Prismaを使ってテーブルを空にするスクリプトを実行します。

```typescript
// tests/e2e/setup/teardown.ts のようなファイルを作る
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function clearDatabase() {
  // 外部キー制約に引っかからないように削除する順序に気をつけるか、
  // 全テーブルを順次 deleteMany していく
  await prisma.review.deleteMany();
  await prisma.book.deleteMany();
  await prisma.user.deleteMany();
}

// ---------------------------

// テストファイル内（book-edit.spec.ts など）
import { test } from '@playwright/test';
import { clearDatabase } from './setup/teardown';

test.describe('書籍編集機能', () => {
  test.beforeEach(async () => {
    // 各テストの実行前にDBを綺麗にして、必要な初期データ(Seed)を投入する
    await clearDatabase();
    await createTestUser(); // テスト用ユーザー作成など
  });

  test('書籍を編集できること', async ({ page }) => {
    // ... テストの処理 ...
  });
});
```

> [!WARNING]
> E2Eテストを行う際は、**本番や開発用のデータベースではなく、テスト専用のデータベース（Test DB）を用意する**のが必須のセオリーです。`.env.test` などのファイルを作り、Playwright実行時はテスト用のDB URL（例: `localhost:5432/test_db`）を見るように設定しましょう。これを怠ると、開発中や本番のデータがテストによって吹き飛ぶ事故が起きます。
