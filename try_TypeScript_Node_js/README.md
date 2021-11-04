# TypeScript Visual Studio Code

[日本語 README](./README-jp.md)

There are codes in the "src" folder.


## Install to Windows

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

Open try_TypeScript_Node_js folder in Visual Studio Code:

    - If you drag and drop the try_TypeScript_Node_js folder into Visual Studio Code:
        - Open Visual Studio Code (New Window)
        - Drag and drop the folder into Visual Studio Code
    - If you open by Visual Studio Code menu:
        - Open Visual Studio Code (New Window)
        - File (menu) >> Open Folder...
        - ___\try_TypeScript_Node_js
    - If you open from PowerShell
        - Windows start >> (type) PowerShell
        - code "___\try_TypeScript_Node_js"

Restore node_modules folder:

    - Visual Studio Code (menu) >> Terminal >> New Terminal
    - npm ci

Press F5 key, then the test runs:


## Install to mac

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

Add "cmd menu.command" file executable permission:

    - Double click "bin/chmod+x.command.zip" file
    - Right click at the expanded "chmod+x.command" file >> Open >> Open
    - Drag and drop "cmd menu.command" file to the opened window, push Enter key and close the window
    - Right click at "cmd menu.command" file >> Open >> Open
    - Close the opened window

Double click "cmd menu.command" file and select "1. open_VisualStudioCode":

To run the test, press fn + F5 key:
