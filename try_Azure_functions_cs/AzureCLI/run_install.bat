@echo off
PATH=C:\Program Files\Git\usr\bin;%PATH%

set commands=
set commands=%commands%  cd  $(cygpath --unix '%~d0%~p0');
set commands=%commands%  ./scripts.sh  setup;
set commands=%commands%  ./scripts.sh  set-path;
set commands=%commands%  echo  'source .s';  source .s;
if not "%1" == ""  set commands=%commands%  cd  $(cygpath --unix '%1');

start "no-title" "C:\Program Files\Git\git-bash.exe"  -c "%commands%  exec bash"
