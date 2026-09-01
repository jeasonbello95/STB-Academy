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

set "LOCAL_SITE=%USERPROFILE%\Local Sites\stbacademylocal\app\public"
set "LOCAL_PLUGIN=%LOCAL_SITE%\wp-content\plugins\stb-academy-core"

set "BACKEND_SITE=%SCRIPT_DIR%stb-backend\app\public"
if not exist "%SCRIPT_DIR%stb-backend" (
    if exist "%SCRIPT_DIR%..\stb-backend" (
        set "BACKEND_SITE=%SCRIPT_DIR%..\stb-backend\app\public"
    )
)
set "BACKEND_PLUGIN=%BACKEND_SITE%\wp-content\plugins\stb-academy-core"

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
echo [2/3] Desplegando assets, imagenes y favicon hacia WordPress Local...
echo ------------------------------------------------------
if exist "%LOCAL_SITE%" (
    if not exist "%LOCAL_PLUGIN%\dist" mkdir "%LOCAL_PLUGIN%\dist"
    robocopy "%FRONTEND_DIR%\dist" "%LOCAL_PLUGIN%\dist" /MIR /NFL /NDL /NJH /NJS /NC /NS /NP
    
    if not exist "%LOCAL_SITE%\imagenes" mkdir "%LOCAL_SITE%\imagenes"
    robocopy "%FRONTEND_DIR%\public\imagenes" "%LOCAL_SITE%\imagenes" /MIR /NFL /NDL /NJH /NJS /NC /NS /NP
    
    if exist "%FRONTEND_DIR%\public\imagenes\favicon.png" (
        copy /Y "%FRONTEND_DIR%\public\imagenes\favicon.png" "%LOCAL_SITE%\favicon.png" >nul
        copy /Y "%FRONTEND_DIR%\public\imagenes\favicon.png" "%LOCAL_SITE%\favicon.ico" >nul
    )
    echo [OK] Bundles, imagenes y favicon sincronizados en WordPress Local.
) else (
    echo [AVISO] No se encontro la carpeta de WordPress Local.
)

echo.
echo [3/3] Desplegando assets e imagenes hacia stb-backend (Git Repo)...
echo ------------------------------------------------------
if exist "%BACKEND_SITE%" (
    if not exist "%BACKEND_PLUGIN%\dist" mkdir "%BACKEND_PLUGIN%\dist"
    robocopy "%FRONTEND_DIR%\dist" "%BACKEND_PLUGIN%\dist" /MIR /NFL /NDL /NJH /NJS /NC /NS /NP
    
    if not exist "%BACKEND_SITE%\imagenes" mkdir "%BACKEND_SITE%\imagenes"
    robocopy "%FRONTEND_DIR%\public\imagenes" "%BACKEND_SITE%\imagenes" /MIR /NFL /NDL /NJH /NJS /NC /NS /NP
    
    if exist "%FRONTEND_DIR%\public\imagenes\favicon.png" (
        copy /Y "%FRONTEND_DIR%\public\imagenes\favicon.png" "%BACKEND_SITE%\favicon.png" >nul
        copy /Y "%FRONTEND_DIR%\public\imagenes\favicon.png" "%BACKEND_SITE%\favicon.ico" >nul
    )
    echo [OK] Bundles, imagenes y favicon sincronizados en stb-backend.
) else (
    echo [AVISO] No se encontro la carpeta de stb-backend.
)

echo.
echo ======================================================
echo    SINCRONIZACION COMPLETADA CON EXITO
echo ======================================================
echo.
pause
