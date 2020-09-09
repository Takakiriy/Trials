#!/bin/bash
#// Character Encoding: "WHITE SQUARE" U+25A1 is □.
set -eE
#// -eE option breaks execution, when an error was occurred.

#********************************************************************
#* File: scripts.sh
#    Type "./scripts.sh" in Windows git bash.
#********************************************************************

#// Setting
#//==================================================================

export  g_Node_js_Version="12.18.3"

export  g_AzureCLI_Version="2.10.1"

export  g_DotNET_Core_SDK_Version="2.1.809"
export  g_DotNET_Core_SDK_UninstallerVersion="1.1.122401"
#//==================================================================


#********************************************************************
# Function: Main_func
#********************************************************************
function  Main_func()
{
	if [ "$1" == ""  -o  "$1" == "setup" ]; then
		SetUp_func
	elif [ "$1" == "set-path" ]; then
		SetVariables_func  "$2"
	elif [ "$1" == "clean"  -o  "$1" == "cleanup" ]; then
		CleanUp_func
	elif [ "$1" == "uninstall" ]; then
		Uninstall_func
	else
		Error_func  "Unknown command name: $1"
	fi
	return  0
}


#********************************************************************
# Function: SetUp_func
#********************************************************************
function  SetUp_func()
{
	SetUpVariables_func
	SetUpVariables_Node_js_func
	SetUpVariables_AzureFunctionsCoreTools_func
	SetUpVariables_AzureCLI_func
	SetUpVariables_DotNET_Core_SDK_func

	#// Skip
if false; then #// "Skipped"
echo "Skipped"  ;fi

	#// Install
	Install_Node_js_func
	Install_DotNET_Core_SDK_func
	Install_AzureCLI_func
	Install_AzureFunctionsCoreTools_func
}


#********************************************************************
# Function: CleanUp_func
#********************************************************************
function  CleanUp_func()
{
	EchoNextCommand_func

	rm -rf  "node_modules"
}


#********************************************************************
# Function: Uninstall_func
#********************************************************************
function  Uninstall_func()
{
	SetUpVariables_func
	SetUpVariables_Node_js_func
	SetUpVariables_AzureFunctionsCoreTools_func
	SetUpVariables_AzureCLI_func
	SetUpVariables_DotNET_Core_SDK_func


	#// Uninstall
	UnInstallWithConfirm_AzureFunctionsCoreTools_func
	UnInstallWithConfirm_AzureCLI_func
	Uninstall_DotNET_Core_SDK_func
	UninstallWithConfirm_Node_js_func
}


#********************************************************************
# Function: SetUpVariables_AzureFunctionsCoreTools_func
#********************************************************************
function  SetUpVariables_AzureFunctionsCoreTools_func()
{
	export  g_AzureFunctionsCoreTools_DependenciesTitle="AzureFunctionsCoreTools"
	export  g_AzureFunctionsCoreTools_Dependencies=( "Azure_Functions_Core_Tools" "Node.js" )

	#// PATH is g_NodePrefix
}


#********************************************************************
# Function: Install_AzureFunctionsCoreTools_func
#    Install Azure CLI
#********************************************************************
function  Install_AzureFunctionsCoreTools_func()
{
	if [ ! -e "${g_NodePrefix}/func" ]; then
		echo  ""
		ColorEcho_func  "Install Azure Functions Core Tools ...\n"  "Green"
		EchoNextCommand_func

		npm install -g  azure-functions-core-tools
		AddDependencies_func \
			"${g_AzureFunctionsCoreTools_DependenciesTitle}" \
			"${g_AzureFunctionsCoreTools_Dependencies[@]}"
	fi
}

#********************************************************************
# Function: UnInstall_AzureFunctionsCoreTools_func
#********************************************************************
function  UnInstall_AzureFunctionsCoreTools_func()
{
	if [ -e "${g_NodePrefix}/func" ]; then
		GetSharedDependencies_func \
			"${g_AzureFunctionsCoreTools_DependenciesTitle}" \
			"${g_AzureFunctionsCoreTools_Dependencies[@]}"  #// g_SharedDependencies = .
		EchoNextCommand_func

		npm uninstall -g  azure-functions-core-tools
		RemoveDependencies_func  "${g_AzureFunctionsCoreTools_DependenciesTitle}"
	fi
}

#********************************************************************
# Function: UnInstallWithConfirm_AzureFunctionsCoreTools_func
#********************************************************************
function  UnInstallWithConfirm_AzureFunctionsCoreTools_func()
{
	echo  ""
	ColorEcho_func  "Uninstall Azure Functions Core Tools ...\n"  "Green"
	if [ ! -e "${g_NodePrefix}/func" ]; then
		echo  "Already uninstalled"
	fi
	Pause_func
	if [ -e "${g_NodePrefix}/func" ]; then

		UnInstall_AzureFunctionsCoreTools_func
	fi
}


#********************************************************************
# Function: SetUpVariables_AzureCLI_func
#********************************************************************
function  SetUpVariables_AzureCLI_func()
{
	export  g_AzureCLI_PATH="/c/Program Files (x86)/Microsoft SDKs/Azure/CLI2/wbin"
	export  g_AzureCLI_DependenciesTitle="AzureCLI"
	export  g_AzureCLI_Dependencies=( "AzureCLI" "Node.js" )
	export  g_AzureCLI_Installer="${USERPROFILE}\\Downloads\\azure-cli-${g_AzureCLI_Version}.msi"

	export  PATH="$PATH:${g_AzureCLI_PATH}"  #// az command
}


#********************************************************************
# Function: Install_AzureCLI_func
#    Install Azure CLI
#********************************************************************
function  Install_AzureCLI_func()
{
	if [ ! -e "${g_AzureCLI_PATH}" ]; then

		#// Guard
		if [ ! -e "${g_AzureCLI_Installer}" ]; then
			echo  ""
			echo  "Download Azure CLI installer and copy it to this folder."
			echo  "https://azurecliprod.blob.core.windows.net/msi/azure-cli-${g_AzureCLI_Version}.msi"
			echo  "Azure CLI ${g_AzureCLI_Version} \"${g_AzureCLI_Installer}\""
			echo  ""
			Error_func  "Not found Azure CLI ${g_AzureCLI_Version} installer at ${g_AzureCLI_Installer}"
		fi


		#// Install Azure CLI
		echo  ""
		ColorEcho_func  "Install Azure CLI ...\n"  "Green"
		if IsWindows_func; then
			EchoNextCommand_func

			msiexec.exe -i "${g_AzureCLI_Installer}" -qr
			AddDependencies_func  "${g_AzureCLI_DependenciesTitle}"  "${g_AzureCLI_Dependencies[@]}"
		fi
	fi
}


#********************************************************************
# Function: UnInstall_AzureCLI_func
#********************************************************************
function  UnInstall_AzureCLI_func()
{
	if [ -e "${g_AzureCLI_PATH}" ]; then
		EchoNextCommand_func

		msiexec.exe -x  "${g_AzureCLI_Installer}"  -qr
		EchoNextCommand_func

		rm -rf  "${HOME}/.azure"
	fi
	RemoveDependencies_func  "${g_AzureCLI_DependenciesTitle}"
}


#********************************************************************
# Function: UnInstallWithConfirm_AzureCLI_func
#********************************************************************
function  UnInstallWithConfirm_AzureCLI_func()
{
	echo  ""
	ColorEcho_func  "Uninstall Azure CLI ...\n"  "Green"
	GetSharedDependencies_func  "${g_AzureCLI_DependenciesTitle}"  "${g_AzureCLI_Dependencies[@]}"
		#// g_SharedDependencies = .
	if [ -v g_SharedDependencies["AzureCLI"] ]; then
		echo  "Skipped. Because Azure CLI is used by other modules"
	fi
	Pause_func
	if [ ! -v g_SharedDependencies["AzureCLI"] ]; then

		UnInstall_AzureCLI_func
	fi
}


#********************************************************************
# Function: SetUpVariables_DotNET_Core_SDK_func
#********************************************************************
function  SetUpVariables_DotNET_Core_SDK_func()
{
	export  g_DotNET_Core_SDK_Installer="${USERPROFILE}\Downloads\dotnet-sdk-${g_DotNET_Core_SDK_Version}-win-x64.exe"
	export  g_DotNET_Core_SDK_Uninstaller="${USERPROFILE}\Downloads\dotnet-core-uninstall-${g_DotNET_Core_SDK_UninstallerVersion}.msi"
	export  g_DotNET_Core_SDK_Folder=$( cygpath --unix  "C:\\Program Files\\dotnet")
	export  g_DotNET_Core_SDK_UninstallerFolder=$( cygpath --unix  "C:\\Program Files (x86)\\dotnet-core-uninstall")
	export  g_DotNET_Core_SDK_DependenciesTitle="DotNET_Core_SDK"
	export  g_DotNET_Core_SDK_Dependencies=( ".NET_Core_SDK" )
}


