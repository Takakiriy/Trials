# TypeScript Visual Studio Code

TypeScript のファイルは、src フォルダーにあります。

<!-- Character Encoding: "WHITE SQUARE" U+25A1 is □. -->
<!--
設定:
    __app__: __app__
    __command__: __app-command__
-->

`__app__` は、____です。  #template: `__app__`

<!-- TOC depthFrom:1 -->

- [TypeScript Visual Studio Code](#typescript-visual-studio-code)
  - [使い方](#使い方)
  - [インストール](#インストール)
    - [Windows の場合](#windows-の場合)
    - [mac の場合](#mac-の場合)
  - [（開発者用） 開発環境の構築手順](#開発者用-開発環境の構築手順)
    - [Windows の場合](#windows-の場合-1)
    - [mac の場合](#mac-の場合-1)

<!-- /TOC -->


## 使い方

Windows の場合、__app__.bat をダブルクリックして、下記のように入力します。 <!-- #template: __app__.bat  #-->
mac の場合、__app__.command をダブルクリックして、下記のように入力します。 <!-- #template: __app__.command  #-->

   input .json file path> example.json

各種シェルの場合、format_json コマンドとそのパラメーターを入力します。

<!--
__app__ をインストールしてから、シェルで実行します。

    __app__  __Path__
-->


## インストール

__app__ を使うには Node.js のインストールが必要です。

### Windows の場合

    Node.js をインストールします:
        - https://nodejs.org/ja/download/ >> Windows Installer (.msi) >> 64-bit
        - ダウンロードしたファイル（例：node-v14.16.0-x64.exe）を開きます
        - インストール オプションはデフォルトを使用

    社内など、プロキシがある LAN に Windows がある場合:
        Windows スタート >> PowerShell（と入力）:
            npm config -g set proxy "http://___.___.___.___:____"
            npm config -g set https-proxy "http://___.___.___.___:____"

    __app__ をダウンロードして展開し、__app__ が使う Node.js パッケージをインストールします:
        Windows スタート >> PowerShell（と入力）:
            cd  ${env:USERPROFILE}\Downloads
            Invoke-WebRequest  https://github.com/Takakiriy/__app__/archive/refs/heads/master.zip -OutFile __app__.zip
            rm -r -fo  "__app__-master"  #// 更新するとき
            Expand-Archive -Path __app__.zip -DestinationPath "."
            cd  "__app__-master"

            npm install --only=production

    PowerShell を使う場合:
        PowerShell の PATH が通ったフォルダーに __app__ を起動する PS1 スクリプト ファイル を作ります:
            Windows スタート >> PowerShell（と入力） :
                cd  ${env:USERPROFILE}\Downloads\__app__-master
                ${current_folder} = Convert-Path "."
                ${__app___folder} = "${env:USERPROFILE}\Documents\__app__"
                ${script} = "${env:USERPROFILE}\AppData\Local\Microsoft\WindowsApps\__app__.ps1"

                echo  "`${env:NODE_PATH} = `"${current_folder}\node_modules`"" > ${script}
                echo  "node  ${current_folder}\build\__app__.js `$PsBoundParameters.Values `$args" >> ${script}

                Set-ExecutionPolicy  RemoteSigned  -Scope CurrentUser  #// スクリプトを実行できるようにします

    Git bash を使う場合:
        Git for Windows をインストールします:
            - https://git-scm.com/ >> Downloads >> Windows
            - ダウンロードしたファイル（例：Git-2.31.1-64-bit.exe）を開く
            - Next を8回押す
            - Configuring the line ending conversions: Checkout as-is, commit as-is
            - 他のインストール オプションはデフォルトを使用
        PATH が通ったフォルダーに __app__ を起動する bash スクリプト ファイル を作ります:
            フォルダーを右クリック >> Git bash :
                cd  ${HOME}/Downloads/__app__-master
                current_folder="$(pwd)"
                __app___folder="${HOME}/Documents/__app__"
                script="${HOME}/bin/__app__"
                mkdir -p "${HOME}/bin"

                echo  "export NODE_PATH=\"${HOME}/AppData/Roaming/npm/node_modules\"" > ${script}
                echo  "node  ${current_folder}/build/__app__.js \"\$@\"" >> ${script}

    __app__ が使えることを確認します:
        PowerShell または Git bash を新しく開いて:
            __app__ --version

### mac の場合

    Node.js をインストールします:
        - https://nodejs.org/ja/download/ >> macOS Installer (.pkg) >> 64-bit
        - ダウンロードしたファイル（例：node-v14.16.0.pkg）を開きます
        - インストール オプションはデフォルトを使用

    __app__ をダウンロードして展開し、__app__ が使う Node.js パッケージをインストールします:
        #// Launchpad >> Terminal
        cd  ~/Downloads
        setopt interactivecomments
            #// enables comment symbol (#)
        curl -o __app__.zip -kL https://github.com/Takakiriy/__app__/archive/refs/heads/master.zip 
        rm -rf  __app__-old  &&  mv  __app__  __app__-old  #// 更新するとき
        unzip -o __app__.zip
        mv  __app__-master  __app__  #// Zip ファイルを展開したフォルダー
        cd  __app__

        npm install --only=production

    PATH が通ったフォルダーに __app__ を起動する スクリプト ファイル を作ります:
        cd __app__  #// Zip ファイルを展開したフォルダー
        script="$HOME/bin/__app__"
        rm -f "${script}"  #// 更新するとき
        echo "export  NODE_PATH=$(pwd)/node_modules" >> "${script}"
        echo "node  $(pwd)/build/__app__.js \"\$@\"" >> "${script}"
        chmod +x "${script}"
        unset script

    __app__ が使えることを確認します:
        __app__ --version


## （開発者用） 開発環境の構築手順

### Windows の場合

Node.js をインストールします:

    - https://nodejs.org/ja/download/ >> Windows Installer (.msi) >> 64-bit
    - ダウンロードしたファイル（例：node-v14.16.0-x64.exe）を開きます
    - インストール オプションはデフォルトを使用

Git for Windows をインストールします:

    - https://git-scm.com/ >> Downloads >> Windows
    - ダウンロードしたファイル（例：Git-2.31.1-64-bit.exe）を開く
    - Next を8回押す
    - Configuring the line ending conversions: Checkout as-is, commit as-is
    - 他のインストール オプションはデフォルトを使用

Visual Studio Code をインストールします:

    - https://code.visualstudio.com/
    - ダウンロードしたファイル（例：VSCodeUserSetup-x64-1.54.3.exe）を開きます
    - インストール オプションはデフォルトを使用
    - VSCode >> Terminal >> New Terminal
    - 開いたシェルの右上に 1:powershell が表示されていたら、そこをクリックして Select Default Shell >> Git bash
    - （推奨）Visual Studio Code をタスクバーにピン止めします:
    - （推奨）Ctrl + S キーを押したときに全てのファイルを保存するように設定します: |
        File >> Preferences >> Keyboard Shortcuts >> save all （と入力） >>
            File: Save All （をダブルクリック） >> Ctrl + S キー >> Enter キー
    - Visual Studio Code を閉じます

Visual Studio Code で try_TypeScript_Node_js フォルダーを開きます:

    - Visual Studio Code に try_TypeScript_Node_js フォルダーをドラッグ＆ドロップする場合:
        - Visual Studio Code を開きます（New Window）
        - フォルダーを Visual Studio Code にドラッグ＆ドロップします
    - Visual Studio Code のメニューから開く場合:
        - Visual Studio Code を開きます（New Window）
        - File メニュー >> Open Folder...
        - ___\try_TypeScript_Node_js
    - PowerShell から開く場合:
        - Windows スタート >> PowerShell（とキーボードから入力）
        - code "___\try_TypeScript_Node_js"

node_modules フォルダーを復帰します:

    - Visual Studio Code メニュー >> Terminal >> New Terminal
    - npm ci

F5 キーを押すと、テストが動きます:


### mac の場合

Node.js をインストールします:

    - https://nodejs.org/ja/download/ >> macOS Installer (.pkg)
    - ダウンロードしたファイル（例：node-v14.16.0.pkg）を開きます
    - インストール オプションはデフォルトを使用

Visual Studio Code をインストールします:

    - https://code.visualstudio.com/
    - ダウンロードしたファイル（例：Visual Studio Code.app）をダブルクリックします
    - （推奨）Visual Studio Code を Dock に移動します:
    - （推奨）Ctrl + S キーを押したときに全てのファイルを保存するように設定します: |
        Code >> Preferences >> Keyboard Shortcuts >> save all （と入力） >>
            File: Save All （をダブルクリック） >> Command + S キー >> Enter キー
    - Visual Studio Code を閉じます

Visual Studio Code で try_TypeScript_Node_js フォルダーを開きます:

    - Visual Studio Code に try_TypeScript_Node_js フォルダーをドラッグ＆ドロップする場合:
        - Visual Studio Code を開きます（New Window）
        - フォルダーを Visual Studio Code にドラッグ＆ドロップします
    - Visual Studio Code のメニューから開く場合:
        - Visual Studio Code を開きます（New Window）
        - File メニュー >> Open Folder...
        - ___\try_TypeScript_Node_js
    - ターミナルから開く場合:
        - Launcher >> ターミナル（とキーボードから入力して選択）
        - code "___\try_TypeScript_Node_js"

node_modules フォルダーを復帰します:

    - Visual Studio Code メニュー >> Terminal >> New Terminal
    - npm ci

fn + F5 キーを押すと、テストが動きます:
