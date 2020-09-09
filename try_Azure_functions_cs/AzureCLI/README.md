# Azure CLI installation script (without Visual Studio Code)

This script installs:

	- Node.js
	- .NET Core SDK
	- Azure CLI
	- Azure Functions Core Tools

The version of Azure CLI is the value of the `g_AzureCLI_Version` variable in `scripts.sh` file.
The version of Azure Azure Functions Core Tools is newest Version.


## How to try Azure Functions

1. Install the above "Azure Functions Core Tools"
2. Create new folder as new project
3. Open the new folder in Visual Studio Code and install the following extensions
    - Azure Functions (0.24.0)
    - C# (1.23.1)
4. For more information, see the link below
    - Quickstart: Create a function in Azure using Visual Studio Code
    https://docs.microsoft.com/en-us/azure/azure-functions/functions-create-first-function-vs-code?pivots=programming-language-csharp


## Open bash

To open bash for use with installed commands, after installation,
drag and drop the folder of the project you are developing into the `run_open.bat` file.


# Install Azure CLI and Visual Studio Code

script.sh file is not used.

1. Install Docker for Windows https://docs.docker.com/
  Kubernetes will also be installed
2. Install Git (e.g. Git-2.27.0-64-bit.exe) https://git-scm.com/downloads
3. Install Azure CLI (e.g. azure-cli-2.10.1.msi) https://docs.microsoft.com/ja-jp/cli/azure/install-azure-cli-windows?view=azure-cli-latest&tabs=azure-cli
4. Install Visual Studio Code (VSCode) (e.g. VSCodeUserSetup-x64-1.48.2.exe) https://code.visualstudio.com/docs/?dv=win
5. Install the following VSCode extensions: "Docker", "Kubernetes", "Azure Tools", "Azure Kubernetes Service"

Then you can use docker, docker-compose, and kubectl commands in a VSCode terminal.
