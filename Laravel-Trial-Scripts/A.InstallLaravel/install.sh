#!/bin/bash -eE
	#// Content-Type: text/plain; charset=utf-8
	#// -eE option breaks execution, when an error was occurred.

#********************************************************************
#* File: install.sh
#********************************************************************

#// Setting
#//==================================================================

#//==================================================================


#********************************************************************
# Function: Main_func
#********************************************************************
function  Main_func()
{
	echo  ""

	echo  "Creating new homestead directory in the current directory..."
#//	Pause_func
	echo  ""
	if [ ! -e "${HOME}/.vagrant.d/boxes" ];then
		EchoOn_func

		vagrant box add laravel/homestead
			#// laravel/homestead (hyperv, 8.0.0-alpha4)
		EchoOff_func
	fi
	rm_func  "homestead"
	EchoOn_func

	git clone https://github.com/laravel/homestead.git

	cd  homestead

	git checkout v8.0.1

	./init.sh
	EchoOff_func


	echo  "End of script."
}


#********************************************************************
#* Section: bashlib
#********************************************************************

#********************************************************************
# Function: EchoOn_func
#    Enables to show the executing commands
#
# Arguments:
#    None
#
# Return Value:
#    None
#
# Description:
#    Commands in calling functions are not shown.
#********************************************************************
function  EchoOn_func()
{
	g_DebugTrapFunc="EchoOnTrap_func"

	trap 'DebugTrap_func  "$LINENO"  "$BASH_COMMAND"  "${PIPESTATUS[@]}"
		#// resume ${PIPESTATUS[@]}
		case "${#g_PipeStatus[@]}" in
			"2")
				return ${g_PipeStatus[0]} | true;;
			"3")
				return ${g_PipeStatus[0]} | return ${g_PipeStatus[1]} | true;;
		esac' DEBUG
}

