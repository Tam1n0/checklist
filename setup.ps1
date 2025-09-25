# Farben
$green = "`e[32m"
$red = "`e[31m"
$reset = "`e[0m"

Write-Host "${green}🔧 Setup für .env Dateien startet...${reset}`n"

# Pfade
$backendEnv = ".env"
$frontendEnv = "checklist-frontend\.env"

# Existenz prüfen
if (Test-Path $backendEnv) {
    Write-Host "${red}❌ $backendEnv existiert bereits. Bitte lösche sie manuell, um fortzufahren.${reset}"
    exit 1
}

if (Test-Path $frontendEnv) {
    Write-Host "${red}❌ $frontendEnv existiert bereits. Bitte lösche sie manuell, um fortzufahren.${reset}"
    exit 1
}

# FRONTEND
Write-Host "`n📦 FRONTEND-Konfiguration ($frontendEnv)"
$reactAppMailGetter = Read-Host "➡️  Empfänger-Mail (REACT_APP_MAIL_GETTER)"

# Ordner erstellen falls nötig
if (-not (Test-Path "checklist-frontend")) {
    New-Item -ItemType Directory -Path "checklist-frontend" | Out-Null
}

# .env in Frontend schreiben
@"
REACT_APP_MAIL_GETTER=$reactAppMailGetter
"@ | Out-File -Encoding UTF8 -FilePath $frontendEnv -Force

Write-Host "${green}✅ $frontendEnv erstellt${reset}"

# BACKEND
Write-Host "`n🛠️  BACKEND-Konfiguration ($backendEnv)"
$mailUsername = Read-Host "➡️  Absender-Mail (MAIL_USERNAME)"
$mailPassword = Read-Host "➡️  16-stelliges App-Passwort (MAIL_PASSWORD)"

# .env im Root schreiben
@"
MAIL_USERNAME=$mailUsername
MAIL_PASSWORD=$mailPassword
"@ | Out-File -Encoding UTF8 -FilePath $backendEnv -Force

Write-Host "${green}✅ $backendEnv erstellt${reset}`n"
Write-Host "🎉 ${green}Setup abgeschlossen!${reset}"
