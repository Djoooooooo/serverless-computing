# 🚀 Application Serverless de Citations Inspirantes

Une application web moderne utilisant **React** et **Vercel Serverless Functions** pour générer des citations inspirantes via l'API **Claude AI** d'Anthropic.

## 📋 Table des matières

- [Architecture](#architecture)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Développement Local](#développement-local)
- [Déploiement](#déploiement)
- [Structure du Projet](#structure-du-projet)
- [Comment ça marche](#comment-ça-marche)
- [Avantages du Serverless](#avantages-du-serverless)

---

## 🏗️ Architecture

```
┌─────────────┐      ┌──────────────────┐      ┌─────────────┐
│   Frontend  │ ───▶ │ Vercel Function  │ ───▶ │  Claude AI  │
│   (React)   │      │ /api/generate-   │      │     API     │
│             │ ◀─── │     quote        │ ◀─── │             │
└─────────────┘      └──────────────────┘      └─────────────┘
```

**Stack Technique :**
- ⚛️ **Frontend** : React 18 + Vite
- ☁️ **Backend** : Vercel Serverless Functions
- 🤖 **IA** : Anthropic Claude 3.5 Sonnet
- 🚀 **Déploiement** : Vercel (Edge Network)

---

## ✅ Prérequis

- **Node.js** 18+ ([Télécharger](https://nodejs.org/))
- **npm** ou **yarn**
- **Compte Vercel** (gratuit) : [vercel.com](https://vercel.com)
- **Clé API Anthropic** : [console.anthropic.com](https://console.anthropic.com/)

---

## 📦 Installation

### 1. Installer les dépendances

```bash
cd serverless-quotes-app
npm install
```

---

## ⚙️ Configuration

### 1. Créer le fichier `.env.local`

Copiez le fichier d'exemple :

```bash
cp .env.example .env.local
```

### 2. Ajouter votre clé API Anthropic

Éditez `.env.local` :

```env
ANTHROPIC_API_KEY=sk-ant-api03-votre-clé-ici
```

**Comment obtenir votre clé API :**

1. Allez sur [console.anthropic.com](https://console.anthropic.com/)
2. Créez un compte (si nécessaire)
3. Allez dans **API Keys**
4. Cliquez sur **Create Key**
5. Copiez la clé et collez-la dans `.env.local`

⚠️ **IMPORTANT** : Ne commitez JAMAIS votre `.env.local` dans Git !

---

## 💻 Développement Local

### Démarrer le serveur de développement

```bash
npm run dev
```

L'application sera accessible sur : **http://localhost:5173**

### Tester la fonction serverless localement

Pour tester la fonction serverless en local, vous avez deux options :

#### Option 1 : Utiliser Vercel CLI (Recommandé)

```bash
# Installer Vercel CLI globalement
npm install -g vercel

# Lancer le serveur de développement Vercel
vercel dev
```

Cela démarre un serveur local qui simule l'environnement Vercel avec les fonctions serverless.

#### Option 2 : Mode développement Vite (simplifié)

Le mode `npm run dev` fonctionne, mais la fonction serverless ne sera pas accessible localement. Vous devrez déployer sur Vercel pour tester la génération réelle de citations.

---

## 🚀 Déploiement sur Vercel

### Méthode 1 : Déploiement via CLI (Rapide)

```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter à Vercel
vercel login

# Déployer
vercel

# Déployer en production
vercel --prod
```

### Méthode 2 : Déploiement via GitHub (Automatique)

1. **Créez un dépôt GitHub** et poussez votre code :

```bash
git init
git add .
git commit -m "Initial commit - Serverless Quotes App"
git branch -M main
git remote add origin https://github.com/votre-username/serverless-quotes-app.git
git push -u origin main
```

2. **Connectez Vercel à GitHub** :
   - Allez sur [vercel.com/new](https://vercel.com/new)
   - Importez votre dépôt GitHub
   - Vercel détectera automatiquement Vite

3. **Configurez les variables d'environnement** :
   - Dans le dashboard Vercel, allez dans **Settings** → **Environment Variables**
   - Ajoutez : `ANTHROPIC_API_KEY` = `votre-clé-api`

4. **Déployez** :
   - Cliquez sur **Deploy**
   - Chaque push sur `main` déclenchera un nouveau déploiement automatique ! 🎉

---

## 📁 Structure du Projet

```
serverless-quotes-app/
├── api/
│   └── generate-quote.js       # 🔥 Fonction Serverless (Backend)
├── src/
│   ├── App.jsx                 # Composant principal React
│   ├── main.jsx                # Point d'entrée React
│   └── index.css               # Styles globaux
├── public/                     # Assets statiques
├── index.html                  # HTML de base
├── vite.config.js              # Configuration Vite
├── vercel.json                 # Configuration Vercel
├── .env.example                # Exemple de variables d'environnement
├── .env.local                  # Variables d'environnement (local, non commité)
├── package.json                # Dépendances npm
└── README.md                   # Documentation
```

---

## 🔍 Comment ça marche ?

### 1️⃣ Frontend (React)

Le composant `App.jsx` :
- Affiche l'interface utilisateur
- Appelle `/api/generate-quote` via `fetch()`
- Gère les états (loading, error, success)

```javascript
const response = await fetch("/api/generate-quote", {
  method: "POST",
  headers: { "Content-Type": "application/json" }
});
```

### 2️⃣ Backend (Fonction Serverless)

Le fichier `api/generate-quote.js` :
- S'exécute sur Vercel Edge Functions
- Appelle l'API Claude d'Anthropic
- Retourne une citation au format JSON

```javascript
export default async function handler(req, res) {
  const apiKey = process.env.ANTHROPIC_API_KEY; // 🔒 Sécurisé !
  
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    headers: { 'x-api-key': apiKey }
  });
  
  return res.json(quote);
}
```

### 3️⃣ Flux complet

1. L'utilisateur clique sur **"Nouvelle Citation"**
2. Le frontend envoie une requête POST à `/api/generate-quote`
3. La fonction serverless Vercel s'exécute
4. Elle appelle l'API Claude avec la clé API (sécurisée)
5. Claude génère une citation inspirante
6. La fonction retourne la citation au frontend
7. React affiche la citation avec une belle animation

---

## ✨ Avantages du Serverless

| Avantage | Description |
|----------|-------------|
| 🔒 **Sécurité** | La clé API reste côté serveur, jamais exposée au client |
| ⚡ **Performance** | Déploiement sur Edge Network (CDN mondial) |
| 💰 **Coût** | Paiement à l'usage, pas de serveur 24/7 |
| 📈 **Scalabilité** | Auto-scaling automatique selon le trafic |
| 🛡️ **CORS** | Pas de problèmes CORS (même domaine) |
| 🚀 **Déploiement** | Déploiement instantané avec `vercel deploy` |

---

## 🧪 Tests

### Tester localement

```bash
npm run dev
```

Ouvrez http://localhost:5173 et cliquez sur **"Nouvelle Citation"**.

### Tester en production

Après déploiement sur Vercel, visitez votre URL :

```
https://votre-app.vercel.app
```

---

## 🐛 Dépannage

### Erreur : "ANTHROPIC_API_KEY manquante"

✅ **Solution** : Vérifiez que `.env.local` contient votre clé API.

### Erreur : "Erreur HTTP: 401"

✅ **Solution** : Votre clé API est invalide. Vérifiez-la sur [console.anthropic.com](https://console.anthropic.com/).

### La fonction serverless ne fonctionne pas en local

✅ **Solution** : Utilisez `vercel dev` au lieu de `npm run dev` pour tester les fonctions serverless localement.

### Erreur CORS en production

✅ **Solution** : Vérifiez que `vercel.json` contient les bonnes règles de routing.

---

## 📚 Ressources

- [Documentation Vercel Functions](https://vercel.com/docs/functions)
- [Documentation Anthropic Claude](https://docs.anthropic.com/)
- [Documentation React](https://react.dev/)
- [Documentation Vite](https://vitejs.dev/)

---

## 📝 Licence

MIT - Libre d'utilisation et de modification

---

## 🎉 Félicitations !

Vous avez maintenant une **vraie application serverless** fonctionnelle ! 🚀

**Prochaines étapes suggérées :**
- 🎨 Personnaliser le design
- 💾 Ajouter une base de données (Vercel KV, MongoDB)
- 🔐 Ajouter l'authentification
- 📊 Ajouter des analytics
- 🌍 Internationalisation (i18n)

---

**Créé avec ❤️ par Claude AI**
