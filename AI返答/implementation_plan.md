# 実装計画：ベストプラクティスのサンプル実装

先ほどご説明した3つのベストプラクティス（APIエラー共通化、SWRエラーハンドリング、E2EテストでのDBクリーンアップ）を、現在のコードベースにサンプルとして実装します。

## 実装方針

現在のデータベースは `dummy-db` フォルダ内のインメモリ配列（`const books = [...]`など）として実装されているため、Prismaの `deleteMany` の代わりに「インメモリ配列を初期状態にリセットする専用のAPI」を作成し、Playwrightからそれを叩く形でクリーンアップを再現します。

## Proposed Changes

---

### Backend Error Wrapper

APIルート用の共通エラーハンドリング処理を作成し、一部のAPIルートに適用します。

#### [NEW] `lib/api-error.ts`
- 共通のエラークラス `ApiError` と、ルートハンドラーをラップする `withErrorHandler` を作成します。
#### [MODIFY] `app/api/books/[id]/route.ts`
- `GET` と `PUT` の処理を `withErrorHandler` でラップし、エラー時は `throw new ApiError(...)` を投げるようにリファクタリングします。

---

### Client-Side Error Handling (SWR)

SWRのグローバル設定を用いて、エラー発生時に自動でトーストを表示する仕組みを導入します。

#### [MODIFY] `lib/api.ts`
- `findOneFetcher` や `updateFetcher` などの共通fetcherで、`!res.ok` の場合にエラーレスポンスをパースして `Error` を投げるように修正します。
#### [MODIFY] `app/layout.tsx`
- `<SWRConfig>` プロバイダーを追加し、グローバルな `onError` ハンドラーで `toast.error(error.message)` を呼び出すように設定します。

---

### E2E Test DB Cleanup

Playwrightのテスト実行前にデータベース（インメモリ配列）を初期化する仕組みを作ります。

#### [NEW] `dummy-db/reset.ts`
- `books`, `users`, `reviews`, `favorites` の配列の中身を、サーバー起動時の初期データにリセットする（`splice`等で上書きする）処理を作成します。
#### [NEW] `app/api/test/reset-db/route.ts`
- テスト用に上記リセット関数を呼び出す専用のエンドポイントを作成します。
#### [MODIFY] `tests/e2e/book-edit.spec.ts`
- `test.beforeEach` を追加し、各テストの実行前に `/api/test/reset-db` を呼び出してDBをクリーンアップするようにします。合わせて該当のTODOコメントを削除します。

## Verification Plan
1. `npm run dev` でサーバーを起動し、フロントエンドから意図的にエラーを起こした際にトーストが表示されるか確認します。
2. Playwright のテスト（`npx playwright test tests/e2e/book-edit.spec.ts`）を実行し、DBリセット処理を含めてテストが正常に通過するか確認します。
