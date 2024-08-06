# 記述中

## Overview

Frontend: Remix (TypeScript)

Backend: tonic (Rust)

This is a chat app that receives reply messages using gRPC(Server Streaming RPC).

Server Streaming RPCで返信を受け取るチャットアプリです。

## Frontend

### Tools

**Biome**:

Used for formatting/linting.

フォーマッターとリンターはBiomeを使用しています。

**Vitest**:

Used for Testing.

自動テストはVitestを導入しています。

**Githooks:**

I use Git hooks to run Biome checks and tests with Vitest before committing.

There are managed using Lefthook.(https://github.com/evilmartians/lefthook)

コミット前にBiomeでのチェックとVitestのテストを実行しています。

Lefthookを使用して、Githooksを管理しています。
