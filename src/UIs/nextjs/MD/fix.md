````markdown
# SMIDJAN — FIX DEV LAUNCH URL ON WINDOWS (Next.js, PowerShell)
**Symptôme observé :** boîte de dialogue Windows “Windows ne trouve pas `http://localhost:3000tical.CleanArchitecture`”.  
**Diagnostic :** une commande d’ouverture du navigateur concatène **l’URL** et **le nom du dossier** (`Practical.CleanArchitecture`) faute d’URL correctement citée / titrée avec `start` (Windows) ou d’une variable `BASE_URL` mal formée.

Objectif : corriger toutes les sources possibles (scripts NPM, tâches VS Code, PowerShell, variables d’env).

---

## 0) Règles rapides
- Une URL correcte doit être **exactement** `http://localhost:3000/` (avec un `/` final optionnel), **jamais** `http://localhost:3000Practical.CleanArchitecture`.
- Sous Windows, `start` **doit** recevoir un **titre vide** en premier argument, sinon l’URL peut être interprétée comme titre et le reste de la ligne peut être concaténé.

**Syntaxe sûre :**
```powershell
start "" "http://localhost:3000/"
````

---

## 1) Corriger les scripts NPM (`package.json`)

Ouvrir `package.json` et **supprimer** toute ouverture automatique du navigateur dans `dev`, ou la corriger avec la syntaxe sûre.

### 1.1. Option A — ne pas ouvrir le navigateur automatiquement (recommandé)

```json
{
  "scripts": {
    "dev": "next dev -p 3000"
  }
}
```

### 1.2. Option B — ouvrir le navigateur côté Windows via `start` (si vraiment souhaité)

```json
{
  "scripts": {
    "dev": "next dev -p 3000",
    "open": "powershell -NoProfile -Command \"start '' 'http://localhost:3000/'\"",
    "dev:open": "npm-run-all -p dev open"
  }
}
```

> Note : `npm-run-all` est optionnel. Si non installé, lance simplement `npm run dev` puis dans un autre terminal `npm run open`.

### 1.3. Mauvais exemples (à éviter)

```json
"open": "start http://localhost:3000"                      // Mauvais: pas de titre vide
"open": "start http://localhost:3000 %CD%"                 // Mauvais: concatène le chemin courant
"open": "start http://localhost:3000Practical.CleanArchitecture" // Mauvais
```

---

## 2) Vérifier les variables d’environnement `.env*`

Ouvrir `.env.local` (ou `.env`) et **corriger** les valeurs d’URL.

**À faire**

```dotenv
NEXT_PUBLIC_BASE_URL=http://localhost:3000
SITE_URL=http://localhost:3000
```

**À proscrire**

```dotenv
NEXT_PUBLIC_BASE_URL=http://localhost:3000Practical.CleanArchitecture
NEXT_PUBLIC_BASE_URL=http://localhost:3000Practical  # toute concaténation
```

> Après modification des `.env*`, **redémarrer** le serveur (`Ctrl+C` puis `npm run dev`).

---

## 3) Vérifier les tâches VS Code (`.vscode/tasks.json` / `launch.json`)

Si vous avez une tâche qui ouvre le navigateur, appliquez la syntaxe correcte.

**tasks.json – correct**

```json
{
  "label": "open-browser",
  "type": "shell",
  "command": "powershell -NoProfile -Command \"start '' 'http://localhost:3000/'\"",
  "problemMatcher": []
}
```

**launch.json – correct (Chrome)**

```json
{
  "name": "Launch Chrome to http://localhost:3000",
  "type": "chrome",
  "request": "launch",
  "url": "http://localhost:3000/"
}
```

---

## 4) Vérifier les scripts PowerShell (profil, scripts custom)

Regarder votre profil PowerShell (`$PROFILE`) ou tout script `.ps1` d’ouverture auto.

**Correct**

```powershell
start "" "http://localhost:3000/"
```

**Incorrect (provoque votre erreur)**

```powershell
start http://localhost:3000 $PWD       # Concatène le chemin courant (ex: ...Practical.CleanArchitecture)
start http://localhost:3000$env:ProjectName
```

---

## 5) Vérifier les hooks Git / outils externes

* Hooks `postinstall` / `poststart` : supprimer toute ouverture “start http://…” sans titre.
* Outils cross-platform (`open-cli`, `xdg-open`) : sous Windows, préférez `start "" "URL"`.

---

## 6) Tests d’acceptation (PowerShell)

1. **Ping serveur Next.js**

```powershell
npm run dev
```

Attendre “ready - started server on … localhost:3000”.

2. **Test HTTP brut**

```powershell
Invoke-WebRequest -Uri "http://localhost:3000/" -UseBasicParsing | Select-Object -ExpandProperty StatusCode
# attendu: 200
```

3. **Ouverture navigateur (manuel, sûr)**

```powershell
start "" "http://localhost:3000/"
```

4. **Aucun message Windows du type :**
   `Windows ne trouve pas 'http://localhost:3000tical.CleanArchitecture'`.

---

## 7) Plan de commits

1. `fix(dev): remove/repair auto-browser open to avoid URL concatenation on Windows`
2. `chore(env): normalize NEXT_PUBLIC_BASE_URL and SITE_URL to http://localhost:3000`
3. `chore(vscode): safe start syntax with empty title for Windows`
4. `docs: add note about Windows start syntax (start '' 'URL')`

---

## 8) Résumé exécutable

* Éviter l’ouverture auto du navigateur **ou** utiliser `start "" "URL"`.
* **Jamais** concaténer une URL avec un chemin/dossier.
* Nettoyer `package.json`, `.env*`, tâches VS Code, scripts PowerShell.
* Redémarrer le serveur et valider via `Invoke-WebRequest`.

---

```
```