function  EchoOnTrap_func()
{
	local  LineNo="$1"
	local  Command="$2"
	shift  2
	g_PipeStatus=( "$@" )

	echo "$LineNo: $Command" >&2
}


 
#********************************************************************
# Function: EchoOff_func
#    Disables to show the executing commands
#
# Arguments:
#    None
#
# Return Value:
#    None
#********************************************************************
function  EchoOff_func()
{
	g_DebugTrapFunc=""
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
# Function: rm_func
#    Remove a file or directory
#
# Arguments:
#    in_Path - A path of removing file or directory (1)
#    in_Path - A path of removing file or directory (2)
#         :
#
# Return Value:
#    None
#********************************************************************
function  rm_func()
{
	local  Paths=( "$@" )
	local  path

	for path  in "${Paths[@]}" ;do
		if [ "$path" != "" ];then
			CheckWritable_func  "$path"

			if [ -d "$path" ]; then
				$g_TemporarySudo  chmod -R a+rw  "$path"
				$g_TemporarySudo  rm -rf  "$path"
			elif [ -f "$path" ]; then
				$g_TemporarySudo  chmod a+rw  "$path"
				$g_TemporarySudo  rm -f  "$path"
			elif [ -e "$path"  -o  -L "$path" ]; then
				$g_TemporarySudo  rm -f  "$path"
			fi
		fi
	done ; done_func $?
}


#********************************************************************
# Function: CheckWritable_func
#********************************************************************
function  CheckWritable_func()
{
	#// No check
	local  dummy_avoid_syntax_error
}


#********************************************************************
# Function: Attr_func
#    Returns the value of associative array
#
# Arguments:
#    self        - The variable name of associative array (=object)
#    in_AttrName - The key of associative array. The attribute name
#
# Return Value:
#    g_Ret - The value of associative array
#
# Example:
#    > $declare_AssociativeArrayClass  object_a
#    > SetAttr_func  object_a  "Attr1"  "Value1"
#    > Attr_func  object_a  "Attr1"  #// "Value1"
#    > echo  "$g_Ret"
#
# Example:
#    If bash version 4 or later.
#    > declare -A  object_a  #// associative array
#    > object_a["Attr1"]="Value1"
#    > echo  ${object_a["Attr1"]}  #// "Value1"
#********************************************************************
function  Attr_func()
{
	local  self="$1"
	local  in_AttrName="$2"
	local  tmp
	CheckArgCount_func  2 "$@"

	eval  tmp="\${${self}[\$in_AttrName]}"
	g_Ret="$tmp"
}


#********************************************************************
# Function: SetAttr_func
#    Sets the value of associative array
#
# Arguments:
#    self        - The variable name of associative array (=object)
#    in_AttrName - The key of associative array. The attribute name
#    in_Value    - Setting value of associative array
#
# Return Value:
#    None
#
# Example:
#    > $declare_AssociativeArrayClass  object_a
#    > SetAttr_func  object_a  "Attr1"  "Value1"
#    > Attr_func  object_a  "Attr1"  #// "Value1"
#    > echo  "$g_Ret"
#
# Example:
#    If bash version 4 or later.
#    > declare -A  object_a  #// associative array
#    > object_a["Attr1"]="Value1"
#    > echo  ${object_a["Attr1"]}  #// "Value1"
#********************************************************************
function  SetAttr_func()
{
	local  self__="$1"
	local  in_AttrName="$2"
	local  in_Value="$3"
	CheckArgCount_func  3 "$@"

	eval  "$self__[$in_AttrName]=\"$in_Value\""
}


#********************************************************************
# Type: declare_AssociativeArrayClass
#    Declares an associative array (=object)
#
# Example:
#    > $declare_AssociativeArrayClass  object_a
#********************************************************************
if [ "${BASH_VERSINFO[0]}" -ge "4" ];then
	declare_AssociativeArrayClass="declare -A"  #// bash ver4
else
	declare_AssociativeArrayClass="declare"  #// bash ver3
fi


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
#    g_Ret - The color attached text that will be used with echo command
#
# Example:
#    > ColorText_func  "Pass."  "Green"  "Bold"
#    > echo_e_func  "$g_Ret"
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
	Attr_func  g_ColorText_Codes  "Black"
	if [ "$g_Ret" == "" ];then

		#//=== set escape sequence
		SetAttr_func  g_ColorText_Codes  "Black"    30
		SetAttr_func  g_ColorText_Codes  "Red"      31
		SetAttr_func  g_ColorText_Codes  "Green"    32
		SetAttr_func  g_ColorText_Codes  "Yellow"   33
		SetAttr_func  g_ColorText_Codes  "Blue"     34
		SetAttr_func  g_ColorText_Codes  "Magenta"  35
		SetAttr_func  g_ColorText_Codes  "Cyan"     36
		SetAttr_func  g_ColorText_Codes  "White"    37

		SetAttr_func  g_ColorText_Codes  "BlackBack"    40
		SetAttr_func  g_ColorText_Codes  "RedBack"      41
		SetAttr_func  g_ColorText_Codes  "GreenBack"    42
		SetAttr_func  g_ColorText_Codes  "YellowBack"   43
		SetAttr_func  g_ColorText_Codes  "BlueBack"     44
		SetAttr_func  g_ColorText_Codes  "MagentaBack"  45
		SetAttr_func  g_ColorText_Codes  "CyanBack"     46
		SetAttr_func  g_ColorText_Codes  "WhiteBack"    47

		SetAttr_func  g_ColorText_Codes  "Bold"  1
	fi

	str="\e["
	n=$(( ${#in_ColorNames[@]} - 1 ))
	for (( i = 0;  i <= n;  i++ )) ;do
		Attr_func  g_ColorText_Codes  "${in_ColorNames[$i]}"
		if [ "$i" == "$n" ];then
			str="${str}${g_Ret}m"
		else
			str="${str}${g_Ret};"
		fi
	done ; done_func $?

	g_Ret="${str}${in_Text}\e[m"
}

$declare_AssociativeArrayClass  g_ColorText_Codes


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
# Function: CallMain_func
#    Calls "Main_func"
#
# Arguments:
#    None
#
# Return Value:
#    None
#********************************************************************
function  CallMain_func()
{
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


	Main_func  ""  "AppKey4293"


	trap EXIT  #// Disable the exit trap
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
g_Ret=""
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
			#// g_Err_ErrCallStack="$a1$g_Ret$LF"
			g_Err_ErrCallStack="$g_Ret$LF"
		else
			echo  "<ERROR msg=\"エラー処理中に別のエラーが発生しました。\"/>" >&2

			ErrClass.getErrStr_method  "$g_Err_Desc"
			if [ "$g_Ret" == "" ];then  g_Ret="<ERROR/>"  ;fi
			ColorText_func  "$g_Ret"  "Red" "Bold"
			echo_e_func  "$g_Ret"

			ErrClass.getCallTree_method  "${BASH_LINENO[0]}"  2  1
			echo  "$g_Ret"  >&2
			g_Err_Desc="$g_Err_Desc1st"
		fi


		if [ "$g_Err_Desc" == "" ];then
			ColorText_func  "<ERROR/>"  "Red" "Bold"
		else
			ColorText_func  "$g_Err_Desc"  "Red" "Bold"
		fi
		echo_e_func  "$g_Ret" >&2
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
		exit  "$g_ExitStatus"
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


#********************************************************************
# Function: ErrClass.raiseOverwrite_method
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
	local  message ; ErrClass.getErrStr_method  "$@" ; message="$g_Ret"
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
# Function: ErrClass.clear_method
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
# Function: ErrClass.getErrStr_method
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
			g_Ret="$Message"
		else
			StringClass.replace_method  "$Message"  "&"  "&amp;"
			StringClass.replace_method  "$g_Ret"  "<"  "&lt;"
			StringClass.replace_method  "$g_Ret"  "\""  "&quot;"
			g_Ret="<ERROR msg=\"$g_Ret\"/>"
		fi
	else
		g_Ret=""
	fi
}


 
#********************************************************************
# Function: ErrClass.getCallTree_method
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
		else
			s="$s${LF}${indent}${FUNCNAME[$TopIndex]}() ${BASH_SOURCE[$TopIndex]}:$LineNo"
		fi
	fi
	g_Ret="$s"
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
		echo  "$g_Ret"  >&2
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
# Variable: LF
#    Line feed
#********************************************************************
LF=`echo_e_func "\nx"`; LF="${LF:0:1}"


#********************************************************************
# Variable: Tab
#********************************************************************
Tab=`echo_e_func "\t"`


#********************************************************************
# Calling "CallMain_func"
#********************************************************************
CallMain_func
