@echo off
rem ********************************************************************
rem * File: A.InstallDjango/InstallAndRun.bat
rem ********************************************************************

rem // Constant
set  True=0
set  False=1

rem // Setting
rem //==================================================================

set  g_PythonVersion=3.7.2

set  g_DjangoVersion=2.0.1

set  g_PythonBit=64
	rem // 64 or 32

set  g_VirtualEnvironmentName=scriptlib

set  g_InstallingIsEnabled=%True%
	rem // True or False
rem //==================================================================


rem ********************************************************************
rem * Function: Main
rem *
rem * Return Value:
rem *	%errorlevel% - 0=Pass
rem ********************************************************************
:Main
	call  :SetVariables "%~0"
	call  :MainTry  &  call :MainFin  &  goto :eof
:MainTry
	set  python_version_123=%g_PythonVersion:.=%
	call  :gs_CutPatchVersionNumber  "%g_PythonVersion%"
	set  python_version_1_2=%return_value%
	if "%g_PythonBit%" == "32" (
		set  python_version_12=%python_version_1_2:.=%-32
	) else (
		set  python_version_12=%python_version_1_2:.=%
	)

	rem // The address of the python engine: %USERPROFILE%\AppData\Local\Programs\Python
	set  base_python_path=%USERPROFILE%\AppData\Local\Programs\Python\Python%python_version_12%
	set       python_path=%USERPROFILE%\AppData\Local\Programs\Python\Python%python_version_12%_%g_VirtualEnvironmentName%
	set  python_installer=python-%g_PythonVersion%-amd64.exe
	echo.

	echo Python virtual environment: %python_path%


	rem // Install python
	if not exist "%base_python_path%\python.exe" (@echo>nul) else (goto :end_if_1)

		rem // Guard
		if not exist "%python_installer%" (
			echo Windows x86-64 executable installer
			echo https://www.python.org/downloads/release/python-%python_version_123%/
			echo Uncheck "Add Python %python_version_1_2% to PATH" when you install Python
			echo.
			call  :Error  1  "Not found Python %g_PythonVersion% in %base_python_path%."
			exit /b
		)
		@echo on
		if exist "%base_python_path%" (

			rmdir /S /Q  "%base_python_path%"
		)
		@echo off
		@echo on

		"%python_installer%"  /passive
		@echo off
	:end_if_1


	rem // Make a python virtual environment
	if not exist "%python_path%" (@echo>nul) else (goto :end_if_2)
		echo Making a python virtual environment ...
		@echo on

		pushd  "%base_python_path%\Scripts"
		@echo off & if errorlevel 1 ( exit /b )
			@echo on

			pip  install  virtualenv
			@echo off & if errorlevel 1 ( exit /b )
			@echo on

			virtualenv  "%python_path%"
			@echo off & if errorlevel 1 ( exit /b )
			set  g_InstallingIsEnabled=%True%
		@echo on

		popd
		@echo off & if errorlevel 1 ( exit /b )
	:end_if_2


	rem // Install related python modules
	if "%g_InstallingIsEnabled%" == "%True%" (@echo>nul) else (goto :end_if_3)
		@echo on

		pushd  "%python_path%\Scripts"
		@echo off & if errorlevel 1 ( exit /b )

			rem // Install Django
			@echo on

			pip install  django==%g_DjangoVersion%  & rem // web UI framework
			@echo off & if errorlevel 1 ( exit /b )

			rem // List up installed python modules versions
			echo.
			@echo on

			pip freeze
			@echo off & if errorlevel 1 ( exit /b )
		@echo on

		popd
		@echo off & if errorlevel 1 ( exit /b )
	:end_if_3


	echo.
	echo Successfully installed.
	echo.


	rem // ...
	echo Make a django application and start the web server.
	@echo on

	call  "%python_path%\Scripts\activate.bat"


	rem // ...
	echo Start the web server...
	@echo on

	start "" python  manage.py  runserver
	@echo off & if errorlevel 1 ( exit /b )


	rem // ...
	echo Open client web browser...
	@echo on

	start ""  "http://127.0.0.1:8000/"
	@echo off & if errorlevel 1 ( exit /b )


	rem // end
	if "%g_InstallingIsEnabled%" == "%True%" (
		echo End of script.
		if "%no_error_pause%" == "" ( pause )
	)
