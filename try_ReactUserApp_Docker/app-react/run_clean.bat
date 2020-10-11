@echo off
PATH=C:\Program Files\Git\usr\bin;%PATH%

set commands=
set commands=%commands%  cd  $(cygpath --unix '%~d0%~p0');
set commands=%commands%  export PATH=$(cygpath --unix '%~d0%~p0')node_modules/.bin:${PATH};

set commands=%commands%  echo 'rm -rf node_modules';
set commands=%commands%  rm -rf node_modules;
set commands=%commands%  echo 'rm -rf build';
set commands=%commands%  rm -rf build;

start "no-title" "C:\Program Files\Git\git-bash.exe"  -c "%commands%"
