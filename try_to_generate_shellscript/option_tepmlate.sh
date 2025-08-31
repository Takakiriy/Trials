PositionalArgs=()
while [[ $# -gt 0 ]]; do
    case $1 in
        -s|--search-path)  Options_SearchPath="$2"; shift; shift;;  #search: bash default values
        -*) echo "Unknown option $1"; exit 1;;
        *) PositionalArgs+=("$1"); shift;;
    esac
done
set -- "${PositionalArgs[@]}"  #// set $1, $2, ...
unset PositionalArgs

echo "\$SearchPath = \"${Options_SearchPath}\""
echo "\$1          = \"$1\""
echo "\$2          = \"$2\""
