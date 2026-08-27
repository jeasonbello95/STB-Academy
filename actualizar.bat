@echo off
chcp 65001 >nul

echo ============================================
echo   Actualizando repositorio desde GitHub...
echo ============================================

git pull origin main

if %ERRORLEVEL% equ 0 (
    echo.
    echo [OK] Repositorio actualizado con exito.
) else (
    echo.
    echo [ERROR] No se pudo actualizar. Revisa tu conexion o estado de git.
)
