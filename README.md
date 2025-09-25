# Urlaubs-Checkliste
### Urlaubs-Checkliste mit eingebautem Email-Report an HR.


### Geschrieben in:

### Spring-Boot (Java)

### React (TypeScript, TailwindCSS)


### Email Report läuft über Google SMTP Server --> Gmail benötigt!


## Dependencies
- **Java 17 oder höher**
- **Node.js + npm** (empfohlen: Node 18+)
- **Git**

## 📥 Projekt klonen

```bash
git clone https://github.com/Tam1n0/checklist.git
cd checklist
```




# Wichtig:

## 📦 Projekt Setup

Dieses Projekt benötigt zwei `.env`-Dateien – eine für das **Backend (im Root-Verzeichnis)** und eine für das **Frontend (`checklist-frontend/`)**.

Du kannst sie entweder **automatisch per Setup-Skript** erstellen oder **manuell anlegen**.

---

## 🚀 Setup mit Skript

### 🐧 Für Linux/macOS (Bash)

1. Terminal öffnen
2. Skript ausführbar machen:

   ```bash
   chmod +x setup.sh
   ```
3. Ausführen:

   ```bash
   ./setup.sh
   ```

---

### 🪟 Für Windows (PowerShell)

1. PowerShell öffnen (als Administrator empfohlen)
2. Falls nötig, temporär die Ausführung erlauben:

   ```powershell
   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
   ```
3. Skript ausführen:

   ```powershell
   .\setup.ps1
   ```

---

## ✍️ Manuelles Erstellen der .env-Dateien

Falls du die Skripte nicht nutzen kannst oder willst, kannst du die `.env`-Dateien auch manuell erstellen:

### 📁 Backend (`.env` im **Root-Verzeichnis**)

Erstelle eine Datei mit dem Namen `.env` im Projekt-Stammverzeichnis und füge Folgendes ein:

```env
MAIL_USERNAME=deine.email@gmail.com
MAIL_PASSWORD=dein-16-stelliges-app-passwort
```

### 📁 Frontend (`checklist-frontend/.env`)

Erstelle die Datei `checklist-frontend/.env` und füge Folgendes ein:

```env
REACT_APP_MAIL_GETTER=ziel.email@domain.de
```

---

## 📧 Google SMTP einrichten (App-Passwort für Gmail)

Damit der Mailversand über deine Gmail-Adresse funktioniert, brauchst du ein **App-Passwort**. Google erlaubt **nicht** den SMTP-Versand über dein normales Passwort, sondern verlangt zusätzliche Sicherheit.

### 🔐 Voraussetzungen:

* Ein **Google-Konto mit 2-Faktor-Authentifizierung (2FA)** aktiviert.
* falls noch nicht aktiviert --> https://myaccount.google.com/security

### ✅ App-Passwort generieren:

1. Gehe zu: [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Melde dich an.
3. Wähle bei „App auswählen“ z. B. **Mail**
4. Wähle bei „Gerät auswählen“ z. B. **Anderes (benutzerdefiniert)** und gib z. B. `MyApp` ein.
5. Klicke auf **Generieren**
6. Kopiere das **16-stellige Passwort** und verwende es als `MAIL_PASSWORD` in deiner `.env`.

> ⚠️ Wichtig: Zeige das App-Passwort niemandem und speichere es sicher. Es ersetzt dein reguläres Gmail-Passwort nur für diese App.

---

## ✅ Beispiel für funktionierende Konfiguration

### .env (Backend)

```
MAIL_USERNAME=deine.email@gmail.com
MAIL_PASSWORD=abcd efgh ijkl mnop
```

### checklist-frontend/.env (Frontend)

```
REACT_APP_MAIL_GETTER=empfänger@domain.de
```

---

## ❓ Häufige Probleme

| Problem                          | Lösung                                                                         |
| -------------------------------- | ------------------------------------------------------------------------------ |
| `setup.sh` wird nicht ausgeführt | Stelle sicher, dass die Datei mit `chmod +x setup.sh` ausführbar gemacht wurde |
| PowerShell blockiert Skript      | Führe `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` aus         |
| E-Mails kommen nicht an          | Prüfe SMTP-Zugangsdaten und App-Passwort                                       |
| `.env` ist im Git gelandet       | Füge sie zu `.gitignore` hinzu! (siehe unten)                                  |

---

## 🛑 `.env`-Dateien nicht in Git einchecken

Stelle sicher, dass `.env`-Dateien nicht im Repository landen:

### `.gitignore`

```
.env
checklist-frontend/.env
```

---


## Start der Server:

### Frontend:
```
cd checklist-frontend
npm install
npm start
```
--> die App läuft unter: http://localhost:3000
### Backend:


```
# Stelle sicher, dass du im Projekt-Root bist
./mvnw spring-boot:run
```

falls Maven Installiert ist:

```
mvn spring-boot:run
```
- Das Backend liest automatisch die .env-Werte mit der Bibliothek java-dotenv.

Backend läuft auf: http://localhost:8080