param(
    [string]$Mensaje = ""
)

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Subiendo cambios a GitHub..." -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan

if ([string]::IsNullOrWhiteSpace($Mensaje)) {
    $Fecha = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $Mensaje = "Actualizacion: $Fecha"
}

git add .
git commit -m "$Mensaje"
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n[OK] Cambios subidos correctamente con mensaje: '$Mensaje'" -ForegroundColor Green
} else {
    Write-Host "`n[AVISO] Si es la primera vez, asegurate de autenticarte con: gh auth login" -ForegroundColor Yellow
}
