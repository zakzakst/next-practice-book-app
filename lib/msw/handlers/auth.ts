// AuthMe
import { users } from "@/dummy-db/user";
import { API_MOCK_DEFAULT_DELAY } from "@/lib/api";
import { HttpResponse, delay, http } from "msw";

export const authMeHandler = http.get("*/auth/me", async (/* info */) => {
  // NOTE: MSWで認証のクッキーまわりの情報取得方法分からなかった
  // 単体テストなどの際に利用するのをメインにして、ログイン周りは総合テストとしてNext.js立ち上げている状態で行う。みたいな使い分けがいい？
  // console.log(info.request.headers);
  // console.log(info.cookies);
  await delay(API_MOCK_DEFAULT_DELAY);
  return new HttpResponse(
    JSON.stringify({ ...users[1], password: undefined }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
});

export const authHandlers = [authMeHandler];