exit /b  0
:MainFin
	if not "%errorlevel%" == "0" (
		echo Error %errorlevel%. %error_message% ^(g_ErrorID=%g_ErrorID%^)
		if "%no_error_pause%" == "" ( pause )
		exit /b  %errorlevel%
	)
goto :eof


rem ********************************************************************
rem * Function: gs_CutPatchVersionNumber
rem *
rem * Arguments:
rem *	"%~1" - A version number. e.g. 1.2.3
rem *
rem * Return Value:
rem *	%retun_value% - Major and minor version number. e.g. 1.2
rem ********************************************************************
:gs_CutPatchVersionNumber
	set  return_value=%~n1
goto :eof


rem ********************************************************************
rem * Section: batlib
rem ********************************************************************


rem ********************************************************************
rem * Function: Error
rem *
rem * Arguments:
rem *    "%~1" - Value of setting %errorlevel%
rem *    "%~2" - Error message
rem *
rem * Return Value:
rem *    %errorlevel% - %~1. Number type
rem *
rem * Example:
rem *    if "%parameter%" == "" ( call :Error 1 & exit /b )
rem *
rem * Example:
rem *    if "%parameter%" == "" ( call :Error 1 "No parameter '%variable%'" & exit /b )
rem *
rem * Description:
rem *    This sets %error_message% variable.
rem *    This adds %g_ErrorID% variable.
rem *    This echos each command from %g_ErrorID% was matched %g_EchoErrorID%.
rem ********************************************************************
:Error
	set /A g_ErrorID = %g_ErrorID% + 1

	set error_message=%~2
		rem // "echo %error_message%" cannot execute, if there are "<" and ">" of "<ERROR/>".

	if "%g_ErrorID%" == "%g_EchoErrorID%"  (
		echo.
		echo ===============================================================================
		echo ^<ERROR  errorlevel="%~1"  error_message="%~2"  g_ErrorID="%g_ErrorID%"/^>
		call :DebugBreak
		echo.
		echo.
		echo on
	)

	exit /b %~1
goto :eof


rem ********************************************************************
rem * Function: SetVariables
rem *    SetVariables
rem *
rem * Arguments:
rem *    "%~1" - main "%~0"
rem *
rem * Return Value:
rem *    None
rem ********************************************************************
:SetVariables

	rem // g_ErrorID = ...
	set  g_ErrorID=0

	rem ********************************************************************
	rem * Variable: g_ThisBatchPath
	rem ********************************************************************
	set  g_ThisBatchPath=%~1
	rem // ReplaceParentheses
	set  g_ThisBatchPath=%g_ThisBatchPath:(=__%
	set  g_ThisBatchPath=%g_ThisBatchPath:)=__%


	rem // Set current folder to the parent folder of this file.
	if not "%g_ThisBatchPath:~0,2%" == "\\" (

		cd  "%~d1%~p1"
	) else (
		if not exist "%USERPROFILE%\BatchWork" (
			mkdir  "%USERPROFILE%\BatchWork" )
		cd  "%USERPROFILE%\BatchWork"
		echo cd  "%USERPROFILE%\BatchWork"
	)


	rem ********************************************************************
	rem * Variable: True
	rem ********************************************************************
	set  True=0
		rem // 0 is same as the specifiation of Linux bash "test" command and batch file "comp" command.
		rem // It is not same as the specifiation of C language boolean type.

	rem ********************************************************************
	rem * Variable: False
	rem ********************************************************************
	set  False=1
		rem // Not 0 is same as the specifiation of Linux bash "test" command and batch file "comp" command
		rem // It is not same as the specifiation of C language boolean type.

	exit /b  0
goto :eof


