# Todo Monorepo

抽象的で曖昧な中間層を無くしつつ、実装の変更が容易にできることを示すことを目的としたToDoアプリのモノレポです。
同一のフロントエンドから、**中間層の有無（通常版と軽量版）**と**アーキテクチャ**が異なる4つのバックエンドに切り替えて接続できます。

## パッケージ構成

```
.
├── shared/                  # フロントエンドとバックエンドで共有する型・ロジック
├── ddd-backend-lightweight/ # DDD（軽量版）バックエンド（ポート 3001）
├── ddd-backend-normal/      # DDD（通常版）バックエンド（ポート 3001）
├── ca-backend-lightweight/  # クリーンアーキテクチャ（軽量版）バックエンド（ポート 3002）
├── ca-backend-normal/       # クリーンアーキテクチャ（通常版）バックエンド（ポート 3002）
└── frontend/                # React + Vite フロントエンド（ポート 5173）
```

## 4つのバックエンドの位置づけ

| | lightweight | normal |
| --- | --- | --- |
| **DDD** | `ddd-backend-lightweight` | `ddd-backend-normal` |
| **クリーンアーキテクチャ** | `ca-backend-lightweight` | `ca-backend-normal` |

- **lightweight**：型によって実装に依存しないようになっているシンプルな実装
- **normal**：インターフェースを介すことで依存しないようにした実装

## 起動方法

依存関係(node_modules)をインストールして、バックエンドとフロントエンドをそれぞれ別のターミナルで起動します。

```bash
# 依存関係をインストールします
npm install

# ドメイン駆動設計 DDD
npm run dev:ddd:lightweight   # または npm run dev:ddd:lightweight-full または npm run dev:ddd:normal
                              # DDDバックエンド（lightweight / lightweight-full / normal のどれかを選ぶ）
npm run dev:frontend:ddd   # DDDフロントエンド。DDDバックエンド（3001番）に接続

# クリーンアーキテクチャ CA
npm run dev:ca:lightweight    # または npm run dev:ca:lightweight-full または npm run dev:ca:normal
                              # CAバックエンド（lightweight / lightweight-full / normal のどれかを選ぶ）
npm run dev:frontend:ca    # CAフロントエンド。CAバックエンド（3002番）に接続

# 作業が終わり、必要なら、クリーンします
git clean -Xdf
```

## テストの実行方法

`ddd-backend-lightweight-full` と `ca-backend-lightweight-full` にユニットテスト、`frontend` に E2E テスト、ルートの `package.json` に型チェックが含まれています。

### 型チェック（ターミナルから実行する）

```bash
# 依存関係のインストール（起動方法と共通。済んでいればスキップ）
npm install

# 型チェック
npm run typecheck:ddd:lightweight
npm run typecheck:ca:lightweight
npm run typecheck:ddd:lightweight-full
npm run typecheck:ca:lightweight-full
npm run typecheck:ddd:normal
npm run typecheck:ca:normal
npm run typecheck:frontend
```

### ユニットテスト（ターミナルから実行する）

```bash
# 依存関係のインストール（起動方法と共通。済んでいればスキップ）
npm install

# 1回だけ実行して終了する（ルートから cd なしで実行できる）
npm run test:ddd:lightweight-full
npm run test:ca:lightweight-full

# ウォッチモード（ファイルを保存するたびに自動再実行）
cd ddd-backend-lightweight-full && npm test
cd ..
cd ca-backend-lightweight-full && npm test
cd ..
```

### ユニットテスト（VSCode の Testing ビューから実行する）

拡張機能「**Vitest**」（ID: `vitest.explorer`）をインストールすると、左サイドバーのビーカーアイコンからテストを個別に実行・デバッグできます。

### E2E テスト（Playwright）

E2E テストはフロントエンドと DDD バックエンド（ポート 3001）を自動起動して実行します。
初回のみブラウザーのインストールが必要です。

```bash
# 依存関係のインストール（起動方法と共通。済んでいればスキップ）
npm install

# 初回のみ: Playwright が使うブラウザーをインストールする
cd frontend
npx playwright install chromium
cd ..

# E2E テストを実行する（ルートから実行できる）
npm run test:e2e
```

VSCode の Playwright 拡張機能をインストールして Testing ビューを使う場合、
以下のようにコマンドを入力して playwright.config.ts ファイルの webServer に書かれたサービスを起動してから、
Testing ビューを操作してください。

