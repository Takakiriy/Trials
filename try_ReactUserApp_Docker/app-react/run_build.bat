@echo off
PATH=C:\Program Files\Git\usr\bin;%PATH%

set commands=
set commands=%commands%  cd  $(cygpath --unix '%~d0%~p0');
set commands=%commands%  export PATH=$(cygpath --unix '%~d0%~p0')node_modules/.bin:${PATH};

if not exist "node_modules"  set commands=%commands%  echo 'Restore node_modules';
if not exist "node_modules"  set commands=%commands%  npm ci;
set commands=%commands%  echo 'rm -rf build';
set commands=%commands%  rm -rf build;
set commands=%commands%  echo 'npm run build';
set commands=%commands%  npm run build;

start "no-title" "C:\Program Files\Git\git-bash.exe"  -c "%commands%  exec bash"
