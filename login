#!/bin/bash
HostType="xservice"
XSERVICE_USER_AT="${XSERVICE_USER_AT}"
if [ "${Host}" == "" ]; then
    Host="xservice01.com"
fi
if [ "${SecretKey}" == "" ]; then
    SecretKey="${HOME}/.ssh/${HostType}_id_rsa"
fi

function  Main() {
    ssh  ${XSERVICE_USER_AT}${Host}  -i ${SecretKey}  ||  OnError
}

function  OnError() {
    echo  ""  >&2
    echo  '$ ssh  ${XSERVICE_USER_AT}${Host}  -i ${SecretKey}'  >&2
    echo  "XSERVICE_USER_AT: ${XSERVICE_USER_AT}"  >&2
    echo  "Host: ${Host}"  >&2
    echo  "SecretKey: ${SecretKey}"  >&2

    if [ "${XSERVICE_USER_AT}" == "" ]; then
        echo  ""  >&2
        echo  "[Hint] Please define XSERVICE_USER_AT in ~/.bashrc"  >&2
        echo  "[Hint]     export XSERVICE_USER_AT=\"__YourAccountName__@\""  >&2
        echo  "[Hint] Please input the following command."  >&2
        echo  "[Hint]     source ~/.bashrc"  >&2
    fi

    if ! ( ls -l  "${SecretKey}"  |  grep "-r--------" > /dev/null ); then
        echo  ""  >&2
        echo  "[Hint] Please input the following command."  >&2
        echo  "[Hint]     chmod 600 \"${SecretKey}\""  >&2
    fi

    if [ "$( cat "${SecretKey}" )" == "" ]; then
        echo  ""  >&2
        echo  "[Hint] Please set ${HostType} SSH secret key in \"${SecretKey}\""  >&2
    fi
}

Main  "$@"