```bash
# ToDoサービスを起動する
cd frontend
npx playwright test --debug

# 新しいターミナルから VSCode を開く
code frontend

# Playwright 拡張機能をインストールして、Testing ビューを使う
```

### テストの構成

レイヤーごとに1ファイル・1テストずつ配置しています。

**ddd-backend-lightweight-full**

| ファイル | レイヤー | テスト内容 |
| --- | --- | --- |
| `domain/entities/__tests__/Todo.test.ts` | Domain | 同じタイトルへの変更はエラーにならない |
| `application/use-cases/__tests__/TodoUseCase.test.ts` | Application | 前後の空白を含むタイトルも重複とみなされる |
| `infrastructure/repositories/__tests__/TodoInMemoryDatabase.test.ts` | Infrastructure | `findAll` は作成日時の新しい順に返す |

**ca-backend-lightweight-full**

| ファイル | レイヤー | テスト内容 |
| --- | --- | --- |
| `entities/__tests__/Todo.test.ts` | Entities | 前後に空白があるタイトルは trim されて保存される |
| `use-cases/__tests__/TodoUseCase.test.ts` | Use Cases | 重複タイトルのエラーは例外にならず `presentError` 経由で返る |
| `interface-adapters/gateway/__tests__/TodoInMemoryDatabase.test.ts` | Interface Adapters | `findAll` は作成日時の新しい順に返す |

**frontend（E2E）**

| ファイル | テスト内容 |
| --- | --- |
| `e2e/todo.spec.ts` | ToDoを作成してステータスを完了にして削除できる |

### `__tests__` フォルダーについて

Vitest（および Jest）はデフォルトで `**/__tests__/**` というパターンをテストファイルとして認識します。

また、`*.test.ts` というファイル名も同様に認識され、`__tests__` フォルダーを作らずテスト対象と同じ場所に並べる書き方も一般的です。

```
# __tests__ フォルダーにまとめる（本プロジェクトの方針）
domain/entities/
├── Todo.ts
└── __tests__/
    └── Todo.test.ts

# テスト対象と同じ場所に並べる（別の一般的な慣習）
domain/entities/
├── Todo.ts
└── Todo.test.ts
```

## shared の構成

```
shared/src/
├── domain/todo.ts   # ドメインの型・ロジック（TodoStatus、StatusAction、validateTitle など）
└── api/todo.ts      # API契約の型（TodoJson、CreateTodoRequest など）
```

`domain/` はフロントエンドとバックエンドで共有するドメインの知識です。
`api/` はフロントエンドとバックエンド（プレゼンテーション層）の間の契約です。

## DDDバックエンドの構成

Eric Evans「Domain-Driven Design」の概念に基づいています。

```
ddd-backend-{lightweight,normal}/src/
├── domain/
│   ├── entities/         # Todo（エンティティ）
│   ├── value-objects/    # TodoTitle、TodoStatus（値オブジェクト）
│   ├── repositories/     # TodoRepository（リポジトリインターフェース）※ normal のみ
│   └── services/         # TodoDomainService（ドメインサービス）
├── application/
│   └── use-cases/        # TodoUseCase（アプリケーションサービス）
├── infrastructure/
│   └── repositories/     # TodoInMemoryDatabase（リポジトリ実装）
└── presentation/         # TodoPresentation（Expressルーティング）
```

アプリケーション層（`TodoUseCase`）が `TodoJson` への変換を担います。
プレゼンテーション層はExpressのルーティングのみを担当します。

### lightweight と normal の違い（DDD）

**lightweight**では `TodoUseCase` と `TodoDomainService` が `TodoInMemoryDatabase` クラスの型に依存します。これによりドメインは永続化の実装を知らず、差し替えが容易です。

```typescript
// lightweight: クラスの型に依存
constructor(
  private readonly database: TodoInMemoryDatabase,
  private readonly domainService: TodoDomainService
) {}
```

**normal**では `TodoRepository` インターフェースを介して依存します。
これにより `TodoUseCase` や `TodoDomainService` は永続化の実装を知らず、差し替えが容易です。

```typescript
// normal: インターフェースに依存
constructor(
  private readonly repo: TodoRepository,   // ← domain層で定義されたインターフェース
  private readonly domainService: TodoDomainService
) {}
```

