# Azure CLI インストール スクリプト（Visual Studio Code なし）

このスクリプトは、以下をインストールします。

	- Node.js
	- .NET Core SDK
	- Azure CLI
	- Azure Functions Core Tools

Azure CLI のバージョンは、`scripts.sh` ファイルの中の変数 `g_AzureCLI_Version` の値です。
Azure Functions Core Tools のバージョンは、最新バージョンです。


## Azure Functions（関数アプリ）を試す

1. Azure Functions Core Tools （上記）をインストールします
2. プロジェクトとするフォルダーを新規作成します
3. Visual Studio Code で新規作成したフォルダーを開き、以下の拡張機能をインストールします。
   - Azure Functions (0.24.0)
   - C# (1.23.1)
4. 続きは、下記リンク先を参照
    - Visual Studio Code を使用して Azure で初めての関数を作成する - Microsoft Docs (Web)
    https://docs.microsoft.com/ja-jp/azure/azure-functions/functions-create-first-function-vs-code?pivots=programming-language-csharp


## bash を開く

インストールしたコマンドが使える bash を開くには、インストールした後で、
開発するプロジェクトのフォルダーを `run_open.bat` ファイルにドラッグ＆ドロップします。
インストールしたコマンドが使える bash を開くには、インストールした後で、開発するプロジェクトのフォルダーを `run_open.bat` ファイルにドラッグ＆ドロップします。


# Visual Studio Code で Azure CLI を使えるようにする

script.sh ファイルは使いません。

1. Docker for Windows をインストール https://docs.docker.com/
  Kubernetes もインストールされます
2. Git をインストール (例: Git-2.27.0-64-bit.exe) https://git-scm.com/downloads
3. Azure CLI をインストール (例: azure-cli-2.10.1.msi) https://docs.microsoft.com/ja-jp/cli/azure/install-azure-cli-windows?view=azure-cli-latest&tabs=azure-cli
4. Visual Studio Code (VSCode) をインストール (例： VSCodeUserSetup-x64-1.48.2.exe) https://code.visualstudio.com/docs/?dv=win
5. VSCode の次のエクステンションをインストール: "Docker", "Kubernetes", "Azure Tools", "Azure Kubernetes Service"

以上で、VSCode のターミナルで、docker, docker-compose, kubectl コマンドが使えます。
