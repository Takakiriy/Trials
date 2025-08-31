#!/bin/bash

function  ShowHelp() {
    echo  "GitHub Pages の今日の運勢をランダムに更新するスクリプト"
    echo  ""
    echo  "使用方法:"
    echo  "  ${0} [オプション] __HtmlFile__"
    echo  ""
    echo  "引数:"
    echo  "  __HtmlFile__      更新するHTMLファイルのパス"
    echo  ""
    echo  "オプション:"
    echo  "  -h, --help        このヘルプを表示"
    echo  "  -r, --repo-path   GitリポジトリのパスPATH] (デフォルト: カレントディレクトリ)"
    echo  "  -c, --commit-msg  コミットメッセージ [__Message__] (デフォルト: 'Update today's fortune')"
    echo  "  -f, --fortune-id  運勢要素のID [__ElementId__] (デフォルト: 'today-fortune')"
}

#// グローバル変数
RepoPath="."
CommitMessage="Update today's fortune"
FortuneElementId="today-fortune"

#// CLIオプション解析
PositionalArgs=()
while [[ $# -gt 0 ]]; do
    if [[ "$1" == "-h" || "$1" == "--help" ]]; then
        ShowHelp
        exit 0
    elif [[ "$1" == "-r" || "$1" == "--repo-path" ]]; then
        Options_RepoPath="$2"
        shift
        shift
    elif [[ "$1" == "-c" || "$1" == "--commit-msg" ]]; then
        Options_CommitMessage="$2"
        shift
        shift
    elif [[ "$1" == "-f" || "$1" == "--fortune-id" ]]; then
        Options_FortuneElementId="$2"
        shift
        shift
    elif [[ "$1" == -* ]]; then
        Error  "Unknown option $1"
    else
        PositionalArgs+=("$1")
        shift
    fi
done
set -- "${PositionalArgs[@]}"  #// set $1, $2, ...
unset PositionalArgs

#// オプション値の設定
if [[ "${Options_RepoPath}" != "" ]]; then
    RepoPath="${Options_RepoPath}"
fi
if [[ "${Options_CommitMessage}" != "" ]]; then
    CommitMessage="${Options_CommitMessage}"
fi
if [[ "${Options_FortuneElementId}" != "" ]]; then
    FortuneElementId="${Options_FortuneElementId}"
fi

function  Main() {
    local  htmlFile="$1"
    
    #// 引数チェック
    if [[ "${htmlFile}" == "" ]]; then
        Error  "HTMLファイルのパスが指定されていません"
    fi
    
    ValidateEnvironment  "${htmlFile}"
    
    local  newFortune
    newFortune=$( GenerateRandomFortune )  ||  Error  "運勢の生成に失敗しました"
    
    UpdateFortuneInHtml  "${htmlFile}"  "${newFortune}"
    
    CommitAndPushChanges  "${htmlFile}"
    
    echo  "運勢の更新が完了しました: ${newFortune}"
}

function  ValidateEnvironment() {
    local  htmlFile="$1"
    
    #// HTMLファイルの存在チェック
    if [[ ! -f "${htmlFile}" ]]; then
        Error  "HTMLファイルが見つかりません: ${htmlFile}"
    fi
    
    #// Gitリポジトリかどうかチェック
    cd  "${RepoPath}"  ||  Error  "指定されたリポジトリパスにアクセスできません: ${RepoPath}"
    
    if [[ ! -d ".git" ]]; then
        Error  "指定されたパスはGitリポジトリではありません: ${RepoPath}"
    fi
    
    #// git コマンドの存在チェック
    which  git  > /dev/null  2>&1  ||  Error  "gitコマンドが見つかりません"
}

function  GenerateRandomFortune() {
    local  fortunes=(
        "今日は素晴らしい一日になるでしょう！"
        "新しい出会いがあなたを待っています"
        "チャンスを逃さないよう注意深く行動しましょう"
        "今日は創造性が高まる日です"
        "困難な状況も乗り越えられる力があります"
        "周りの人との協力が成功の鍵になります"
        "直感を信じて行動してみましょう"
        "小さな幸せを見つける一日になりそうです"
        "新しいアイデアが浮かびそうな予感です"
        "今日は健康に気を付けて過ごしましょう"
        "予想外の良いニュースが届くかもしれません"
        "今日は学びの多い一日になるでしょう"
        "人とのつながりを大切にする日です"
        "今日の努力が将来の成功につながります"
        "心の平穏を保つことが大切な日です"
    )
    
    local  randomIndex=$(( RANDOM % ${#fortunes[@]} ))
    echo  "${fortunes[${randomIndex}]}"
}

function  UpdateFortuneInHtml() {
    local  htmlFile="$1"
    local  newFortune="$2"
    
    #// HTMLファイル内の運勢要素を更新
    local  tempFile
    tempFile=$( mktemp )  ||  Error  "一時ファイルの作成に失敗しました"
    
    #// sed を使って指定されたIDの要素内のテキストを置換
    sed  -E  "s|(<[^>]*id=[\"']${FortuneElementId}[\"'][^>]*>)[^<]*(</[^>]*>)|\1${newFortune}\2|g"  "${htmlFile}"  >  "${tempFile}"  ||  Error  "HTMLファイルの更新に失敗しました"
    
    mv  "${tempFile}"  "${htmlFile}"  ||  Error  "HTMLファイルの保存に失敗しました"
}

function  CommitAndPushChanges() {
    local  htmlFile="$1"
    
    cd  "${RepoPath}"  ||  Error  "リポジトリディレクトリへの移動に失敗しました"
    
    #// 変更をステージング
    git add  "${htmlFile}"  ||  Error  "git add に失敗しました"
    
    #// 変更がある場合のみコミット
    if git diff --cached --quiet; then
        echo  "変更がないため、コミットをスキップします"
        return
    fi
    
    #// コミット
    git commit  -m  "${CommitMessage}"  ||  Error  "git commit に失敗しました"
    
    #// プッシュ
    git push  ||  Error  "git push に失敗しました"
}

function  Error() {
    local  message="$1"
    echo  "エラー: ${message}"  >&2
    exit 1
}

Main  "$@"