## クリーンアーキテクチャバックエンドの構成

Robert C. Martin「The Clean Architecture」の概念に基づいています。
https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html

```
ca-backend-{lightweight,normal}/src/
├── entities/             # Todo（エンティティ）
├── use-cases/
│   ├── ports/            # TodoInputPort、TodoOutputPort、TodoGatewayPort（境界のインターフェース）※ normal のみ
│   └── TodoUseCase.ts    # ユースケース（エンティティをOutput Portに渡す）
├── interface-adapters/
│   ├── gateways/         # TodoInMemoryDatabase（Gateway の実装）
│   └── controllers-and-presenters/  # TodoWebAPI（Expressルーティング・Output Port 実装）
└── frameworks/           # ※ lightweight のみ（normal では interface-adapters に統合）
    └── repositories/     # TodoInMemoryDatabase（Gateway の実装）
```

ユースケースはエンティティをOutput Portに渡し、`TodoJson` への変換はPresenter（Interface Adapters層）が担います。
これにより依存の方向がすべて内側を向き、ユースケースとエンティティはフレームワークを一切知りません。

### lightweight と normal の違い（クリーンアーキテクチャ）

**lightweight**ではポートとゲートウェイのインターフェースを省略し、型に依存します。

```typescript
// lightweight: クラスの型に依存、OutputPortもクラスの型をimport
import type { TodoInMemoryDatabase } from '@src/frameworks/repositories/TodoInMemoryDatabase';
import type { ExpressTodoOutputPort } from '@src/interface-adapters/presenters/TodoWebAPI';

constructor(private readonly gateway: TodoInMemoryDatabase) {}
```

**normal**では `TodoInputPort` / `TodoOutputPort` / `TodoGateway` の3つのインターフェースを定義し、
ユースケースはこれらに依存します。

```typescript
// normal: すべてインターフェースに依存
import { TodoGatewayPort } from '@src/use-cases/ports/TodoGatewayPort';
import { TodoInputPort } from '@src/use-cases/ports/TodoInputPort';
import { TodoOutputPort } from '@src/use-cases/ports/TodoOutputPort';

export class TodoUseCase implements TodoInputPort {
  constructor(private readonly gateway: TodoGatewayPort) {}
}
```

また **normal** では `TodoPresentation` のコンストラクターが `TodoInputPort` を受け取るため、
`TodoUseCase` の具象クラスを直接知らなくても組み立てられますが、メインで組み立てる指示を出す側は具象クラスを指示する必要があり、**lightweight**との違いはほとんどありません。


## アーキテクチャ比較

### lightweight vs normal

| 観点 | lightweight | normal |
| --- | --- | --- |
| リポジトリの依存先 | 具象クラスの型（`TodoInMemoryDatabase`） | インターフェース（`TodoRepository` / `TodoGateway`） |
| ユースケースの型付け | 具象クラスを `import type` | インターフェースを `import` と `implements` |
| ドメインのバージョンアップ | 具象クラスを編集 | インターフェースと具象クラスを編集 |
| プレゼンターの依存先 | 具象クラスの型（`TodoUseCase`） | インターフェース（`TodoInputPort`） |
| OutputPortの定義 | 局所的な型（`ExpressTodoOutputPort`） | インターフェース（`TodoOutputPort`） |
| ファイル数 | 少ない | 多い（インターフェースファイルが増える） |
| テスト容易性 | 高い（型でモック注入が容易） | 高い（インターフェースでモック注入が容易） |

### ドメイン駆動開発(DDD) vs クリーンアーキテクチャ(CA)

| 観点 | ドメイン駆動開発 | クリーンアーキテクチャ |
| --- | --- | --- |
| 中心概念 | ドメインモデル | 依存関係のルール |
| 値オブジェクト | あり（TodoTitle、TodoStatus） | なし |
| ドメインサービス | あり（TodoDomainService） | なし |
| ユースケースのスタイル | クラス（TodoJson を返す） | クラス＋Output Port（エンティティを渡す） |
| 変換責任 | Application 層 | Interface Adapters 層（Presenter） |
| 境界の表現 | 型の認識 | Input Port / Output Port インターフェース |
| 最外層の名前 | infrastructure / presentation | frameworks |
