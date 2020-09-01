@echo off
PATH=C:\Program Files\Git\usr\bin;%PATH%
set this_folder=%~d0%~p0
cd /d %this_folder%
"C:\Program Files\Git\usr\bin\bash.exe"  scripts.sh  set-path  "%1"
echo source.s & "C:\Program Files\Git\usr\bin\bash.exe" -c "source .s;  exec bash"
