@echo off
setlocal EnableExtensions EnableDelayedExpansion
chcp 65001 >nul

title Publicar Controle de Ponto no GitHub

set "REPO_URL=https://github.com/thiagocordeirodantass-spec/controleponto.git"
set "PASTA_PROJETO=%~dp0projeto"
set "PASTA_ENVIO=%~dp0controleponto-github"

echo =====================================================
echo   PUBLICAR CONTROLE DE PONTO NO GITHUB
echo =====================================================
echo.

where git >nul 2>&1
if errorlevel 1 (
    echo [ERRO] O Git nao esta instalado neste computador.
    echo.
    echo Baixe em: https://git-scm.com/download/win
    echo Depois de instalar, execute este arquivo novamente.
    echo.
    pause
    exit /b 1
)

if not exist "%PASTA_PROJETO%\package.json" (
    echo [ERRO] A pasta "projeto" nao foi encontrada ou esta incompleta.
    echo Mantenha este arquivo BAT ao lado da pasta "projeto".
    echo.
    pause
    exit /b 1
)

if exist "%PASTA_ENVIO%" (
    echo Removendo copia anterior...
    rmdir /s /q "%PASTA_ENVIO%"
)

echo [1/5] Conectando ao repositorio...
git clone "%REPO_URL%" "%PASTA_ENVIO%"
if errorlevel 1 (
    echo.
    echo [ERRO] Nao foi possivel acessar o repositorio.
    echo Confirme o login no GitHub e se voce tem permissao no repositorio.
    echo.
    pause
    exit /b 1
)

echo [2/5] Copiando os arquivos do projeto...
robocopy "%PASTA_PROJETO%" "%PASTA_ENVIO%" /E /COPY:DAT /R:2 /W:1 /XD .git node_modules dist /XF PUBLICAR_NO_GITHUB.bat >nul
set "ROBOCODE=%ERRORLEVEL%"
if %ROBOCODE% GEQ 8 (
    echo [ERRO] Falha ao copiar os arquivos.
    pause
    exit /b 1
)

cd /d "%PASTA_ENVIO%"

echo [3/5] Preparando o commit...
git add -A

git diff --cached --quiet
if not errorlevel 1 (
    echo.
    echo Nenhuma alteracao nova foi encontrada. O repositorio ja pode estar atualizado.
    echo.
    pause
    exit /b 0
)

for /f "delims=" %%N in ('git config --global user.name') do set "GIT_NAME=%%N"
for /f "delims=" %%E in ('git config --global user.email') do set "GIT_EMAIL=%%E"

if not defined GIT_NAME (
    set /p "GIT_NAME=Digite seu nome para o commit: "
    git config --global user.name "!GIT_NAME!"
)

if not defined GIT_EMAIL (
    set /p "GIT_EMAIL=Digite o e-mail usado no GitHub: "
    git config --global user.email "!GIT_EMAIL!"
)

echo [4/5] Criando o commit...
git commit -m "Primeira versao do Controle de Ponto"
if errorlevel 1 (
    echo [ERRO] Nao foi possivel criar o commit.
    pause
    exit /b 1
)

echo [5/5] Enviando para o GitHub...
git branch -M main
git push -u origin main
if errorlevel 1 (
    echo.
    echo [ERRO] O envio falhou.
    echo Uma janela de login do GitHub pode ter sido aberta.
    echo Entre na conta thiagocordeirodantass-spec e execute novamente.
    echo.
    pause
    exit /b 1
)

echo.
echo =====================================================
echo   PUBLICACAO CONCLUIDA COM SUCESSO!
echo =====================================================
echo.
echo Repositorio:
echo https://github.com/thiagocordeirodantass-spec/controleponto
 echo.
pause
endlocal
