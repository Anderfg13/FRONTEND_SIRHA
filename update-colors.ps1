$filePath = "C:\Users\maria\Downloads\FrontStudianteSirha\src\components\ConfiguracionAcademica\ConfiguracionAcademica.css"
$content = Get-Content $filePath -Raw
$content = $content -replace '#c41e3a', 'var(--color-principal)'
$content | Set-Content $filePath -NoNewline
Write-Host "✅ Actualized ConfiguracionAcademica.css colors"