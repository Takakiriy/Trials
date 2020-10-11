@echo off
rem ********************************************************************
rem * File: H.DataBaseCRUD/InstallAndRun.bat
rem *
rem * The base project is "G.DataBase" and "F.FormClass".
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

set  g_ProjectName=mysite

set  g_ApplicationName=hello

set  g_NewAdminPassword=123
	rem // Password of new "admin" user

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


	rem // Delete old project folder
	for %%s in ( %g_ProjectName%,  %g_ApplicationName% ) do (
		if exist "%%s" (

			rmdir /S /Q  "%%s"
			if exist "%%s" ( call :Error 1 & exit /b )
		)
	)
	goto :skip_1
	rem // Delete database file only
	for %%s in ( %g_ProjectName%\db.sqlite3,  %g_ApplicationName%\migrations ) do (
		if exist "%%s"\ (

			rmdir /S /Q  "%%s"
			if exist "%%s" ( call :Error 1 & exit /b )
		) else if exist "%%s" (
			del  "%%s"
			if exist "%%s" ( call :Error 1 & exit /b )
		)
	)
	:skip_1


	rem // ...
	echo.
	echo Set python path...
	@echo on

	call  "%python_path%\Scripts\activate.bat"
	@echo off
	call  :GetParentPath  "%g_ThisBatchPath%"  & if errorlevel 1 ( exit /b )
	@echo on

	set PYTHONPATH=%PYTHONPATH%;%return_value%
	@echo off & if errorlevel 1 ( exit /b )


	rem // ...
	echo.
	echo Make a django application and start the web server...
	@echo on

	django-admin startproject  %g_ProjectName%  & rem // Create new project at "%cd%\%g_ProjectName%".
	@echo off & if errorlevel 1 ( exit /b )
	@echo on

	django-admin startapp  %g_ApplicationName%  & rem // Create new application at "%cd%\%g_ApplicationName%".
	@echo off & if errorlevel 1 ( exit /b )
	@echo on

	call  :gs_EditApplication
	@echo off & if errorlevel 1 ( exit /b )


	rem // ...
	echo.
	echo Create database file...
	@echo on

	pushd  "%g_ProjectName%"
	@echo off & if errorlevel 1 ( exit /b )
		@echo on

		python  manage.py  makemigrations  %g_ApplicationName%  & rem // Create the migration file (database).
		@echo off & if errorlevel 1 ( exit /b )
		@echo on

		python  manage.py  migrate  & rem // Migrate database.
		@echo off & if errorlevel 1 ( exit /b )
		set  code=
		set  code=%code%from django.contrib.auth import get_user_model;
		set  code=%code%User = get_user_model();
		set  code=%code%User.objects.create_superuser('admin', 'admin@example.com', '%g_NewAdminPassword%')
		@echo on

		echo %code%  |  python  manage.py  shell  & rem // Create a super user
		@echo off & if errorlevel 1 ( exit /b )
		@echo on

		python  manage.py  loaddata  ..\friends.json  & rem // Add initial data
		@echo off & if errorlevel 1 ( exit /b )
	@echo on

	popd
	@echo off & if errorlevel 1 ( exit /b )


	rem // ...
	echo.
	echo Start the web server...
	@echo on

	start "" python  %g_ProjectName%\manage.py  runserver
	@echo off & if errorlevel 1 ( exit /b )


	rem // ...
	echo Open client web browser...
	@echo on

	start ""  "http://localhost:8000/hello"
	@echo off & if errorlevel 1 ( exit /b )
	@echo on

	start ""  "http://localhost:8000/admin"
	@echo off & if errorlevel 1 ( exit /b )

	echo.
	echo Now new "admin" user was created. (Password:"%g_NewAdminPassword%")


	rem // ...
:loop
	echo.
	echo Next is dump from the database.

	pause
	@echo on

	pushd  "%g_ProjectName%"
	@echo off & if errorlevel 1 ( exit /b )
		@echo on

		python  manage.py  dumpdata  %g_ApplicationName%
		@echo off & if errorlevel 1 ( exit /b )
	@echo on

	popd
	@echo off & if errorlevel 1 ( exit /b )

	goto :loop


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
rem * Function: gs_EditApplication
rem *
rem * Arguments:
rem *	None
rem *
rem * Return Value:
rem *	None
rem ********************************************************************
:gs_EditApplication
	@echo off

	rem // Copy "SECRET_KEY", because "SECRET_KEY" is changed every creation.
	call  :CopyOneLine   "%g_ProjectName%\%g_ProjectName%\settings.py" ^
		"patch\patch\%g_ProjectName%\%g_ProjectName%\settings.py" ^
		"SECRET_KEY ="
		if errorlevel 1 ( exit /b )

	call  :CopyOneLine     "%g_ProjectName%\%g_ProjectName%\settings.py" ^
		"patch\back_up\%g_ProjectName%\%g_ProjectName%\settings.py" ^
		"SECRET_KEY ="
		if errorlevel 1 ( exit /b )


	rem // AttachPatch()

	call  :AttachPatch ^
		"." ^
		"patch\patch" ^
		"patch\back_up"
		if errorlevel 1 ( exit /b )

	exit /b  0
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


	rem // echo()
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
rem * Function: AssertExist
rem *    AssertExist
rem *
rem * Arguments:
rem *    "%~1" - Checking Path
rem *
rem * Return Value:
rem *    %errorlevel% - 0=no error
rem ********************************************************************
:AssertExist
	if not exist "%~1" (
		call :Error 1 "Not found '%~1'" & exit /b
	)
	exit /b  0
goto :eof


rem ********************************************************************
rem * Function: AttachPatch
rem *    AttachPatch
rem *
rem * Arguments:
rem *    "%~1" - A path of target folder path
rem *    "%~2" - A path of patch folder path
rem *    "%~3" - A path of back_up folder path
rem *
rem * Return Value:
rem *    %errorlevel% - 0=no error
rem ********************************************************************
:AttachPatch
	setLocal  EnableDelayedExpansion

	call  :AttachPatch_Sub  "%~1"  "%~2"  "%~3"
		set  errorlevel_back_up=%errorlevel%

rem // finally
	call  :DeleteFile  "%tmp%\batlib_list_of_patch_folder.txt"
	call  :DeleteFile  "%tmp%\batlib_list_of_back_up_folder.txt"
	call  :EndLocal_1  &  endLocal  &  call  :EndLocal_2  &  set  errorlevel_back_up=%errorlevel_back_up%
	exit /b  %errorlevel_back_up%
goto :eof


:AttachPatch_Sub
	set  in_TargetFolderPath=%~1
	set  in_PatchFolderPath=%~2
	set  in_BackUpFolderPath=%~3
	echo %cd%^>AtachPatch  "%in_TargetFolderPath%"


	rem // batlib_list_*.txt ファイルの内容をファイルとフォルダーの一覧にする
	call  :AssertExist  "%in_PatchFolderPath%"
	dir /S /B "%in_PatchFolderPath%"  > "%tmp%\batlib_list_of_patch_folder.txt"
		if errorlevel 1 ( exit /b )
	call  :AssertExist  "%in_BackUpFolderPath%"
	dir /S /B "%in_BackUpFolderPath%" > "%tmp%\batlib_list_of_back_up_folder.txt"
		if errorlevel 1 ( exit /b )
	call  :GetFullPath  "%in_PatchFolderPath%"  & if errorlevel 1 ( exit /b )
		set  full_path_of_patch_folder=%return_value%
	call  :GetFullPath  "%in_BackUpFolderPath%"  & if errorlevel 1 ( exit /b )
		set  full_path_of_back_up_folder=%return_value%


	rem // batlib_list_*.txt ファイルの内容を相対パスにする（ただし、行頭は\ ）
	call  :ReplaceInFile  "%tmp%\batlib_list_of_patch_folder.txt"    "%full_path_of_patch_folder%"    ""
		if errorlevel 1 ( exit /b )
	call  :ReplaceInFile  "%tmp%\batlib_list_of_back_up_folder.txt"  "%full_path_of_back_up_folder%"  ""
		if errorlevel 1 ( exit /b )


	rem // CopyAndRenameFile() : パッチのファイルをターゲットにコピーする
	for /f "delims="  %%s  in (%tmp%\batlib_list_of_patch_folder.txt) do (
		set  path_in_target=!in_TargetFolderPath!%%s
		set  path_in_patch=!in_PatchFolderPath!%%s
		set  path_in_back_up=!in_BackUpFolderPath!%%s
		call  :IsFolderExists  "!path_in_patch!"  & if errorlevel 1 ( exit /b )
			set  patch_is_folder=!return_value!

		if not "!patch_is_folder!"=="%True%" (
		rem // if not exist "!patch_is_folder!"\ == "%True%" (

			rem // is_found_in_back_up = ...
			find  "%%s"  "%tmp%\batlib_list_of_back_up_folder.txt"  > nul
			set  is_found_in_back_up=%True%
			if errorlevel 1 ( set  is_found_in_back_up=%False% )


			rem // Check if the overwrting file is same as the back up file.
			if "!is_found_in_back_up!"=="%True%" (
				call  :IsSameBinaryFile  "!path_in_target!"  "!path_in_back_up!"  & if errorlevel 1 ( exit /b )
					set  is_same_as_back_up=!return_value!

				if not "!is_same_as_back_up!" == "%True%" (
					call  :IsSameBinaryFile  "!path_in_target!"  "!path_in_patch!"  & if errorlevel 1 ( exit /b )
						set  is_same_as_patch=!return_value!
					if not "!is_same_as_patch!" == "%True%" (

						call :Error 1 "Unexpected file content at '!path_in_target!'" & exit /b
					)
				)
			) else (
				if exist "!path_in_target!" (
					call :Error 1 "Not found '!path_in_back_up!' file for checking overwriting" & exit /b
				)
			)

			rem // CopyAndRenameFile()
			echo !path_in_target!
			call  :CopyAndRenameFile  "!path_in_patch!"  "!path_in_target!"  & if errorlevel 1 ( exit /b )
		)
	)


	rem // DeleteFile()
	for /f "delims="  %%s  in (%tmp%\batlib_list_of_back_up_folder.txt) do (
		set  path_in_target=!in_TargetFolderPath!%%s
		set  path_in_patch=!in_PatchFolderPath!%%s
		set  path_in_back_up=!in_BackUpFolderPath!%%s
		call  :IsFolderExists  "!path_in_target!"  & if errorlevel 1 ( exit /b )
			set  target_is_folder=!return_value!

		if not "!target_is_folder!" == "%True%" (

			rem // is_found_in_patch = ...
			find  "%%s"  "%tmp%\batlib_list_of_patch_folder.txt"  > nul
			set  is_found_in_patch=%True%
			if errorlevel 1 ( set  is_found_in_patch=%False% )


			rem // DeleteFile()
			if not "!is_found_in_patch!"=="%True%" (
				if exist "!path_in_target!" (
					call  :IsSameBinaryFile  "!path_in_target!"  "!path_in_back_up!"  & if errorlevel 1 ( exit /b )
						set  is_same_as_back_up=!return_value!

					if not "!is_same_as_back_up!" == "%True%" (
						call :Error 1 "Unexpected file content at '!path_in_target!'" & exit /b
					)

					echo !path_in_target! - delete
					call  :DeleteFile  "!path_in_target!"  & if errorlevel 1 ( exit /b )
				)
			)
		)
	)
	call  :ClearError
	exit /b  0
goto :eof


rem ********************************************************************
rem * Function: ClearError
rem *
rem * Arguments:
rem *    None
rem *
rem * Return Value:
rem *    None
rem ********************************************************************
:ClearError
	set error_message=
	exit /b  0
goto :eof


rem ********************************************************************
rem * Function: CopyAndRenameFile
rem *
rem * Arguments:
rem *    "%~1" - source file path
rem *    "%~2" - destination file path
rem *
rem * Return Value:
rem *    None
rem ********************************************************************
:CopyAndRenameFile
	set  in_SourceFilePath=%~1
	set  in_DestinationFilePath=%~2

	call  :MakeFolderFor  "%in_DestinationFilePath%"  & if errorlevel 1 ( exit /b )

	copy  "%in_SourceFilePath%"  "%in_DestinationFilePath%" > nul
goto :eof


