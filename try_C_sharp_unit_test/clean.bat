@echo off
PATH=C:\Program Files\Git\usr\bin;%PATH%

set commands=
set commands=%commands%  cd  $(cygpath --unix '%~d0%~p0');
set commands=%commands%  export PATH=$(cygpath --unix '%~d0%~p0')node_modules/.bin:${PATH};

set commands=%commands%  echo 'rm -rf MyService/bin';
set commands=%commands%  rm -rf MyService/bin;
set commands=%commands%  echo 'rm -rf MyService/obj';
set commands=%commands%  rm -rf MyService/obj;
set commands=%commands%  echo 'rm -rf MyService/bin';
set commands=%commands%  rm -rf MyService.xTests/bin;
set commands=%commands%  echo 'rm -rf MyService/obj';
set commands=%commands%  rm -rf MyService.xTests/obj;

start "no-title" "C:\Program Files\Git\git-bash.exe"  -c "%commands%"
