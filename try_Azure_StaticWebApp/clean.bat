@echo off
PATH=C:\Program Files\Git\usr\bin;%PATH%

set commands=
set commands=%commands%  cd  $(cygpath --unix '%~d0%~p0');
set commands=%commands%  export PATH=$(cygpath --unix '%~d0%~p0')node_modules/.bin:${PATH};

set commands=%commands%  echo 'rm -rf  angular-app/node_modules';
set commands=%commands%  rm -rf  angular-app/node_modules;
set commands=%commands%  echo 'rm -rf  api-starter/node_modules';
set commands=%commands%  rm -rf  api-starter/node_modules;
set commands=%commands%  echo 'rm -rf  react-app/node_modules';
set commands=%commands%  rm -rf  react-app/node_modules;
set commands=%commands%  echo 'rm -rf  svelte-app/node_modules';
set commands=%commands%  rm -rf  svelte-app/node_modules;
set commands=%commands%  echo 'rm -rf  vue-app/node_modules';
set commands=%commands%  rm -rf  vue-app/node_modules;

start "no-title" "C:\Program Files\Git\git-bash.exe"  -c "%commands%"