rem ********************************************************************
rem * Function: CopyOneLine
rem *
rem * Arguments:
rem *    "%~1" - A source file path
rem *    "%~2" - A destination file path
rem *    "%~3" - A regular expression matched with the target line
rem *
rem * Return Value:
rem *    None
rem ********************************************************************
:CopyOneLine
	set       in_SourceFilePath=%~1
	set  in_DestinationFilePath=%~2
	set    in_RegularExpression=%~3

	powershell -nologo  -command ^
		"$(Get-Content '%in_DestinationFilePath%').Replace( ( Select-String  -Pattern '%in_RegularExpression%'  -Path '%in_DestinationFilePath%' )[0].Line,  ( Select-String  -Pattern '%in_RegularExpression%'  -Path '%in_SourceFilePath%' )[0].Line )" ^
		> "%in_DestinationFilePath%.updating"

	del  "%in_DestinationFilePath%"  & if errorlevel 1 ( exit /b )
	move "%in_DestinationFilePath%.updating"  "%in_DestinationFilePath%"  > nul  & if errorlevel 1 ( exit /b )

	exit /b  0
goto :eof


rem ********************************************************************
rem * Function: DeleteFile
rem *
rem * Arguments:
rem *    "%~1" - File path
rem *
rem * Return Value:
rem *    None
rem ********************************************************************
:DeleteFile
	if exist "%~1"  ( del  "%~1" )
	if exist "%~1"  ( call :Error  1 "cannot delete '%~1'" & exit /b )
	exit /b 0
goto :eof


rem ********************************************************************
rem * Function: EndLocal_1
rem *    endLocal saving global variable
rem *
rem * Arguments:
rem *    None
rem *
rem * Return Value:
rem *    None
rem *
rem * Example:
rem *    > call  :EndLocal_1  &  endLocal  &  call  :EndLocal_2
rem ********************************************************************
:EndLocal_1
	if exist  "%tmp%\batlib_global_variables.bat"  (
		del  "%tmp%\batlib_global_variables.bat"
	)


	rem // Global variables
	(echo set  g_ErrorID=%g_ErrorID%)>>         "%tmp%\batlib_global_variables.bat"
	(echo set  error_message=%error_message%)>> "%tmp%\batlib_global_variables.bat"
goto :eof




rem ********************************************************************
rem * Function: EndLocal_2
rem *    endLocal saving global variable
rem *
rem * Arguments:
rem *    None
rem *
rem * Return Value:
rem *    None
rem *
rem * Example:
rem *    > call  :EndLocal_1  &  endLocal  &  call  :EndLocal_2
rem ********************************************************************
:EndLocal_2
	call  "%tmp%\batlib_global_variables.bat"
goto :eof


rem ********************************************************************
rem * Function: GetFullPath
rem *
rem * Arguments:
rem *    "%~1" - A full path or relative path
rem *
rem * Return Value:
rem *    %return_value% - A full path
rem ********************************************************************
:GetFullPath
	set  in_Path=%~1

	call  :IsFullPath  "%in_Path%"
		if errorlevel 1 ( exit /b )
	set  is_full_path=%return_value%
	if %cd:~-1% == \ (
		set  cd_is_root_path_=%True%
	) else (
		set  cd_is_root_path_=%False%
	)

	if "%is_full_path%" == "%True%" (
		set  full_path_=%in_Path%
	) else if "%cd_is_root_path_%" == "%True%" (
		set  full_path_=%cd%%in_Path%
	) else (
		set  full_path_=%cd%\%in_Path%
	)

	set  return_value=%full_path_%
	exit /b  0
goto :eof


rem ********************************************************************
rem * Function: GetParentPath
rem *
rem * Arguments:
rem *    "%~1" - Path
rem *
rem * Return Value:
rem *    %return_value% - Parent full path of "%~1"
rem ********************************************************************
:GetParentPath
	set path_=%~1
	set return_value=
	if "%path_%" == ""      ( call :Error 1 "Not found parent folder" & exit /b )
	if "%path_:~-1%" == ":" ( call :Error 1 "Not found parent folder" & exit /b )

	set path_=%~dp1
	set path_=%path_:~0,-1%
	set return_value=%path_:)=^)%
	exit /b  0
goto :eof


rem ********************************************************************
rem * Function: IsFolderExists
rem *
rem * Arguments:
rem *    "%~1" - Path
rem *
rem * Return Value:
rem *    "%return_value%" - %True% or %False%
rem ********************************************************************
:IsFolderExists
	if exist "%~1"\ (
		set return_value=%True%
	) else (
		set return_value=%False%
	)
	exit /b  0