#********************************************************************
# Function: Install_DotNET_Core_SDK_func
#********************************************************************
function  Install_DotNET_Core_SDK_func()
{
	if [ ! -e "${g_DotNET_Core_SDK_Folder}/dotnet.exe" ]; then

		#// Guard
		if [ ! -e "${g_DotNET_Core_SDK_Installer}" ]; then
			echo  ""
			echo  "Download .NET SDK installer and copy it to this folder."
			echo  "https://docs.microsoft.com/dotnet/core/install/windows"
			echo  ".NET SDK ${g_DotNET_Core_SDK_Version} \"${g_DotNET_Core_SDK_Installer}\""
			echo  ""
			Error_func  "Not found .NET SDK ${g_DotNET_Core_SDK_Version} installer at ${g_DotNET_Core_SDK_Installer}"
		fi


		#// Install .NET SDK
		echo  ""
		ColorEcho_func  "Install .NET SDK ...\n"  "Green"
		EchoNextCommand_func

		"${g_DotNET_Core_SDK_Installer}"  -quiet
		AddDependencies_func  "${g_DotNET_Core_SDK_DependenciesTitle}"  "${g_DotNET_Core_SDK_Dependencies[@]}"
	fi
}


#********************************************************************
# Function: Uninstall_DotNET_Core_SDK_func
#********************************************************************
function  Uninstall_DotNET_Core_SDK_func()
{
	if [ -e "${g_DotNET_Core_SDK_Folder}/dotnet.exe" ]; then

		#// Install .NET SDK Uninstaller
		if [ ! -e "${g_DotNET_Core_SDK_UninstallerFolder}/dotnet-core-uninstall.exe" ]; then
			CheckExistsUninstallerOf_DotNET_Core_SDK_func
			EchoNextCommand_func

			msiexec.exe -i  "${g_DotNET_Core_SDK_Uninstaller}" -qr
		fi

		#// Uninstall .NET SDK
		echo "${g_DotNET_Core_SDK_UninstallerFolder}"
		local  uninstaller=$( cygpath --windows  "${g_DotNET_Core_SDK_UninstallerFolder}/dotnet-core-uninstall.exe")
		echo "${uninstaller}"
		EchoNextCommand_func

		powershell -command start-process "\"${uninstaller}\" \"remove ${g_DotNET_Core_SDK_Version}  -y --sdk\"" \
			-verb runas -wait
	fi

	#// Uninstall .NET SDK Uninstaller
	if [ -e "${g_DotNET_Core_SDK_UninstallerFolder}/dotnet-core-uninstall.exe" ]; then
		CheckExistsUninstallerOf_DotNET_Core_SDK_func
		EchoNextCommand_func

		msiexec.exe -x  "${g_DotNET_Core_SDK_Uninstaller}" -qr
	fi
	RemoveDependencies_func  "${g_DotNET_Core_SDK_DependenciesTitle}"
}


#********************************************************************
# Function: UninstallWithConfirm_DotNET_Core_SDK_func
#********************************************************************
function  UninstallWithConfirm_DotNET_Core_SDK_func()
{
	if IsWindows_func; then
		echo  ""
		ColorEcho_func  "Uninstall .NET Core SDK ...\n"  "Green"
		GetSharedDependencies_func  "${g_DotNET_Core_SDK_DependenciesTitle}"  "${g_DotNET_Core_SDK_Dependencies[@]}"
			#// g_SharedDependencies = .
		if [ -v g_SharedDependencies[".NET_Core_SDK"] ]; then
			echo  "Skipped. Because Node.js is used by other modules"
		fi
		Pause_func
		if [ ! -v g_SharedDependencies[".NET_Core_SDK"] ]; then

			Uninstall_DotNET_Core_SDK_func
		fi
	fi
}


#********************************************************************
# Function: CheckExistsUninstallerOf_DotNET_Core_SDK_func
#********************************************************************
function  CheckExistsUninstallerOf_DotNET_Core_SDK_func()
{
	if [ ! -e "${g_DotNET_Core_SDK_Uninstaller}" ]; then
		echo  ""
		echo  "Download .NET SDK uninstaller and copy it to this folder."
		echo  "https://github.com/dotnet/cli-lab/releases"
		echo  ".NET SDK ${g_DotNET_Core_SDK_UninstallerVersion} \"${g_DotNET_Core_SDK_Uninstaller}\""
		echo  ""
		Error_func  "Not found .NET SDK Uninstaller ${g_DotNET_Core_SDK_UninstallerVersion} at ${g_DotNET_Core_SDK_Uninstaller}"
	fi
}


#********************************************************************
# Function: SetUpVariables_Node_js_func
#********************************************************************
function  SetUpVariables_Node_js_func()
{
	if IsWindows_func; then
		export  g_Node_js_Installer="${USERPROFILE}\Downloads\node-v${g_Node_js_Version}-x64.msi"
	else
		export  g_Node_js_Installer="${HOME}/Downloads/node-v${g_Node_js_Version}-linux-x64.tar.xz"
		export g_Node_js_FolderName="${HOME}/Downloads/node-v${g_Node_js_Version}-linux-x64"
	fi
	if IsWindows_func; then
		export  NODE_HOME="/c/Program Files/nodejs"
		export  NODE_PATH="${NODE_HOME}/node_modules/npm/node_modules"
		export  g_NodePrefix="${HOME}/AppData/Roaming/npm"
		export  g_NodePrefixForWindows="${USERPROFILE}\AppData\Roaming\npm"
	else
		export  NODE_HOME="${g_ParentPathOfThisScript}/${g_Node_js_FolderName}"
		export  NODE_PATH="${NODE_HOME}/lib/node_modules"
		export  g_NodePrefix="${NODE_HOME}/lib"
	fi
	export  g_Node_js_DependenciesTitle="Node_js"
	export  g_Node_js_Dependencies=( "Node.js" )

	#// Add PATH values
	if IsWindows_func; then
		export  PATH="$PATH:${g_NodePrefix}:/c/Program Files/nodejs:${NODE_HOME}/node_modules/npm/bin"
	else
		export  PATH="$PATH:${NODE_HOME}/bin:${NODE_PATH}/.bin"
	fi
}


#********************************************************************
# Function: Install_Node_js_func
#    Install Node.js
#
# Description:
#    This was synchronized with "Snippets\for-bash\installer\Node_js\scripts.sh" in 2020-08-24 commit next to 53ad2e99.
#********************************************************************
function  Install_Node_js_func()
{
	if [ ! -e "${NODE_HOME}/npm" ]; then

		#// Guard
		if [ ! -e "${g_Node_js_Installer}" ]; then
			echo  ""
			echo  "Download Node.js installer and copy it to this folder."
			echo  "https://nodejs.org/ja/download/releases/ or https://nodejs.org/en/download/"
			echo  "Node.js ${g_Node_js_Version} \"${g_Node_js_Installer}\""
			echo  ""
			Error_func  "Not found Node.js ${g_Node_js_Version} installer at ./${g_Node_js_Installer}"
		fi


		#// Install Node.js
		echo  ""
		ColorEcho_func  "Install Node.js ...\n"  "Green"
		if IsWindows_func; then

			Clear_Node_js_func
			EchoNextCommand_func

			echo  "prefix=${g_NodePrefixForWindows}" > "${HOME}/.npmrc"  #// npm set prefix
			EchoNextCommand_func

			msiexec.exe -i "${g_Node_js_Installer}" -qr
			EchoNextCommand_func

			npm config set script-shell  "C:\\Program Files\\Git\\usr\\bin\\bash.exe"
		else
			EchoNextCommand_func

			tar Jxfv  "${g_Node_js_Installer}" > /dev/null
		fi
		AddDependencies_func  "${g_Node_js_DependenciesTitle}"  "${g_Node_js_Dependencies[@]}"
	fi
}


#********************************************************************
# Function: Uninstall_Node_js_func
#********************************************************************
function  Uninstall_Node_js_func()
{
	if [ -e "${NODE_HOME}/npm" ]; then
		EchoNextCommand_func

		msiexec.exe -x  "${g_Node_js_Installer}" -qr
	fi
	RemoveDependencies_func  "${g_Node_js_DependenciesTitle}"

	Clear_Node_js_func
}


#********************************************************************
# Function: UninstallWithConfirm_Node_js_func
#********************************************************************
function  UninstallWithConfirm_Node_js_func()
{
	if IsWindows_func; then
		echo  ""
		ColorEcho_func  "Uninstall Node.js and node_modules folder ...\n"  "Green"
		GetSharedDependencies_func  "${g_Node_js_DependenciesTitle}"  "${g_Node_js_Dependencies[@]}"
			#// g_SharedDependencies = .
		if [ -v g_SharedDependencies["Node.js"] ]; then
			echo  "Skipped. Because Node.js is used by other modules"
		fi
		Pause_func
		if [ ! -v g_SharedDependencies["Node.js"] ]; then

			Uninstall_Node_js_func
		fi
	fi
}


