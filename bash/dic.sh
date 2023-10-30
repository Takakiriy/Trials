#!/bin/bash

function  Main() {
    ExampleOfTabDic
    ExampleOfArrayDic
    TestOfTabDic
    TestOfArrayDic
    Benchmark
}
TIMEFORMAT=%R

function  ExampleOfTabDic() {
    employee=""
    employee="$( SetToTabDic  "${employee}"  "firstName"  "John" )"
    echo  "$(  GetFromTabDic  "${employee}"  "firstName" )"  #// John
    echo  "$(  GetFromTabDic  "${employee}"  "middleName"  "default" )"  #// default
    # eval  "$(_set2  employee  "firstName"  "John" )"
    # echo  "$(_get2  employee  "firstName" )"  #// John
    # echo  "$(_get2  employee  "middleName"  "default" )"  #// default
}

function  ExampleOfArrayDic() {
    employee=()
    eval  "$(_set  employee  "firstName"  "John" )"
    echo  "$(_get  employee  "firstName" )"  #// John
    echo  "$(_get  employee  "middleName"  "default" )"  #// default
}

function  TestOfTabDic() {
    local  tab=$'\t'
    local  object="${tab}keyA=1${tab}keyB=x"

    echo  "$( GetFromTabDic  "${object}"  "keyA" )"
    echo  "$( GetFromTabDic  "${object}"  "keyB" )"
    object="$(  SetToTabDic  "${object}"  "keyA"  "2" )"
    object="$(  SetToTabDic  "${object}"  "keyB"  "y" )"
    object="$(  SetToTabDic  "${object}"  "keyC"  "z  z" )"
    echo  "$( GetFromTabDic  "${object}"  "keyA" )"
    echo  "$( GetFromTabDic  "${object}"  "keyB" )"
    echo  "$( GetFromTabDic  "${object}"  "keyC" )"
    echo  "$( GetFromTabDic  "${object}"  "keyD"  "def" )"
}

function  TestOfArrayDic() {
    object=(keyA "1"  keyB "x")
    echo "$(_get  object  "keyA" )"
    echo "$(_get  object  "keyB" )"
    eval "$(_set  object  "keyA"  "2" )"
    eval "$(_set  object  "keyB"  "y" )"
    eval "$(_set  object  "keyC"  "z  z" )"
    echo "$(_get  object  "keyA" )"
    echo "$(_get  object  "keyB" )"
    echo "$(_get  object  "keyC" )"
    echo "$(_get  object  "keyD"  "def" )"
}

function  Benchmark() {
    local  loopCount=1000
    local  keyCount=100
    local  i=0

    echo  ""
    echo  "Empty loop"
    time {
        for ((i=0; i<loopCount; i+=1)); do
            :
        done
    }

    local  object=""
    echo  ""
    echo  "SetToTabDic"
    for ((i=0; i<keyCount; i+=1)); do
        SetToTabDic  "${object}"  "key_$i"  "$i"  >  /dev/null
    done
    time {
        for ((i=0; i<loopCount; i+=1)); do
            SetToTabDic  "${object}"  "key_${keyCount}"  "$i"  >  /dev/null
        done
    }
    echo  ""
    echo  "GetFromTabDic"
    time {
        for ((i=0; i<loopCount; i+=1)); do
            GetFromTabDic  "${object}"  "key_${keyCount}"  >  /dev/null
        done
    }

    local  object=()
    echo  ""
    echo  "_set"
    for ((i=0; i<keyCount; i+=1)); do
        eval "$(_set  object  "key_$i"  "$i" )"
    done
    time {
        for ((i=0; i<loopCount; i+=1)); do
            eval "$(_set  object  "key_${keyCount}"  "$i" )"
        done
    }
    echo  ""
    echo  "_get"
    time {
        for ((i=0; i<loopCount; i+=1)); do
            echo "$(_get  object  "key_${keyCount}" )" >  /dev/null
        done
    }
}

#// _get
#// Example:
#//    object=(keyA "1"  keyB "x")
#//    echo "$(_get  object  "keyB" )"
function  _get() {
    local  objectName="$1"
    local  key_="$2"
    local  defaultValue="$3"
    local  operation=""

    operation="_getSub  \"\${${objectName}[@]}\"  \"${key_}\"  \"${defaultValue}\""
    eval "${operation}"
}

