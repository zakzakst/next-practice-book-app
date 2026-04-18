### 今回やる

- ユーザーロール編集
- 書籍登録
- マイページ

### 後々やりたい

- husky
- REST以外のAPIのパス・型の命名考える
- MSWの対象/api配下のみに絞ることできるか調べる

### メモ

- SWRのfetcherを共通化するの難しそう、とはいえ個別に書くと書き方がズレてくるデメリットもある。orvalなどで、個別につくりつつ、自動出力で書き方のズレをなくすのがいいか？
- APIを個別に作成していると「書籍詳細ページ」のような複合的なデータが必要な時にごちゃつきそう。BFFをこういうパターンで使う？

- https://zenn.dev/takepepe/scraps/dfb99e6db2e329
- トーストや認証情報のuseContextがからむとstorybook, unit testが複雑になる
  - APIやページ全体への影響から分離したコンポーネントを作成することを意識したほうがいいと感じた
    - atomic design的に整理する？ UIとデータ連携で分離する？（LoginFormとLoginFormUiとか作ってLoginFormUiのほうはAPI連携やトースト表示はしない）
      - 影響が出る部分をhooksにまとめておいてモック化しやすいようにするのも一案か？
      - ⇒なんかこっちのほうが良い気がしてきた（storybookでhookのモック化できそうであれば、この方針で試してみる）
    - APIやトーストのモック化できるようになってはおきたいので、一旦は分離しないで作成する
- テストコード書く、storybook書く
  - https://storybook.js.org/docs/writing-stories/mocking-data-and-modules/mocking-modules
  - ⇒上手くできなかった。。上記見た感じ、できそうではある。ただ、詰まってしまったので一旦あきらめる
- playwrightでtest.fixme

### 参考

- https://github.com/microsoft/PowerToys/tree/main/.github/ISSUE_TEMPLATE
- https://qiita.com/ko-he-8/items/85116e1d99ed4b176657
