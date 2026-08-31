@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul

echo ======================================================
echo    COMPILANDO REACT Y SINCRONIZANDO CON WORDPRESS
echo ======================================================
echo.

set "SCRIPT_DIR=%~dp0"
set "FRONTEND_DIR=%SCRIPT_DIR%"

if exist "%SCRIPT_DIR%stb-academy" (
    set "FRONTEND_DIR=%SCRIPT_DIR%stb-academy"
)

set "LOCAL_PLUGIN=%USERPROFILE%\Local Sites\stbacademylocal\app\public\wp-content\plugins\stb-academy-core"
set "BACKEND_PLUGIN=%SCRIPT_DIR%stb-backend\app\public\wp-content\plugins\stb-academy-core"
if not exist "%SCRIPT_DIR%stb-backend" (
    if exist "%SCRIPT_DIR%..\stb-backend" (
        set "BACKEND_PLUGIN=%SCRIPT_DIR%..\stb-backend\app\public\wp-content\plugins\stb-academy-core"
    )
)

echo [1/3] Compilando frontend React con Vite...
echo ------------------------------------------------------
pushd "%FRONTEND_DIR%"
call npm run build
if !ERRORLEVEL! neq 0 (
    echo.
    echo [ERROR] La compilacion de React fallo. Revisa los errores arriba.
    popd
    pause
    exit /b 1
)
popd

echo.
echo [2/3] Desplegando assets hacia WordPress Local (stbacademylocal)...
echo ------------------------------------------------------
if exist "%LOCAL_PLUGIN%" (
    if not exist "%LOCAL_PLUGIN%\dist" mkdir "%LOCAL_PLUGIN%\dist"
    robocopy "%FRONTEND_DIR%\dist" "%LOCAL_PLUGIN%\dist" /E /NFL /NDL /NJH /NJS /NC /NS /NP
    echo [OK] Assets sincronizados en WordPress Local.
) else (
    echo [AVISO] No se encontro la carpeta del plugin en stbacademylocal.
)

echo.
echo [3/3] Desplegando assets hacia stb-backend (Repositorio Git)...
echo ------------------------------------------------------
if exist "%BACKEND_PLUGIN%" (
    if not exist "%BACKEND_PLUGIN%\dist" mkdir "%BACKEND_PLUGIN%\dist"
    robocopy "%FRONTEND_DIR%\dist" "%BACKEND_PLUGIN%\dist" /E /NFL /NDL /NJH /NJS /NC /NS /NP
    echo [OK] Assets sincronizados en stb-backend.
) else (
    echo [AVISO] No se encontro la carpeta del plugin en stb-backend.
)

echo.
echo ======================================================
echo    SINCRONIZACION COMPLETADA CON EXITO
echo ======================================================
echo.
pause
