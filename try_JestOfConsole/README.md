# __app__

__app__ creates each folder for each branch and check out in each folder
based on the `.git` folder.

[日本語 README](./README-jp.md)

<!-- TOC depthFrom:1 -->

- [__app__](#app)
  - [How to use](#how-to-use)
  - [Install](#install)
    - [For Windows](#for-windows)
    - [For mac](#for-mac)
  - [(for developers) How to build the development environment](#for-developers-how-to-build-the-development-environment)
    - [For Windows](#for-windows-1)
    - [For mac](#for-mac-1)
  - [(for developers) Test](#for-developers-test)
    - [Test using Jest](#test-using-jest)
    - [Test without Jest](#test-without-jest)

<!-- /TOC -->


## How to use

Install __app__ and then run it in your shell.

    __app__  __Path__


## Install

To use __app__, you must install Node.js.

### For Windows

    Install Node.js:
        - https://nodejs.org/ja/download/ >> Windows Installer (.msi) >> 64-bit
        - Open the downloaded file (e.g. node-v14.16.0-x64.exe)
        - Installation options are defaults

    If there is your Windows in the LAN with the proxy in the company and so on:
        Windows Start >> (Input) PowerShell :
            - npm config -g set proxy "http://___.___.___.___:____"
            - npm config -g set https-proxy "http://___.___.___.___:____"

    Download and expand __app__ and install Node.js packages used by __app__:
        Windows Start >> (Input) PowerShell :
            cd  ${env:USERPROFILE}\Downloads
            Invoke-WebRequest  https://github.com/Takakiriy/__app__/archive/refs/heads/master.zip -OutFile __app__.zip
            rm -r -fo  "__app__-master"  #// When you are updating
            Expand-Archive -Path __app__.zip -DestinationPath "."
            cd  "__app__-master"

            npm install --only=production

    If you use PowerShell:
        Create a PS1 script file that launches __app__ into the folder where PATH of PowerShell:
            Windows Start >> (Input) PowerShell :
                cd  ${env:USERPROFILE}\Downloads\__app__-master
                ${current_folder} = Convert-Path "."
                ${__app___folder} = "${env:USERPROFILE}\Documents\__app__"
                ${script} = "${env:USERPROFILE}\AppData\Local\Microsoft\WindowsApps\__app__.ps1"

                echo  "`${env:NODE_PATH} = `"${current_folder}\node_modules`"" > ${script}
                echo  "node  ${current_folder}\build\__app__.js `$PsBoundParameters.Values `$args" >> ${script}

                Set-ExecutionPolicy  RemoteSigned  -Scope CurrentUser  #// Make the script run

    If you use Git bash:
        Install Git for Windows:
            - https://git-scm.com/ >> Downloads >> Windows
            - Open the downloaded file (e.g. Git-2.31.1-64-bit.exe)
            - Press Next button 8 times
            - Configuring the line ending conversions: Checkout as-is, commit as-is
            - Other installation options are defaults
        Create a bash script file that launches __app__ into the folder where PATH passed:
            Right click at any folder >> Git bash :
                cd  ${HOME}/Downloads/__app__-master
                current_folder="$(pwd)"
                __app___folder="${HOME}/Documents/__app__"
                script="${HOME}/bin/__app__"
                mkdir -p "${HOME}/bin"

                echo  "export NODE_PATH=\"${HOME}/AppData/Roaming/npm/node_modules\"" > ${script}
                echo  "node  ${current_folder}/build/__app__.js \"\$@\"" >> ${script}

    Check to use __app__ command:
        Open new PowerShell or new Git bash:
            __app__ --version

### For mac

    Install Node.js:
        - https://nodejs.org/ja/download/ >> macOS Installer (.pkg) >> 64-bit
        - Open the downloaded file (e.g. node-v14.16.0.pkg)
        - Installation options are defaults

    Download and expand __app__ and install Node.js packages used by __app__:
        #// Launchpad >> Terminal
        cd  ~/Downloads
        setopt interactivecomments
            #// enables comment symbol (#)
        curl -o __app__.zip -kL https://github.com/Takakiriy/__app__/archive/refs/heads/master.zip 
        rm -rf  __app__-old  &&  mv  __app__  __app__-old  #// When you are updating
        unzip -o __app__.zip
        mv  __app__-master  __app__  #// The folder extracted from the Zip file
        cd  __app__

        npm install --only=production

    Make the script file in the PATH folder to start __app__:
        cd __app__  #// The folder extracted from the Zip file
        script="$HOME/bin/__app__"
        rm -f "${script}"  #// When you are updating
        echo "export  NODE_PATH=$(pwd)/node_modules" >> "${script}"
        echo "node  $(pwd)/build/__app__.js \"\$@\"" >> "${script}"
        chmod +x "${script}"
        unset script

    Check to use __app__ command:
        __app__ --version


## (for developers) How to build the development environment

### For Windows

Install Node.js:

    - https://nodejs.org/en/download/ >> Windows Installer (.msi) >> 64-bit
    - Open the downloaded file (e.g. node-v14.16.0-x64.exe)
    - Installation options are defaults

Install Git for Windows:

    - https://git-scm.com/ >> Downloads >> Windows
    - Open the downloaded file (e.g. Git-2.31.1-64-bit.exe)
    - Press Next button 8 times
    - Configuring the line ending conversions: Checkout as-is, commit as-is
    - Other installation options are defaults

Install Visual Studio Code:

    - https://code.visualstudio.com/
    - Open the downloaded file (e.g. VSCodeUserSetup-x64-1.54.3.exe)
    - Installation options are defaults
    - VSCode >> Terminal >> New Terminal
    - If you see powershell in the top right corner of the open shell, click there and 
        [ Select Default Shell >> Git bash ]
    - (recommend) Pin Visual Studio Code to the taskbar
    - (recommend) Set to save all files when Ctrl+S is pressed: |
        File >> Preferences >> Keyboard Shortcuts >> (input) save all >>
            (double click) File: Save All >> Ctrl + S key >> Enter key
    - Close Visual Studio Code

Double click `cmd menu.bat` and select `1. open_VisualStudioCode`:

To run the first test, press F5 key:


### For mac

Install Node.js:

    - https://nodejs.org/en/download/ >> macOS Installer (.pkg)
    - Open the downloaded file (e.g. node-v14.16.0.pkg)
    - Installation options are defaults

Install Visual Studio Code:

    - https://code.visualstudio.com/
    - Open the downloaded file (e.g. Visual Studio Code.app)
    - (recommend) Pin Visual Studio Code to the taskbar
    - (recommend) Set to save all files when Ctrl+S is pressed: |
        File >> Preferences >> Keyboard Shortcuts >> (input) save all >>
            (double click) File: Save All >> Ctrl + S key >> Enter key
    - Close Visual Studio Code

Add `cmd menu.command` file executable permission:

    - Double click `bin/chmod+x.command.zip` file
    - Right click at the expanded `chmod+x.command` file >> Open >> Open
    - Drag and drop `cmd menu.command` file to the opened window, push Enter key and close the window
    - Right click at `cmd menu.command` file >> Open >> Open
    - Close the opened window

Double click `cmd menu.command` file and select `1. open_VisualStudioCode`:

To run the first test, press fn + F5 key:


## (for developers) Test

There are the test using Jest and the test without Jest.
You can set the break point, click at the left of line number of the source file.

### Test using Jest

- Visual Studio Code >> Terminal >> New Terminal >> (1:__shell__ at the left of +) >> Create JavaScript Debug Terminal
- npm test
- Restart the test:
    - Continue button:  #// Run to the end of program
    - Press `f` key in the terminal running `npm test`
- (When you finish,) Terminal tab (bottom) >> Recycle box icon (right)

### Test without Jest

- Visual Studio Code >> F5 key
