クイック スタート-Azure CLI を使用して AKS クラスターをデプロイする - Azure Kubernetes Service - Microsoft Docs (Web)
https://docs.microsoft.com/ja-jp/azure/aks/kubernetes-walkthrough

azure-vote.yaml/image に書いてある redis と microsoft/azure-vote-front:v1 が使っている Docker イメージです。


## インストール方法 (Windows)

1. Git bash をインストールします。
    - https://git-scm.com/downloads
	- ダウンロードするインストーラーのファイル名の例： `Git-2.27.0-64-bit.exe`
	- bash のインストールは必須です。 それ以外の設定は任意です
2. Node.js のパッケージを ダウンロード フォルダ `${USERPROFILE}\Downloads` の直下に配置します。
	- https://nodejs.org/ja/download/
	- ダウンロードするインストーラーのファイル名の例： `node-v12.18.3-x64.msi`
	- Node.js のバージョンは、後で実行する シェル スクリプト の中の `g_Node_js_Version` 変数の値です
3. Azure CLI のパッケージを ダウンロード フォルダ `${USERPROFILE}\Downloads` の直下に配置します。
	- https://azurecliprod.blob.core.windows.net/msi/azure-cli-2.10.1.msi
	- ダウンロードするインストーラーのファイル名の例： `azure-cli-2.10.1.msi`
	- Azure CLI のバージョンは、後で実行する シェル スクリプト の中の `g_AzureCLI_Version` 変数の値です
4. run_install.bat を実行します。