function  _getSub() {
    local  objectEntries=("$@")
    local  count=${#objectEntries[@]}
    local  keyIndex=$(( ${count} - 2 ))
    local  defaultValueIndex=$(( ${count} - 1 ))
    local  key_="${objectEntries[${keyIndex}]}"
    local  value="${objectEntries[${defaultValueIndex}]}"

    for (( i = 0; i < "${keyIndex}"; i += 2 ));do
        if [ "${objectEntries[${i}]}" == "${key_}" ]; then
            value="${objectEntries[${i}+1]}"
        fi
    done

    echo "${value}"
}

#// _set
#// Example:
#//    object=(keyA "1"  keyB "x")
#//    eval "$(_set  object  "keyB"  "y" )"
function  _set() {
    local  objectName="$1"
    local  key_="$2"
    local  value="$3"
    local  operation=""

    operation="_setSub \"\${${objectName}[@]}\" \"${objectName}\" \"${key_}\" \"${value}\""
    eval "${operation}"
}

function  _setSub() {
    local  objectEntries=("$@")
    local  count=${#objectEntries[@]}
    local  objectNameIndex=$(( ${count} - 3 ))
    local  keyIndex=$(( ${count} - 2 ))
    local  valueIndex=$(( ${count} - 1 ))
    local  objectName="${objectEntries[${objectNameIndex}]}"
    local  key_="${objectEntries[${keyIndex}]}"
    local  value="${objectEntries[${valueIndex}]}"
    local  command=""

    for (( i = 0; i < "${keyIndex}"; i += 2 ));do
        if [ "${objectEntries[${i}]}" == "${key_}" ]; then

            command="${objectName}[$(( ${i} + 1 ))]=\"${value}\""
        fi
    done
    if [ "${command}" == "" ]; then
        local  newKeyIndex=$(( ${count} - 3 ))
        local  newValueIndex=$(( ${count} - 2 ))

        command="${objectName}[${newKeyIndex}]=\"${key_}\"; ${objectName}[${newValueIndex}]=\"${value}\""
    fi

    echo "${command}"
}

function  TestOfTabDic2() {
    local  dic=""
    local  tab=$'\t'

    dic="$( SetToTabDic  "${dic}"  "keyA"  "on" )"
    test  "${dic}" == "${tab}keyA=on"  ||  TestError
    dic="$( SetToTabDic  "${dic}"  "keyB"  "on" )"
    test  "${dic}" == "${tab}keyA=on${tab}keyB=on"  ||  TestError
    dic="$( SetToTabDic  "${dic}"  "keyA"  "off" )"
    test  "${dic}" == "${tab}keyA=off${tab}keyB=on"  ||  TestError

    test  "$( GetFromTabDic  "${dic}"  "keyA" )" == "off"  ||  TestError
    test  "$( GetFromTabDic  "${dic}"  "keyB" )" == "on"  ||  TestError
    test  "$( GetFromTabDic  "${dic}"  "keyX"  "off" )" == "off"  ||  TestError
    test  "$( GetFromTabDic  "${dic}"  "keyX"  "on" )" == "on"  ||  TestError

    dic="$( SetToTabDic  "${dic}"  "keyB"  "off" )"
    test  "${dic}" == "${tab}keyA=off${tab}keyB=off"  ||  TestError
}

# #// _set2
# #// Example:
# #//    object=(keyA "1"  keyB "x")
# #//    eval "$(_set2  object  "keyB"  "y" )"
# function  _set2() {
#     local  objectName="$1"
#     local  key_="$2"
#     local  value="$3"
#     local  operation=""
# 
#     operation="_set2Sub \"\${${objectName}[@]}\" \"${objectName}\" \"${key_}\" \"${value}\""
#     eval "${operation}"
# }
# 
# function  _set2Sub() {
#     local  objectEntries=("$@")
#     local  count=${#objectEntries[@]}
#     local  keyIndex=$(( ${count} - 2 ))
#     local  defaultValueIndex=$(( ${count} - 1 ))
#     local  key_="${objectEntries[${keyIndex}]}"
#     local  value="${objectEntries[${defaultValueIndex}]}"
# 
# 
# }

function  SetToTabDic() {
    local  tabDic="$1"
    local  key_="$2"
    local  value="$3"
    local  tab=$'\t'

    if echo  "${tabDic}"  |  grep -qE "${tab}${key_}=" > /dev/null; then
        echo  "${tabDic}"  |  sed -E "s/${tab}${key_}=[^${tab}]*/${tab}${key_}=${value}/"
    else
        echo  "${tabDic}${tab}${key_}=${value}"
    fi
}

function  GetFromTabDic() {
    local  tabDic="$1"
    local  key_="$2"
    local  defaultValue="$3"
    local  tab=$'\t'

    local  keyValue="$( echo  "${tabDic}"  |  grep  -oE "${tab}${key_}=[^${tab}]*" )"
    if [ "${keyValue}" == "" ]; then
        echo  "${defaultValue}"
    else
        echo  "${keyValue#*=*}"  #// right of "="
    fi
}

Main
