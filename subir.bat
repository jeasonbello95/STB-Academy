@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul

echo ============================================
echo   Subiendo cambios a GitHub...
echo ============================================

set "MSG=%~1"
if "%MSG%"=="" (
    set "MSG=Actualizacion: %date% %time%"
)

git add .
git commit -m "%MSG%"
git push origin main

if %ERRORLEVEL% equ 0 (
    echo.
    echo [OK] Cambios subidos correctamente con mensaje: "%MSG%"
) else (
    echo.
    echo [AVISO] Revisa si necesitas autenticarte con: gh auth login
)