goto :eof


rem ********************************************************************
rem * Function: IsFullPath
rem *
rem * Arguments:
rem *    "%~1" - A full path or relative path
rem *
rem * Return Value:
rem *    %return_value% - %True% or %False%
rem ********************************************************************
:IsFullPath
	set  in_Path=%~1

	rem // %in_Path:~0,1% : in_Path.substring( 0, 0+1 ) // JavaScript
	rem // %in_Path:~1,2% : in_Path.substring( 1, 1+2 ) // JavaScript

	if (%in_Path:~0,1%) == (\) (
		set  is_full_path=%True%
	) else if (%in_Path:~1,2%) == (:\) (
		set  is_full_path=%True%
	) else (
		set  is_full_path=%False%
	)
	set  return_value=%is_full_path%
	exit /b  0
goto :eof


rem ********************************************************************
rem * Function: IsSameBinaryFile
rem *
rem * Arguments:
rem *    "%~1" - A file path
rem *    "%~2" - another file path
rem *
rem * Return Value:
rem *    %return_value% - %True% or %False%
rem ********************************************************************
:IsSameBinaryFile
	set in_FilePathA=%~1
	set in_FilePathB=%~2

	echo n | ( comp  "%in_FilePathA%"  "%in_FilePathB%" > nul 2> nul )
	if "%errorlevel%" == "0" (
		set  return_value=%True%
	) else if "%errorlevel%" == "1" (
		set  return_value=%False%
	) else (
		if not exist "%in_FilePathA%" (
			call :Error 1 "Not found '%in_FilePathA%'" & exit /b
		) else (
			call :Error 4 "Not found '%in_FilePathB%'" & exit /b
		)
	)
	exit /b  0
goto :eof


rem ********************************************************************
rem * Function: MakeFolderFor
rem *    Make an empty folder at the parent of specified path
rem *
rem * Arguments:
rem *    "%~1" - A child file/folder path
rem *
rem * Return Value:
rem *    None
rem ********************************************************************
:MakeFolderFor
	set  in_ChildPath=%~1

	rem // parent_path = ...
	call  :GetParentPath  "%in_ChildPath%"  & if errorlevel 1 ( exit /b )
	set  parent_path=%return_value%


	rem // mkdir()
	if not exist "%parent_path%" (

		mkdir  "%parent_path%"  & if errorlevel 1 ( exit /b )
	)

	exit /b  0
goto :eof


rem ********************************************************************
rem * Function: ReplaceInFile
rem *    ReplaceInFile
rem *
rem * Arguments:
rem *    "%~1" - A path of the target file
rem *    "%~2" - A keyword before replacing
rem *    "%~3" - A keyword after replacing
rem *
rem * Return Value:
rem *    None
rem ********************************************************************
:ReplaceInFile
	set  in_PathOfFile=%~1
	set  in_KeywordBeforeReplacing=%~2
	set  in_KeywordAfterReplacing=%~3

	set  back_up_path=%in_PathOfFile%.updating
	set  before=%in_KeywordBeforeReplacing%
	set  after=%in_KeywordAfterReplacing%

	copy  "%in_PathOfFile%"  "%back_up_path%"  > nul  & if errorlevel 1 ( exit /b )
	del   "%in_PathOfFile%"
	setLocal  EnableDelayedExpansion


	rem // Output a file at "%in_PathOfFile%".
	for /f "tokens=1,* delims=]" %%s in ('find /n /v "" ^< "%back_up_path%"') do (
		rem // %%t is next of %%s
		set line=%%t
			rem // Memo: The following code does not keep empty lines.
			rem // > for /f "delims=" %%s in (%back_up_path%)

		if "!line!" == "" (
			echo.>> "%in_PathOfFile%"
		) else if "!line!" == "!in_KeywordBeforeReplacing!" (
			(echo %after%)>> "%in_PathOfFile%"  & rem // Replace a line.
		) else (
			(echo !line:%before%=%after%!)>> "%in_PathOfFile%"  & rem // Replace a keyword.
		)
	)
	del   "%back_up_path%"
	call  :EndLocal_1  &  endLocal  &  call  :EndLocal_2
	exit /b  0
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