#********************************************************************
# Function: Clear_Node_js_func
#********************************************************************
function  Clear_Node_js_func()
{
	EchoNextCommand_func

	rm -rf  "${HOME}\AppData\Roaming\npm-cache"  #// npm cache clean --force
	EchoNextCommand_func

	rm -rf  "${HOME}\AppData\Roaming\npm"
	EchoNextCommand_func

	rm -f  "${HOME}\.npmrc"  #// npm set prefix
}


#********************************************************************
# Function: SetUpVariables_func
#********************************************************************
function  SetUpVariables_func()
{
	export  g_ParentPathOfThisScript="$( pwd )"
	if IsWindows_func; then
		export  HOME=$( cygpath --unix "${USERPROFILE}" )
	fi
}


#********************************************************************
# Function: ShowVariables_func
#********************************************************************
function  ShowVariables_func()
{
	echo  ""
	echo  "Copy and execute these commands to set variables."
	echo  "-------------------------------------------------"
	echo  "    export NODE_HOME=\"${NODE_HOME}\""
	echo  "    export NODE_PATH=\"${NODE_PATH}\""
	echo  "    export PATH=\"${PATH}\""
	echo  "    export g_NodePrefix = ${g_NodePrefix}"
	echo  "-------------------------------------------------"
}


#********************************************************************
# Function: SetVariables_func
#********************************************************************
function  SetVariables_func()
{
	local  start_in_folder_path="$1"
	if [ "${start_in_folder_path}" == "" ];then
		start_in_folder_path="."
	else
		start_in_folder_path=$( cygpath  --unix  "${start_in_folder_path}")
	fi
	SetUpVariables_func
	SetUpVariables_Node_js_func
	SetUpVariables_AzureFunctionsCoreTools_func
	SetUpVariables_AzureCLI_func

	ShowVariables_func
	pushd  "${g_StartInPath}" > /dev/null

	export s_file_path=".s"
	cat  > "${s_file_path}"  <<- __HERE_DOCUMENT__
		export NODE_HOME="${NODE_HOME}"
		export NODE_PATH="${NODE_PATH}"
		export PATH="${PATH}"
		rm "${s_file_path}"
		cd "${start_in_folder_path}"
		__HERE_DOCUMENT__
	echo "To set environment variables, type: source ${s_file_path}"
	popd > /dev/null
}


#********************************************************************
# Section: bashlib
#
# Description:
#    This was synchronized with bashlib in 2020-08-24 commit next to 53ad2e99.
#********************************************************************

#********************************************************************
# Function: Error_func
#    Occurrs an error
#
# Arguments:
#    Error messages
#
# Return Value:
#    None
#********************************************************************
function  Error_func()
{
	ErrClass.getErrStr_method  "$@" ; g_Err_Desc="$g_ReturnValue"
	return_func  1
}


#*********************************************************************
# Function: return_func
#*********************************************************************
function  return_func()
{
	if [ "$g_Err_LineNo" == "???" ];then  g_Err_LineNo=${BASH_LINENO[0]}  ;fi
	return  "$1"
}


#*********************************************************************
# Function: IsWindows_func
#
# Example:
#    if IsWindows_func; then
#        echo  "in Windows"
#    else
#        echo  "in Linux or others"
#    fi
#    if ! IsWindows_func; then  #// If not Windows
#*********************************************************************
function  IsWindows_func()
{
	if [ -e "/c/Windows/" ]; then
		return  ${True}
	else
		return  ${False}
	fi
}


#********************************************************************
# Function: EchoNextCommand_func
#    Enables to show the next executing command
#
# Arguments:
#    None
#
# Return Value:
#    None
#********************************************************************
function  EchoNextCommand_func()
{
	g_DebugTrapFunc="EchoNextTrap_func"
	echo  ""

	trap 'DebugTrap_func  "$LINENO"  "$BASH_COMMAND"  "${PIPESTATUS[@]}"
		#// resume ${PIPESTATUS[@]}
		case "${#g_PipeStatus[@]}" in
			"2")
				return ${g_PipeStatus[0]} | true;;
			"3")
				return ${g_PipeStatus[0]} | return ${g_PipeStatus[1]} | true;;
		esac' DEBUG
}

function  EchoNextTrap_func()
{
	local  line_num="$1"
	local  command="$2"
	shift  2
	g_PipeStatus=( "$@" )
	local  escaped_command="$( echo "$command" | sed -e "s/>/\\\\>/" )"

	echo "${line_num}: \$ ${command}" >&2
	case "${command}" in *\$*)
		echo  "$(eval echo ${line_num}: \$ ${escaped_command})" >&2;;
	esac

	g_DebugTrapFunc=""
}


#********************************************************************
# Function: ColorEcho_func
#    Echos colored text
#
# Arguments:
#    in_Text      - .
#    in_ColorName - .
#
# Return Value:
#    None
#
# Example:
#    > ColorEcho_func  "Pass.\n"  "Green"
#********************************************************************
function  ColorEcho_func()
{
	local  in_Text="$1"
	local  in_ColorName="$2"

	ColorText_func  "${in_Text}"  "${in_ColorName}"
	echo -e -n  "$g_ReturnValue"
}


#********************************************************************
# Function: echo_line_func
#    Echos a line
#
# Arguments:
#    None
#
# Return Value:
#    None
#********************************************************************
function  echo_line_func()
{
	echo "-------------------------------------------------------------------------------"
}


#********************************************************************
# Function: Pause_func
#    Waits until user confirmation
#
# Arguments:
#    None
#
# Return Value:
#    None
#********************************************************************
function  Pause_func()
{
	local  key

	if [ "${LANG}" == "ja_JP.UTF-8" ]; then
		read -p "続行するには Enter キーを押してください . . . "  key
	else
		read -p "Press Enter key to continue ..."  key
	fi
}


