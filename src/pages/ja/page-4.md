---
title: 現代のCSS設計とビルドツールについて
description:
layout: ../../layouts/MainLayout.astro
---

TL;DR Vite,Astro.js,css-in-js

## モジュール javascript

2014 年に webpack が登場し web 開発の根幹が変わりました。当時はレンダリングブロックされているポイントをいかに減らすか、実装時に不要に取り込まれた記述を振り落とす。という考え方は斬新で画期的なものであったと思います。

8 年が経ち webpack はその役目を終えるのかもしれません。

![state of js 2021 build tool](https://stateofx-images.netlify.app/captures/js2021/en-US/build_tools_experience_ranking.png)

> すべてのアセットをバンドルする = 巨大な javascript ファイルができてしまう

この問題は IE のシェア低下により顕著な問題として捉えられるようになってきました。
モダンブラウザでは module 単位での javascript ファイルの読み込みが可能となったため今後は Vite および esbuild を使用した 高速ビルドツールが主軸になってくるはずです。

[モジュール javascript の例](https://plnkr.co/edit/VF8op2UYjtEmf4Qj?p=preview&preview)

## Run Time JS なんて必要ない

Next.js や Nuxt,Gatsby は node.js を用いた SSG として非常に人気があり、使ってみればその設計の柔軟さに驚くばかりです。但しデメリットがないわけではありません。

ベンダーをまたぐ場合やレガシーな CMS への組み込み、モダンコーディングアレルギーがあるデベロッパーと協働するときに SSG フレームワークの「お作法」に同意してもらう必要があります。

その中で同意を得られない最大のポイントが「Run Time JS」です。

つまり、前述した pre-rendering された html ファイルはあくまで「pre」であり出力された html ファイルを修正してもブラウザ上の表示は修正されません。

この問題を解決しているのが Astro.js です。（この web サイトも Astro.js で作成しています。）
Vite を使用し React にとどまらず,Vue,Svelte,Solid、Preact など React 以降に登場した多くの js フレームワークを使用でき、最終的に
静的な HTML と CSS、モジュール化された js ファイルが出力されます。
まだ α 版ではありますが、その性質上ビルド後は環境と切り離されるためプロダクションに利用することも可能です。

## スタイルの最適解

2007 年に BEM が登場して以降、良いコーダーの条件の一つは良いクラス名を生み出せることでした。

良い CSS とは

- 詳細度がない
- 再利用可能
- 予測がしやすい

であったと思いますが、これはすべてデベロッパー目線での評価であり、ブラウザ（ユーザー）目線で考えると

- 容量が小さい
- 不要な記述がない
- スコープが適切

と言う部分も気にする必要が出てきます。

web 開発の過渡期の中で最も不透明となっているのがスタイルをどの様に構築するかです。非常に多くの選択肢が出ている中で現時点で選ぶとなると

> スコープド CSS とユーティリティクラスの併用。css 変数を添えて

が利便性が高そうです。

### Legacy BEM

```html
<div class="Block">
  <div class="Block__element">
    <div class="Block__element--modifier"></div>
  </div>
</div>
```

個人的な見解になりますが、BEM に代表される一時代前の CSS 設計の最大の問題点は html は自身がどのような振る舞いになるかを知らないが、CSS はマークアップ構造を知ってしまっている(html が css に依存している)ことです。

とはいえ、依存関係を完全に解決するのは html,css の構造上不可能に近い様に思います。そこで依存関係の単位をサイト全体・ページ単位ではなくコンポーネントレベルまで粒度をあげてみましょう。

以下が css-in-js という React の 1 コンポーネント内でスタイルとマークアップを結合させてしまう考え方です。

### Styled-component (React)

```javascript
// style
const Button = styled.a`
  /* This renders the buttons above... Edit me! */
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  width: 11rem;
  background: transparent;
  color: white;
  border: 2px solid white;

  /* The GitHub button is a primary button
   * edit this to target it specifically! */
  ${(props) =>
    props.primary &&
    css`
      background: white;
      color: black;
    `}
`;
// mark up
render(
  <div>
    <Button
      href="https://github.com/styled-components/styled-components"
      target="_blank"
      rel="noopener"
      primary
    >
      GitHub
    </Button>

    <Button as={Link} href="/docs">
      Documentation
    </Button>
  </div>
);
```

ブラウザ上では下記のようになります。

```html
<div>
  <a
    href="https://github.com/styled-components/styled-components"
    target="_blank"
    rel="noopener"
    class="sc-gsDKAQ bcQEio"
    >GitHub</a
  >
  <a href="/docs" class="Link__StyledLink-sc-cnbpkq-0 dMvCgK sc-gsDKAQ erBbkF"
    >Documentation</a
  >
</div>
```

![styled-component image](/styledcomponent.png)

利点として上記のファイル内で`Button`と命名したスタイルはカプセル化され、そのコンポーネントの中でしか使用されません

そのため他の振る舞いのボタンデザインが必要になった際に`button-hoge`や`p-button-awsome`など命名を気にする必要がなくなります。他のファイルであれば新たに`Button`が使えるのです。
命名に時間を割くのではなく別途スタイルガイド等ドキュメントに

- いつ使うのか
- どのファイルにあるのか
- どのような機能付与ができるのか

など共有事項を記載することで保守性を高めるほうが有用です。

### 参考：Utility Class (TailWindCss)

```html
<button
  type="button"
  class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
  aria-expanded="false"
>
  <span class="sr-only">Open main menu</span>
  <!-- Heroicon name: outline/menu -->
  <svg
    class="h-6 w-6"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
</button>
```

思想として一つ一つのクラスは一つの機能しか持っておらず、複数の class を組み合わせてスタイルを実現します。

言うなれば

- 通常の CSS→ 粘土で造形
- Utility Class での css 設計 →LEGO ブロックで組み上げる

という違いがあります。なれてしまうとマークアップのみでサイト作成ができるので開発速度は上がりますが、静的コーディングで使用してしまうと、スタイルの変更時に全ページの変更が必要となってしまうため、

- フレームワークを導入する
- コンポーネント設計のガイドラインを設定し、いつ Utility class を使うかを定義する

という決め事が必要になります。
