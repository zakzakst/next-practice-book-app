### 今回やる

### 後々やりたい

- ユーザーロール編集
- husky
- REST以外のAPIのパス・型の命名考える
- MSWの対象/api配下のみに絞ることできるか調べる

### メモ

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