#********************************************************************
# Function: ColorText_func
#    Adds the color to the specified text
#
# Arguments:
#    in_Text      - A text
#    in_ColorName - Color name or background color name or bold (1)
#    in_ColorName - Color name or background color name or bold (2)
#         :
#
# Return Value:
#    g_ReturnValue - The color attached text that will be used with echo command
#
# Example:
#    > ColorText_func  "Pass."  "Green"  "Bold"
#    > echo_e_func  "$g_ReturnValue"
#********************************************************************
function  ColorText_func()
{
	local  in_Text="$1"
	shift  1
	local  in_ColorNames=("$@")
	local  i
	local  n
	local  str

	#//=== initialize  g_ColorText_Codes
	if [ "${g_ColorText_Codes["Black"]}" == "" ];then

		#//=== set escape sequence
		g_ColorText_Codes["Black"]=30
		g_ColorText_Codes["Red"]=31
		g_ColorText_Codes["Green"]=32
		g_ColorText_Codes["Yellow"]=33
		g_ColorText_Codes["Blue"]=34
		g_ColorText_Codes["Magenta"]=35
		g_ColorText_Codes["Cyan"]=36
		g_ColorText_Codes["White"]=37

		g_ColorText_Codes["BlackBack"]=40
		g_ColorText_Codes["RedBack"]=41
		g_ColorText_Codes["GreenBack"]=42
		g_ColorText_Codes["YellowBack"]=43
		g_ColorText_Codes["BlueBack"]=44
		g_ColorText_Codes["MagentaBack"]=45
		g_ColorText_Codes["CyanBack"]=46
		g_ColorText_Codes["WhiteBack"]=47

		g_ColorText_Codes["Bold"]=1
	fi

	sequence="\e["
	n=$(( ${#in_ColorNames[@]} - 1 ))
	for (( i = 0;  i <= n;  i++ )) ;do
		local  color_code="${g_ColorText_Codes[${in_ColorNames[$i]}]}"
		if [ "$i" == "$n" ];then
			sequence="${sequence}${color_code}m"
		else
			sequence="${sequence}${color_code};"
		fi
	done ; done_func $?

	g_ReturnValue="${sequence}${in_Text}\e[m"
}

declare -A  g_ColorText_Codes


#********************************************************************
# Function: echo_e_func
#    Echos texts including escape. This is as same as "echo -e"
#
# Arguments:
#    in_Text - Echo texts
#
# Return Value:
#    None
#********************************************************************
function  echo_e_func()
{
	local  in_Text="$@"
	eval echo '$'"'$in_Text'"
}


#********************************************************************
# Function: ErrTrap_func
#    The function called from the error trap
#
# Arguments:
#    None
#
# Return Value:
#    None
#********************************************************************

g_ExitStatus=0
g_ReturnValue=""
g_Ret2=""
g_Ret3=""
g_Err_IsDone=0
g_Err_IsOverwrite=0
g_Err_NestLevel=0
g_Err_ErrID=0
g_Err_Desc=""
g_Err_Desc1st=""
g_Err_LineNo="???"
g_PipeStatus=""
g_DebugTrapFunc=""

function  ErrTrap_func()
{
	local  a1

	if [ "$g_Err_IsDone" == "1" ];then
		g_Err_IsDone=0
	elif [ "$g_Err_IsOverwrite" == "1" ];then
		g_Err_IsOverwrite=0
	else

		g_Err_ErrID=$(( $g_Err_ErrID + 1 ))

		if [ "$g_ExitStatus" == "0" ];then
			if [ "$g_Err_LineNo" == "???" ];then  g_Err_LineNo=$1  ;fi
			if [ "$g_Err_LineNo" == "???" ]; then
				a1="${a1}（ヒント）現在の行番号は、${FUNCNAME[1]} 関数の最初で \"EchoOn_func\" を呼ぶと表示されます。${LF}"
			fi
			a1="${a1}（開発者向けヒント）ステップ実行したいときは、開始するところから \"debugger\" 関数を呼び出してください。 "
			a1="${a1}下記コールツリーの最も下の関数が、\` \` を使って echo 出力を取得しているときは、取得しないようにすると、更にコール先の関数が表示されます。${LF}"
			ErrClass.getCallTree_method  "$g_Err_LineNo"  2  1
			#// g_Err_ErrCallStack="$a1$g_ReturnValue$LF"
			g_Err_ErrCallStack="$g_ReturnValue$LF"
			g_ExitStatus=1
		else
			echo  "<ERROR msg=\"エラー処理中に別のエラーが発生しました。\"/>" >&2

			ErrClass.getErrStr_method  "$g_Err_Desc"
			if [ "$g_ReturnValue" == "" ];then  g_ReturnValue="<ERROR/>"  ;fi
			ColorText_func  "$g_ReturnValue"  "Red" "Bold"
			echo_e_func  "$g_ReturnValue"

			ErrClass.getCallTree_method  "${BASH_LINENO[0]}"  2  1
			echo  "$g_ReturnValue"  >&2
			g_Err_Desc="$g_Err_Desc1st"
		fi


		if [ "$g_Err_Desc" == "" ];then
			ColorText_func  "<ERROR/>"  "Red" "Bold"
		else
			local  error_description="$( echo "$g_Err_Desc" | sed -e "s/\\\\/\\\\\\\\/g" )"  #// Disable escape
			ColorText_func  "$error_description"  "Red" "Bold"
		fi
		echo_e_func  "$g_ReturnValue" >&2
		echo "Exit Status = $g_ExitStatus"  >&2
		echo_line_func
		echo -n "$g_Err_ErrCallStack"  >&2
		if [ "$g_Err_Desc" == "" ];then
			echo  "<ERROR/>"  >&2
		else
			echo  "$g_Err_Desc"  >&2
		fi
		if [ "$is_not_err_handled" == "1" ];then
			echo  "エラー処理がされていません。ErrClass.clear_method または ErrClass.raiseOverwrite_method を呼び出してください"
		fi
		trap ':' EXIT
		if [ "${g_IsSourceCommand}" == "${False}" ]; then

			exit  "$g_ExitStatus"
		else
			cd  "${g_StartInPath}"
			while true; do
				read -p "This script was terminated. Please press Ctrl+C"  dummy_variable
			done
			#// "set -eE; return 1" is same as exit command.
		fi
	fi
}


#********************************************************************
# Function: done_func
#    Raises a raising exception at the end of loop
#
# Arguments:
#    None
#
# Return Value:
#    None
#
# Example:
#    > while true; do
#    >     :
#    > done ; done_func $?
#********************************************************************
function  done_func()
{
	CheckArgCount_func  1 "$@"
	if [ "$1" != "0" ];then  g_Err_IsDone=1  ;fi
	return  "$1"  #// if not 0, throw again
}


 
#********************************************************************
# Function: CheckArgCount_func
#    Checks the count of arguments at the called function
#
# Arguments:
#    None
#
# Return Value:
#    None
#********************************************************************
function  CheckArgCount_func()
{
	local  RequestArgumentCount="$1"
	shift  1
	local  Arguments=( "$@" )
	local  str

	if [ "${#Arguments[@]}" -ne "$RequestArgumentCount" ];then
		str="パラメーターの数が合っていません。 指定=${#Arguments[@]}, 要求=$RequestArgumentCount,"
		str="$str コマンドライン: ${FUNCNAME[1]} ${Arguments[@]}"
		Error_func  "$str"
	fi
}


#*********************************************************************
# Function: AddDependencies_func
#
# Arguments:
#    in_Title        - The name of the owner module
#    in_Dependencies - An array of target module names without spaces
#
# Return Value:
#    None
#
# Example:
#    > AddDependencies_func  "${g_DependenciesTitle}"  "${g_Dependencies[@]}"
#*********************************************************************
function  AddDependencies_func()
{
	local  in_Title="$1"
	shift
	local  in_Dependencies=( $* )
	if [ ! -e "${HOME}/.dependencies" ]; then
		mkdir  "${HOME}/.dependencies"
	fi
	rm -f  "${HOME}/.dependencies/${in_Title}.txt"

	for  module  in  "${in_Dependencies[@]}" ;do
		echo  "${module}" >> "${HOME}/.dependencies/${in_Title}.txt"
	done
}


#*********************************************************************
# Function: GetSharedDependencies_func
#
# Arguments:
#    in_Title        - The name of the owner module
#    in_Dependencies - An array of target module names
#
# Return Value:
#    g_SharedDependencies - An associative array of target module names shared with others
#
# Example:
#    > GetSharedDependencies_func  "${g_DependenciesTitle}"  "${g_Dependencies[@]}"  #// g_SharedDependencies = .
#    > if [ -v g_SharedDependencies["Node.js"] ]; then
#    > if [ ! -v ... ]; then  #// if not shared
#*********************************************************************
function  GetSharedDependencies_func()
{
	local  in_Title="$1"
	shift
	local  in_Dependencies=( $* )
	local -A  dependencies
	for  module  in  "${in_Dependencies[@]}"; do
		dependencies[${module}]="dummy"
	done
	g_SharedDependencies=()

	#// Set the key of "g_SharedDependencies" associative array to the name of the module in the file
	#// "${HOME}/.dependencies" folder of the elements of "in_Dependencies" array.
	#jp:// in_Dependencies 配列の要素のうち、${HOME}/.dependencies フォルダーにあるファイルの中に書かれている
	#jp:// モジュール名を g_SharedDependencies 連想配列のキーに設定します。
	if [ -e "${HOME}/.dependencies" ]; then
		local  file_paths=( $(find  "${HOME}/.dependencies") )

		for  file_path  in  "${file_paths[@]}"; do
			local  is_other_file=${False}
			if [ -f "${file_path}" ]; then  #// Because file_paths has a folder path
				if [ "${file_path}" != "${HOME}/.dependencies/${in_Title}.txt" ]; then
					is_other_file=${True}
				fi
			fi
			if [ ${is_other_file} == ${True} ]; then
				local  line
				local  modules_in_other_files=()
				while read  line; do
					modules_in_other_files=("${modules_in_other_files[@]}" "${line}")
				done < <( cat "${file_path}" )

				for  module  in  "${modules_in_other_files[@]}" ;do
					local  dependencies_has_the_module=${False}
					if [ -v dependencies[${module}] ];then
						dependencies_has_the_module=${True}
					fi
					local  is_shared=${dependencies_has_the_module}

					if [ ${is_shared} == ${True} ]; then
						g_SharedDependencies[${module}]="dummy"
					fi
				done
			fi
		done
	fi
}
declare -A  g_SharedDependencies


#*********************************************************************
# Function: RemoveDependencies_func
#
# Arguments:
#    in_Title - The name of the owner module
#
# Return Value:
#    None
#
# Example:
#    > RemoveDependencies_func  "${g_DependenciesTitle}"
#*********************************************************************
function  RemoveDependencies_func()
{
	local  in_Title="$1"

	rm -f  "${HOME}/.dependencies/${in_Title}.txt"
}


#*********************************************************************
# Function: GetFullPath_func
#
# Arguments:
#    in_RelativePath - in_RelativePath
#    in_BasePath - in_BasePath
#
# Return Value:
#    g_ReturnValue - Full path
#*********************************************************************
function  GetFullPath_func()
{
	local  in_RelativePath="$1"
	local  in_BasePath="$2"

	local  full_path
	local  str

	LeftOfStr_func "$in_RelativePath" "/" ; str="$g_ReturnValue"  #// if full path, str=""
	if [ "$str" == "" ]; then
		g_ReturnValue="$in_RelativePath"
	elif [ "$str" == "~" ]; then
		StringClass.substring_method  "$in_RelativePath"  1
		g_ReturnValue="$HOME$g_ReturnValue"
	else
		if [ "$in_BasePath" == "" ];then  in_BasePath="$PWD"  ;fi

		full_path="$in_BasePath/$in_RelativePath"

		while true; do   #//  "*/../" -> ""
			echo  "$full_path" | grep  "[^/]*/\.\./" > /dev/null  || break
			full_path=`echo "$full_path" | sed -e "s%[^/]*/\.\./%%"`
		done ; done_func $?

		while true; do   #//  "/*/.." -> ""
			echo  "$full_path" | grep  "[^/]*/[^/]*/\.\." > /dev/null  || break
			full_path=`echo "$full_path" | sed -e "s%/[^/]*/\.\.$%%"`
		done ; done_func $?

		while true; do  #//  "/./" -> "/"
			echo  "$full_path" | grep  "/\./" > /dev/null  || break
			StringClass.replace_method  "$full_path"  "/./"  "/" ; full_path="$g_ReturnValue"
		done ; done_func $?

		while true; do  #//  "/." -> ""
			StringClass.right_method  "$full_path"  2
			if [ "$g_ReturnValue" != "/." ];then  break  ;fi
			StringClass.replace_method  "$full_path"  "/./"  "/" ; full_path="$g_ReturnValue"
			full_path=`echo "$full_path" | sed -e "s%/\.$%%"`
		done ; done_func $?

		g_ReturnValue="$full_path"
	fi
}


#*********************************************************************
# Function: GetParentFullPath_func
#*********************************************************************
function  GetParentFullPath_func()
{
	local  in_Path="$1"
	CheckArgCount_func  1 "$@"

	local  str

	LeftOfStr_func "$in_Path" "/" ; str="$g_ReturnValue"  #// if abs path, str=""
	if [ "$str" != "" ]; then
		GetFullPath_func "$in_Path" ; in_Path="$g_ReturnValue"
	fi

	if [ x"$in_Path" == x"/"  -o  x"$in_Path" == x"" ]; then
		g_ReturnValue="$in_Path"
	else
		RightOfLastStr_func "$in_Path" "/"  #// if last char is "/", str=""
		if [ "$g_ReturnValue" == "" ]; then
			LeftOfLastStr_func "$in_Path" "/" ; in_Path="$g_ReturnValue"
		fi
		LeftOfLastStr_func  "$in_Path"  "/" ; in_Path="$g_ReturnValue"  #// parent folder
		if [ "$in_Path" == "" ];then  in_Path="/"  ;fi
		g_ReturnValue="$in_Path"
	fi
}


#*********************************************************************
# Function: LeftOfStr_func
#    Returns the substring to the left of the specified keyword
#
# Arguments:
#    in_String - in_String
#    in_Key    - in_BasePath
#
# Return Value:
#    g_ReturnValue - Full path
#*********************************************************************
function  LeftOfStr_func()
{
	local  in_String="$1"
	local  in_Key="$2"

	StringClass.replace_method  "$in_Key"         '\'  '\\'
	StringClass.replace_method  "$g_ReturnValue"  '*'  '\*'

	g_ReturnValue="${in_String%%$g_ReturnValue*}"
}


#*********************************************************************
# Function: LeftOfLastStr_func
#*********************************************************************
function  LeftOfLastStr_func()
{
	local  in_String="$1"
	local  in_Key="$2"
	CheckArgCount_func  2 "$@"

	StringClass.replace_method  "$in_Key"         '\'  '\\'
	StringClass.replace_method  "$g_ReturnValue"  '*'  '\*'

	g_ReturnValue="${in_String%$g_ReturnValue*}"
}


#*********************************************************************
# Function: RightOfStr_func
#*********************************************************************
function  RightOfStr_func()
{
	local  in_String="$1"
	local  in_Key="$2"
	CheckArgCount_func  2 "$@"

	StringClass.replace_method  "$in_Key"         '\'  '\\'
	StringClass.replace_method  "$g_ReturnValue"  '*'  '\*'

	g_ReturnValue="${in_String#*$g_ReturnValue*}"
}


#*********************************************************************
# Function: RightOfLastStr_func
#*********************************************************************
function  RightOfLastStr_func()
{
	local  in_String="$1"
	local  in_Key="$2"
	CheckArgCount_func  2 "$@"

	StringClass.replace_method  "$in_Key"         '\'  '\\'
	StringClass.replace_method  "$g_ReturnValue"  '*'  '\*'

	g_ReturnValue="${in_String##*$g_ReturnValue}"
}


#*********************************************************************
# Class: ErrClass
#*********************************************************************

#********************************************************************
# Method: ErrClass.raiseOverwrite_method
#    Overwrite the raising error object
#
# Arguments:
#    None
#
# Return Value:
#    None
#********************************************************************
function  ErrClass.raiseOverwrite_method()
{
	local  message ; ErrClass.getErrStr_method  "$@" ; message="$g_ReturnValue"
	local  exit_status="$g_ExitStatus"

	if [ "$message" != "" ];then
		g_Err_Desc="$message"
	fi

	if [ "$exit_status" == "0" ];then
		exit_status=1
	fi

	g_Err_IsOverwrite=1
	return  $exit_status
}


 
#********************************************************************
# Method: ErrClass.clear_method
#    Clears error status
#
# Arguments:
#    None
#
# Return Value:
#    None
#********************************************************************
function  ErrClass.clear_method()
{
	g_ExitStatus=0
	g_Err_Desc=""
	g_Err_Desc1st=""
	g_Err_LineNo="???"
	g_PipeStatus=""
}


 
#********************************************************************
# Method: ErrClass.getErrStr_method
#    Returns the error message
#
# Arguments:
#    None
#
# Return Value:
#    None
#********************************************************************
function  ErrClass.getErrStr_method()
{
	local  Message="$@"

	if [ "$Message" != "" ]; then
		if [ "${Message%%<ERROR *}" == "" ]; then
			g_ReturnValue="$Message"
		else
			StringClass.replace_method  "$Message"  "&"  "&amp;"
			StringClass.replace_method  "$g_ReturnValue"  "<"  "&lt;"
			StringClass.replace_method  "$g_ReturnValue"  "\""  "&quot;"
			g_ReturnValue="<ERROR msg=\"$g_ReturnValue\"/>"
		fi
	else
		g_ReturnValue=""
	fi
}


 
#********************************************************************
# Method: ErrClass.getCallTree_method
#    Returns the call tree text
#
# Arguments:
#    None
#
# Return Value:
#    None
#********************************************************************
function  ErrClass.getCallTree_method()
{
	local  LineNo="$1"
	local  TopIndex="$2"
	local  IsAbleLastCut="$3"
	local  indent=" "
	local  s

	if [ "${LANG}" == "ja_JP.UTF-8" ]; then
		s="コールツリー："
	else
		s="Call tree:"
	fi
	i=$(( ${#FUNCNAME[@]} - 1 ))
	s="$s${LF}""(global) ${BASH_SOURCE[$i]}:${BASH_LINENO[$i-1]}"
	for(( i=${#FUNCNAME[@]} - 2; i > $TopIndex; i-- ));do
		s="$s${LF}${indent}${FUNCNAME[$i]}() ${BASH_SOURCE[$i]}:${BASH_LINENO[$i-1]}"
		indent="${indent} "
	done ; done_func $?

	case  "${FUNCNAME[$TopIndex]}"  in
		"Error_func" | "DebugTrap_func" ) ;;
		*)  IsAbleLastCut=0 ;;
	esac
	if [ "$IsAbleLastCut" != "1" ];then
		if [ "$g_DebugTrapFunc" == "EchoOnTrap_func" ];then
			s="$s${LF}${indent}${FUNCNAME[$TopIndex]}() ${BASH_SOURCE[$TopIndex]}:$LineNo ?(->EchoOn_func)"
		elif [ "$g_DebugTrapFunc" == "EchoNextTrap_func" ];then
			s="$s${LF}${indent}${FUNCNAME[$TopIndex]}() ${BASH_SOURCE[$TopIndex]}:$LineNo ?(->EchoNext_func)"
		else
			s="$s${LF}${indent}${FUNCNAME[$TopIndex]}() ${BASH_SOURCE[$TopIndex]}:$LineNo"
		fi
	fi
	g_ReturnValue="$s"
}


#*********************************************************************
# Class: StringClass
#*********************************************************************

#*********************************************************************
# Method: StringClass.replace_method
#*********************************************************************
function  StringClass.replace_method()
{
	local  string="$1"
	local  from="$2"

	StringEscapeUtilsClass.escapeBashReplace_method  "$from"
	g_ReturnValue="${string//$g_ReturnValue/$3}"
}


#*********************************************************************
# Method: StringClass.right_method
#*********************************************************************
function  StringClass.right_method()
{
  local  in_String="$1"
  local  in_Length="$2"

  g_ReturnValue="${in_String:$(( ${#in_String} - $in_Length ))}"
}


#*********************************************************************
# Method: StringClass.indexOf_method
#*********************************************************************
function  StringClass.indexOf_method()
{
	local  self="$1"
	local  in_Keyword="$2"
	local  in_StartIndex="$3"

	if [ "$in_StartIndex" == "" ];then  in_StartIndex=0  ;fi
	if [ "$in_StartIndex" -le "0" ];then  #// -le:"<="
		part="${self%%$in_Keyword*}"
		if [ "$part" == "$self" ];then
			g_ReturnValue=-1
		else
			g_ReturnValue=$(( ${#part} ))
		fi
	else
		self="${self:$in_StartIndex}"
		part="${self%%$in_Keyword*}"
		if [ "$part" == "$self" ];then
			g_ReturnValue=-1
		else
			g_ReturnValue=$(( ${#part} + $in_StartIndex ))
		fi
	fi
}


#*********************************************************************
# Class: StringEscapeUtilsClass
#*********************************************************************

#*********************************************************************
# Method: StringEscapeUtilsClass.escapeGrep_method
#*********************************************************************
function  StringEscapeUtilsClass.escapeGrep_method()
{
	local  string="$1"
		string="${string//\\/\\\\}"
		string="${string//-/\-}"
		string="${string//./\.}"
		string="${string//$/\\$}"
		string="${string//^/\^}"
		string="${string//{/\{}"
		string="${string//\}/\}}"
		string="${string//[/\[}"
		string="${string//]/\]}"
		string="${string//\*/\*}"
		string="${string//+/\+}"
	g_ReturnValue="${string//\?/\?}"
}


#*********************************************************************
# Method: StringEscapeUtilsClass.escapeBashReplace_method
#*********************************************************************
function  StringEscapeUtilsClass.escapeBashReplace_method()
{
	local  string="$1"
		string="${string//\\/\\\\}"
		string="${string//\}/\}}"
		string="${string//\(/\\(}"
		string="${string//\)/\\)}"
		string="${string//\*/\\*}"
		string="${string//\?/\\?}"
	g_ReturnValue="${string//\//\\/}"
}


#********************************************************************
# Function: Exit_func
#    Exit the running shell script
#
# Arguments:
#    None
#
# Return Value:
#    None
#********************************************************************
function  Exit_func()
{
	g_DebugTrapFunc=""
	trap ':' EXIT
	exit $ret
}


 
#********************************************************************
# Function: DebugTrap_func
#
# Arguments:
#    None
#
# Return Value:
#    None
#********************************************************************
function  DebugTrap_func()
{
	if [ "$g_DebugTrapFunc" == "" ];then
		shift  2
		g_PipeStatus=( "$@" )
	else
		$g_DebugTrapFunc  "$@"
	fi
}


#********************************************************************
# Function: debugger
#    Starts step running
#
# Arguments:
#    None
#
# Return Value:
#    None
#********************************************************************
function  de()
{
	debugger
}

function  debugger()
{
	g_DebugTrapFunc="StepRunning_func"

	trap 'DebugTrap_func  "$LINENO"  "$BASH_COMMAND"  "${PIPESTATUS[@]}"
		#// resume ${PIPESTATUS[@]}
		case "${#g_PipeStatus[@]}" in
			"2")
				return ${g_PipeStatus[0]} | true;;
			"3")
				return ${g_PipeStatus[0]} | return ${g_PipeStatus[1]} | true;;
		esac' DEBUG
}

function  StepRunning_func()
{
	local  LineNo__="$1"
	local  Command__="$2"
	shift  2
	g_PipeStatus=( "$@" )

	local  key__
	local  a1__

	if [ "$step_running_guided" == "" ]; then
		ErrClass.getCallTree_method  "$LINENO"  2  1
		echo  "$g_ReturnValue"  >&2
		echo  "--- デバッガ情報 -------------------------"  >&2
		echo  "ステップ実行 … Enter キーを押してください"  >&2
		echo  "変数の値を表示 … 変数名を入力"              >&2
		echo  "------------------------------------------"  >&2
	fi

	echo  "${FUNCNAME[2]}() ${BASH_SOURCE[2]}:${BASH_LINENO[1]}"  >&2
	key__="goto_in_while"
	while [ "$key__" != "" ]; do
		read -p "$LineNo__: $Command__ " key__  #// break at the line

		#// inspect variable's value
		if [ "$key__" != "" ]; then

			case "$key__" in
			 "LineNo__" | "Command__" | "key__" | "a1__" )
				echo  "変数 $key__ の値の表示はサポートしていません。";;

			 *)
				CheckOutParamIsConflictToLocal_func  key__  

				key__=${key__/$/}  #// cut first $, if exists
				es  $key__  #// call es function
				;;
			esac
		fi
	done ; done_func $?

	step_running_guided=1
}


#********************************************************************
# Function: ToLF_func
#    convert from CR+LF(stdin) to LF(stdout)
#********************************************************************
function  ToLF_func()
{
	tr -d \\r
}


#********************************************************************
# Function: parseJSON_func
#    Parse JSON
#
# Arguments:
#    None
#
# Return Value:
#    None
#********************************************************************
function  parseJSON_func()
{
	ToLF_func  |  PARSRJ_SH_func  $*
}


######################################################################
#
# PARSRJ.SH
#   A JSON Parser Which Convert Into "JSONPath-value"
#
# === What is "JSONPath-value" Formatted Text? ===
# 1. Format
#    <JSONPath_string#1> + <0x20> + <value_at_that_path#1>
#    <JSONPath_string#2> + <0x20> + <value_at_that_path#2>
#    <JSONPath_string#3> + <0x20> + <value_at_that_path#3>
#             :              :              :
#
# === This Command will Do Like the Following Conversion ===
# 1. Input Text (JSON)
#    {"hoge":111,
#     "foo" :["2\n2",
#             {"bar" :"3 3",
#              "fizz":{"bazz":444}
#             },
#             "\u5555"
#            ]
#    }
# 2. Output Text This Command Converts Into
#    $.hoge 111
#    $.foo[0] 2\n2
#    $.foo[1].bar 3 3
#    $.foo[1].fizz.bazz 444
#    $.foo[2] \u5555
#
# === Usage ===
# Usage   : parsrj.sh [options] [JSON_file]
# Options : -t      Quotes a value at converting when the value is a string
#         : -e      Escapes the following characters in impolite JSON key fields
#                   (" ",<0x09>,".","[","]")
#         : --xpath Use XPath instead of JSONPath when converting
#                   It is equivalent to using the following options
#                   (-rt -kd/ -lp'[' -ls']' -fn1 -li)
#          <<The following options are to arrange the JSONPath format>>
#           -sk<s>  Replaces <0x20> chrs in key string with <s>
#           -rt<s>  Replaces the root symbol "$" of JSONPath with <s>
#           -kd<s>  Replaces the delimiter "." of JSONPath hierarchy with <s>
#           -lp<s>  Replaces the prefix of array character "[" with <s>
#           -ls<s>  Replaces the suffix of array character "]" with <s>
#           -fn<n>  Redefines the start number of arrays with <n>
#           -li     Inserts another JSONPath line which has no value
#
#
# Written by Shell-Shoccar Japan (@shellshoccarjpn) on 2017-07-18
#
# This is a public-domain software (CC0). It means that all of the
# people can use this for any purposes with no restrictions at all.
# By the way, We are fed up with the side effects which are brought
# about by the major licenses.
#
######################################################################


######################################################################
# Initial configuration
######################################################################


# === Initialize shell environment ===================================
export LC_ALL=C
type command >/dev/null 2>&1 && type getconf >/dev/null 2>&1 &&
export PATH="$(command -p getconf PATH)${PATH+:}${PATH-}"
export UNIX_STD=2003  # to make HP-UX conform to POSIX

# === Usage printing function ========================================
print_usage_and_exit () {
  cat <<USAGE 1>&2
Usage   : ${0##*/} [options] [JSON_file]
Options : -t      Quotes a value at converting when the value is a string
          -e      Escapes the following characters in impolite JSON key fields
                  (" ",".","[","]")
          --xpath Use XPath instead of JSONPath when converting
                  It is equivalent to using the following options
                  (-rt -kd/ -lp'[' -ls']' -fn1 -li)
         <<The following options are to arrange the JSONPath format>>
          -sk<s>  Replaces <0x20> chrs in key string with <s>
          -rt<s>  Replaces the root symbol "$" of JSONPath with <s>
          -kd<s>  Replaces the delimiter "." of JSONPath hierarchy with <s>
          -lp<s>  Replaces the prefix of array character "[" with <s>
          -ls<s>  Replaces the suffix of array character "]" with <s>
          -fn<n>  Redefines the start number of arrays with <n>
          -li     Inserts another JSONPath line which has no value
Version : 2017-07-18 02:39:39 JST
          (POSIX Bourne Shell/POSIX commands)
USAGE
  exit 1
}


######################################################################
# Parse Arguments
######################################################################

function  PARSRJ_SH_func()
{

# === Print the usage when "--help" is put ===========================
case "$# ${1:-}" in
  '1 -h'|'1 --help'|'1 --version') print_usage_and_exit;;
esac

# === Get the options and the filepath ===============================
# --- initialize option parameters -----------------------------------
file=''
sk='_'
rt='$'
kd='.'
lp='['
ls=']'
fn=0
unoptli='#'
unopte='#'
optt=''
unoptt='#'
#
# --- get them -------------------------------------------------------
for arg in ${1+"$@"}; do
  if   [ "_${arg#-sk}" != "_$arg"    ] && [ -z "$file" ] ; then
    sk=${arg#-sk}
  elif [ "_${arg#-rt}" != "_$arg"    ] && [ -z "$file" ] ; then
    rt=${arg#-rt}
  elif [ "_${arg#-kd}" != "_$arg"    ] && [ -z "$file" ] ; then
    kd=${arg#-kd}
  elif [ "_${arg#-lp}" != "_$arg"    ] && [ -z "$file" ] ; then
    lp=${arg#-lp}
  elif [ "_${arg#-ls}" != "_$arg"    ] && [ -z "$file" ] ; then
    ls=${arg#-ls}
  elif [ "_${arg#-fn}" != "_$arg"    ] && [ -z "$file" ] &&
    printf '%s\n' "$arg" | grep -Eq '^-fn[0-9]+$'        ; then
    fn=${arg#-fn}
    fn=$((fn+0))
  elif [ "_$arg"        = '_-li'     ] && [ -z "$file" ] ; then
    unoptli=''
  elif [ "_$arg"        = '_--xpath' ] && [ -z "$file" ] ; then
    unoptli=''; rt=''; kd='/'; lp='['; ls=']'; fn=1
  elif [ "_$arg" = '_-t'             ] && [ -z "$file" ] ; then
    unoptt=''; optt='#'
  elif [ "_$arg" = '_-e'             ] && [ -z "$file" ] ; then
    unopte=''
  elif ([ -f "$arg" ] || [ -c "$arg" ]) && [ -z "$file" ]; then
    file=$arg
  elif [ "_$arg"        = "_-"       ] && [ -z "$file" ] ; then
    file='-'
  else
    print_usage_and_exit
  fi
done

# === Validate the arguments =========================================
if   [ "_$file" = '_'                ] ||
     [ "_$file" = '_-'               ] ||
     [ "_$file" = '_/dev/stdin'      ] ||
     [ "_$file" = '_/dev/fd/0'       ] ||
     [ "_$file" = '_/proc/self/fd/0' ]  ; then
  file=''
elif [ -f "$file"                    ] ||
     [ -c "$file"                    ] ||
     [ -p "$file"                    ]  ; then
  [ -r "$file" ] || error_exit 1 'Cannot open the file: '"$file"
else
  print_usage_and_exit
fi
case "$file" in ''|-|/*|./*|../*) :;; *) file="./$file";; esac


######################################################################
# Prepare for the Main Routine
######################################################################

# === Define some chrs. to escape some special chrs. temporarily =====
HT=$( printf '\t'   )              # Means TAB
DQ=$( printf '\026' )              # Use to escape doublequotation temporarily
LFs=$(printf '\\\n_');LFs=${LFs%_} # Use as a "\n" in s-command of sed

# === Export the variables to use in the following last AWK script ===
export sk
export rt
export kd
export lp
export ls


######################################################################
# Main Routine (Convert and Generate)
######################################################################

# === Open the JSON data source ======================================== #
cat ${file:+"$file"}                                                     |
#                                                                        #
# === Escape DQs and put each string between DQs into a sigle line ===== #
tr -d '\n'  | # 1)convert each DQ to new "\n" instead of original "\n"s  |
tr '"' '\n' | #                                                          |
awk '         # 2)discriminate DQ as just a letter from DQ as a segment  #
BEGIN {                                                                  #
  OFS=""; ORS="";                                                        #
  while (getline line) {                                                 #
    len = length(line);                                                  #
    if        (substr(line,len)!="\\"               ) {                  #
      print line,"\n";                                                   #
    } else if (match(line,/^(\\\\)+$|[^\\](\\\\)+$/)) {                  #
      print line,"\n";                                                   #
    } else                                            {                  #
      print substr(line,1,len-1),"'$DQ'";                                #
    }                                                                    #
  }                                                                      #
}'                                                                       |
awk '         # 3)restore DQ to the head and tail of lines               #
BEGIN {       #   which have DQs at head and tail originally             #
  OFS=""; even=0;                                                        #
  while (getline line)                   {                               #
    if (even==0) {print      line     ;}                                 #
    else         {print "\"",line,"\"";}                                 #
    even=1-even;                                                         #
  }                                                                      #
}'                                                                       |
#                                                                        #
# === Insert "\n" into the head and the tail of the lines which are ==== #
#     not as just a value string                                         #
sed "/^[^\"]/s/\([][{}:,]\)/$LFs\1$LFs/g"                                |
#                                                                        #
# === Cut the unnecessary spaces and tabs and "\n"s ==================== #
sed 's/^[ '"$HT"']\{1,\}//'                                              |
sed 's/[ '"$HT"']\{1,\}$//'                                              |
grep -v '^[ '"$HT"']*$'                                                  |
#                                                                        #
# === Generate the JSONPath-value with referring the head of the ======= #
#     strings and thier order                                            #
awk '                                                                    #
BEGIN {                                                                  #
  # Load shell values which have option parameters                       #
  alt_spc_in_key=ENVIRON["sk"];                                          #
  root_symbol   =ENVIRON["rt"];                                          #
  key_delimit   =ENVIRON["kd"];                                          #
  list_prefix   =ENVIRON["lp"];                                          #
  list_suffix   =ENVIRON["ls"];                                          #
  # Initialize the data category stack                                   #
  datacat_stack[0]="";                                                   #
  delete datacat_stack[0]                                                #
  # Initialize the key name stack                                        #
  keyname_stack[0]="";                                                   #
  delete keyname_stack[0]                                                #
  # Set 0 as stack depth                                                 #
  stack_depth=0;                                                         #
  # Initialize the error assertion variable                              #
  _assert_exit=0;                                                        #
  # Define the character for escaping double-quotation (DQ) character    #
  DQ="'$DQ'";                                                            #
  # Set null as field,record sparator for the print function             #
  OFS="";                                                                #
  ORS="";                                                                #
  #                                                                      #
  # MAIN LOOP                                                            #
  while (getline line) {                                                 #
    # In "{"-line case                                                   #
    if        (line=="{") {                                              #
      if ((stack_depth==0)                   ||                          #
          (datacat_stack[stack_depth]=="l0") ||                          #
          (datacat_stack[stack_depth]=="l1") ||                          #
          (datacat_stack[stack_depth]=="h3")  ) {                        #
        stack_depth++;                                                   #
        datacat_stack[stack_depth]="h0";                                 #
        continue;                                                        #
      } else {                                                           #
        _assert_exit=1;                                                  #
        exit _assert_exit;                                               #
      }                                                                  #
    # In "}"-line case                                                   #
    } else if (line=="}") {                                              #
      if (stack_depth>0)                                       {         #
        s=datacat_stack[stack_depth];                                    #
        if (s=="h0" || s=="h4")                              {           #
          if (s=="h0") {print_path();}                                   #
          delete datacat_stack[stack_depth];                             #
          delete keyname_stack[stack_depth];                             #
          stack_depth--;                                                 #
          if (stack_depth>0)                               {             #
            if ((datacat_stack[stack_depth]=="l0") ||                    #
                (datacat_stack[stack_depth]=="l1")  )    {               #
              datacat_stack[stack_depth]="l2"                            #
            } else if (datacat_stack[stack_depth]=="h3") {               #
              datacat_stack[stack_depth]="h4"                            #
            }                                                            #
          }                                                              #
          continue;                                                      #
        } else                                               {           #
          _assert_exit=1;                                                #
          exit _assert_exit;                                             #
        }                                                                #
      } else                                                   {         #
        _assert_exit=1;                                                  #
        exit _assert_exit;                                               #
      }                                                                  #
    # In "["-line case                                                   #
    } else if (line=="[") {                                              #
      if ((stack_depth==0)                   ||                          #
          (datacat_stack[stack_depth]=="l0") ||                          #
          (datacat_stack[stack_depth]=="l1") ||                          #
          (datacat_stack[stack_depth]=="h3")   ) {                       #
        stack_depth++;                                                   #
        datacat_stack[stack_depth]="l0";                                 #
        keyname_stack[stack_depth]='"$fn"';                              #
        continue;                                                        #
      } else {                                                           #
        _assert_exit=1;                                                  #
        exit _assert_exit;                                               #
      }                                                                  #
    # In "]"-line case                                                   #
    } else if (line=="]") {                                              #
      if (stack_depth>0)                                         {       #
        s=datacat_stack[stack_depth];                                    #
        if (s=="l0" || s=="l2")                                {         #
          if (s=="l0") {print_path();}                                   #
          '"$unoptli"'if (s=="l2") {print_path();}                       #
          delete datacat_stack[stack_depth];                             #
          delete keyname_stack[stack_depth];                             #
          stack_depth--;                                                 #
          if (stack_depth>0)                               {             #
            if ((datacat_stack[stack_depth]=="l0") ||                    #
                (datacat_stack[stack_depth]=="l1")  )    {               #
              datacat_stack[stack_depth]="l2"                            #
            } else if (datacat_stack[stack_depth]=="h3") {               #
              datacat_stack[stack_depth]="h4"                            #
            }                                                            #
          }                                                              #
          continue;                                                      #
        } else                                                 {         #
          _assert_exit=1;                                                #
          exit _assert_exit;                                             #
        }                                                                #
      } else                                                     {       #
        _assert_exit=1;                                                  #
        exit _assert_exit;                                               #
      }                                                                  #
    # In ":"-line case                                                   #
    } else if (line==":") {                                              #
      if ((stack_depth>0)                   &&                           #
          (datacat_stack[stack_depth]=="h2") ) {                         #
        datacat_stack[stack_depth]="h3";                                 #
        continue;                                                        #
      } else {                                                           #
        _assert_exit=1;                                                  #
        exit _assert_exit;                                               #
      }                                                                  #
    # In ","-line case                                                   #
    } else if (line==",") {                                              #
      # 1)Confirm the datacat stack is not empty                         #
      if (stack_depth==0) {                                              #
        _assert_exit=1;                                                  #
        exit _assert_exit;                                               #
      }                                                                  #
      '"$unoptli"'# 1.5)Action in case which li option is enabled        #
      '"$unoptli"'if (substr(datacat_stack[stack_depth],1,1)=="l") {     #
      '"$unoptli"'  print_path();                                        #
      '"$unoptli"'}                                                      #
      # 2)Do someting according to the top of datacat stack              #
      # 2a)When "l2" (list-step2 : just after getting a value in list)   #
      if (datacat_stack[stack_depth]=="l2") {                            #
        datacat_stack[stack_depth]="l1";                                 #
        keyname_stack[stack_depth]++;                                    #
        continue;                                                        #
      # 2b)When "lh" (hash-step4 : just after getting a value in hash)   #
      } else if (datacat_stack[stack_depth]=="h4") {                     #
        datacat_stack[stack_depth]="h1";                                 #
        continue;                                                        #
      # 2c)Other cases (error)                                           #
      } else {                                                           #
        _assert_exit=1;                                                  #
        exit _assert_exit;                                               #
      }                                                                  #
    # In another line case                                               #
    } else                {                                              #
      # 1)Confirm the datacat stack is not empty                         #
      if (stack_depth==0) {                                              #
        _assert_exit=1;                                                  #
        exit _assert_exit;                                               #
      }                                                                  #
      # 2)Remove the head/tail DQs quoting a string when they exists     #
      # 3)Unescape the escaped DQs                                       #
      if (match(line,/^".*"$/)) {                                        #
        gsub(DQ,"\\\"",line);                                            #
        key=substr(line,2,length(line)-2);                               #
        '"$optt"'value=key;                                              #
        '"$unoptt"'value=line;                                           #
      } else                    {                                        #
        gsub(DQ,"\\\"",line);                                            #
        key=line;                                                        #
        value=line;                                                      #
      }                                                                  #
      '"$unopte"'gsub(/ / ,"\\u0020",key);                               #
      '"$unopte"'gsub(/\t/,"\\u0009",key);                               #
      '"$unopte"'gsub(/\./,"\\u002e",key);                               #
      '"$unopte"'gsub(/\[/,"\\u005b",key);                               #
      '"$unopte"'gsub(/\]/,"\\u005d",key);                               #
      # 4)Do someting according to the top of datacat stack              #
      # 4a)When "l0" (list-step0 : waiting for the 1st value)            #
      s=datacat_stack[stack_depth];                                      #
      if ((s=="l0") || (s=="l1")) {                                      #
        print_path_and_value(value);                                     #
        datacat_stack[stack_depth]="l2";                                 #
      # 4b)When "h0,1" (hash-step0,1 : waiting for the 1st or next key)  #
      } else if (s=="h0" || (s=="h1")) {                                 #
        gsub(/ /,alt_spc_in_key,key);                                    #
        keyname_stack[stack_depth]=key;                                  #
        datacat_stack[stack_depth]="h2";                                 #
      # 4c)When "h3" (hash-step3 : waiting for a value of hash)          #
      } else if (s=="h3") {                                              #
        print_path_and_value(value);                                     #
        datacat_stack[stack_depth]="h4";                                 #
      # 4d)Other cases (error)                                           #
      } else {                                                           #
        _assert_exit=1;                                                  #
        exit _assert_exit;                                               #
      }                                                                  #
    }                                                                    #
  }                                                                      #
}                                                                        #
END {                                                                    #
  # FINAL ROUTINE                                                        #
  if (_assert_exit) {                                                    #
    print "Invalid JSON format\n" | "cat 1>&2";                          #
    line1="keyname-stack:";                                              #
    line2="datacat-stack:";                                              #
    for (i=1;i<=stack_depth;i++) {                                       #
      line1=line1 sprintf("{%s}",keyname_stack[i]);                      #
      line2=line2 sprintf("{%s}",datacat_stack[i]);                      #
    }                                                                    #
    print line1, "\n", line2, "\n" | "cat 1>&2";                         #
  }                                                                      #
  exit _assert_exit;                                                     #
}                                                                        #
# The Functions printing JSONPath-value                                  #
function print_path( i) {                                                #
  print root_symbol;                                                     #
  for (i=1;i<=stack_depth;i++) {                                         #
    if (substr(datacat_stack[i],1,1)=="l") {                             #
      print list_prefix, keyname_stack[i], list_suffix;                  #
    } else {                                                             #
      print key_delimit, keyname_stack[i];                               #
    }                                                                    #
  }                                                                      #
  print "\n";                                                            #
}                                                                        #
function print_path_and_value(str ,i) {                                  #
  print root_symbol;                                                     #
  for (i=1;i<=stack_depth;i++) {                                         #
    if (substr(datacat_stack[i],1,1)=="l") {                             #
      print list_prefix, keyname_stack[i], list_suffix;                  #
    } else {                                                             #
      print key_delimit, keyname_stack[i];                               #
    }                                                                    #
  }                                                                      #
  print " ", str, "\n";                                                  #
}                                                                        #
'

}


#********************************************************************
# Function: CallMain_func
#    Calls "Main_func"
#
# Arguments:
#    $* at starting
#
# Return Value:
#    None
#********************************************************************
function  CallMain_func()
{
	cd  "${g_ThisScriptPath%/*}"  #// parent of "${g_ThisScriptPath}"

	trap 'set +x ; ErrTrap_func' EXIT  #// Enable the exit trap
	trap 'set +x ; ErrTrap_func $LINENO ;  break' ERR  #// In function, it is necessary to bash -E option
	trap 'DebugTrap_func  "$LINENO"  "$BASH_COMMAND"  "${PIPESTATUS[@]}"
		#// resume ${PIPESTATUS[@]}
		case "${#g_PipeStatus[@]}" in
			"2")
				return ${g_PipeStatus[0]} | true;;
			"3")
				return ${g_PipeStatus[0]} | return ${g_PipeStatus[1]} | true;;
		esac' DEBUG
	set +e


	Main_func  $*


	trap EXIT  #// Disable the exit trap
	if [ "${g_IsSourceCommand}" == "${True}" ]; then
		cd  "${g_StartInPath}"
	fi
}


#********************************************************************
# Variable: True
#********************************************************************
export  True=0  #// 0 is same as the specifiation of Linux bash "test" command


#********************************************************************
# Variable: False
#********************************************************************
export  False=1  #// Not 0 is same as the specifiation of Linux bash "test" command


#********************************************************************
# Variable: g_ThisScriptPath
#********************************************************************
export  g_StartInPath="$( pwd )"
export  g_ThisScriptRelativePath="${BASH_SOURCE}"
GetFullPath_func  "${g_ThisScriptRelativePath}"
g_ThisScriptPath="${g_ReturnValue}"
if [ "$0" == "${BASH_SOURCE}" ]; then
	export  g_IsSourceCommand="${False}"
else
	export  g_IsSourceCommand="${True}"
fi


#********************************************************************
# Variable: LF
#    Line feed
#********************************************************************
export  LF=`echo_e_func "\nx"`; LF="${LF:0:1}"


#********************************************************************
# Variable: Tab
#********************************************************************
export  Tab=`echo_e_func "\t"`


#********************************************************************
# Calling "CallMain_func"
#********************************************************************
CallMain_func  $*
