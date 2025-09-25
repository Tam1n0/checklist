#!/bin/bash

# Farben für Lesbarkeit
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # Kein Color

# Dateipfade
BACKEND_ENV="./.env"
FRONTEND_ENV="checklist-frontend/.env"

echo -e "${GREEN}🔧 Setup für .env Dateien startet...${NC}"

# Prüfen ob die .env-Dateien schon existieren
if [[ -f "$BACKEND_ENV" ]]; then
  echo -e "${RED}❌ $BACKEND_ENV existiert bereits. Bitte lösche sie manuell, um fortzufahren.${NC}"
  exit 1
fi

if [[ -f "$FRONTEND_ENV" ]]; then
  echo -e "${RED}❌ $FRONTEND_ENV existiert bereits. Bitte lösche sie manuell, um fortzufahren.${NC}"
  exit 1
fi

# FRONTEND
echo -e "\n📦 FRONTEND-Konfiguration ($FRONTEND_ENV)"
read -p "➡️  Empfänger-Mail (REACT_APP_MAIL_GETTER): " REACT_APP_MAIL_GETTER

mkdir -p checklist-frontend
cat > "$FRONTEND_ENV" <<EOL
REACT_APP_MAIL_GETTER=$REACT_APP_MAIL_GETTER
EOL

echo -e "${GREEN}✅ $FRONTEND_ENV erstellt${NC}"

# BACKEND
echo -e "\n🛠️  BACKEND-Konfiguration ($BACKEND_ENV)"
read -p "➡️  Absender-Mail (MAIL_USERNAME): " MAIL_USERNAME
read -p "➡️  16-stelliges App-Passwort (MAIL_PASSWORD): " MAIL_PASSWORD

cat > "$BACKEND_ENV" <<EOL
MAIL_USERNAME=$MAIL_USERNAME
MAIL_PASSWORD=$MAIL_PASSWORD
EOL

echo -e "${GREEN}✅ $BACKEND_ENV erstellt${NC}"

echo -e "\n🎉 ${GREEN}Setup abgeschlossen!${NC}"
