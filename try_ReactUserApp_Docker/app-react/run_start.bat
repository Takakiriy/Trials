@echo off
PATH=C:\Program Files\Git\usr\bin;%PATH%

set commands=
set commands=%commands%  cd  $(cygpath --unix '%~d0%~p0');
set commands=%commands%  npm run start;

start "no-title" "C:\Program Files\Git\git-bash.exe"  -c "%commands%  exec bash"
