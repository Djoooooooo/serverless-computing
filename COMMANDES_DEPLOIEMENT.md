# 🚀 COMMANDES À EXÉCUTER - Déploiement GitHub + Vercel

## ✅ ÉTAPES DÉJÀ COMPLÉTÉES

- ✅ Git initialisé
- ✅ Fichiers ajoutés
- ✅ Commit créé (22 fichiers)
- ✅ Branche renommée en "main"

---

## 📋 PROCHAINES ÉTAPES

### Étape 5 : Créer un dépôt GitHub

1. Allez sur https://github.com/new
2. Nom du dépôt : `serverless-quotes-app`
3. Description : `Application serverless de citations avec Claude AI`
4. Visibilité : Public ou Private
5. ⚠️ **NE COCHEZ PAS** "Add a README file"
6. Cliquez sur "Create repository"

---

### Étape 6 : Pousser le code sur GitHub

**⚠️ REMPLACEZ `VOTRE-USERNAME` par votre nom d'utilisateur GitHub !**

```bash
cd j:/Claude/serverless-quotes-app
git remote add origin https://github.com/VOTRE-USERNAME/serverless-quotes-app.git
git push -u origin main
```

**Exemple :**
```bash
git remote add origin https://github.com/john-doe/serverless-quotes-app.git
git push -u origin main
```

**GitHub va vous demander de vous authentifier.**

---

### Étape 7 : Déployer sur Vercel depuis GitHub

1. Allez sur https://vercel.com/new
2. Cliquez sur **"Continue with GitHub"**
3. Autorisez Vercel à accéder à GitHub
4. Sélectionnez le dépôt `serverless-quotes-app`
5. Cliquez sur **"Import"**

**Vercel va détecter Vite automatiquement !**

---

### Étape 8 : Ajouter la clé API Anthropic

**⚠️ IMPORTANT : Obtenez d'abord votre clé API**

1. Allez sur https://console.anthropic.com/
2. Créez un compte
3. Cliquez sur **"API Keys"**
4. Créez une nouvelle clé
5. **Copiez-la** (format : `sk-ant-api03-...`)

**Dans l'interface Vercel (avant de déployer) :**

1. Cliquez sur **"Environment Variables"**
2. Ajoutez :
   - **Name** : `ANTHROPIC_API_KEY`
   - **Value** : `sk-ant-api03-votre-clé-ici`
   - **Environments** : Cochez **Production**, **Preview**, **Development**
3. Cliquez sur **"Add"**

---

### Étape 9 : Déployer !

1. Cliquez sur **"Deploy"**
2. Attendez 1-2 minutes
3. Vercel vous donne l'URL ! 🎉

---

## ✅ Vérification

1. Ouvrez l'URL donnée par Vercel
2. Cliquez sur **"Nouvelle Citation"**
3. Une citation devrait être générée ! 🎉

---

## 🔄 Mises à jour futures (Automatiques !)

Chaque fois que vous modifiez votre code :

```bash
git add .
git commit -m "Description des changements"
git push
```

**Vercel redéploie automatiquement ! 🚀**

---

## 🆘 Problèmes courants

### Erreur : "Authentication failed"

**Solution :**
1. Utilisez un Personal Access Token GitHub
2. Allez sur https://github.com/settings/tokens
3. Générez un token avec "repo" permissions
4. Utilisez le token comme mot de passe

### Erreur : "remote origin already exists"

**Solution :**
```bash
git remote remove origin
git remote add origin https://github.com/VOTRE-USERNAME/serverless-quotes-app.git
```

### Erreur : "ANTHROPIC_API_KEY manquante" sur Vercel

**Solution :**
1. Allez dans Vercel Dashboard → Settings → Environment Variables
2. Ajoutez `ANTHROPIC_API_KEY`
3. Redéployez

---

## 📊 Résumé

**Vous avez déjà fait :**
- ✅ Git init
- ✅ Git add
- ✅ Git commit
- ✅ Git branch -M main

**Il vous reste à faire :**
1. Créer le dépôt GitHub
2. Pousser le code (`git push`)
3. Connecter Vercel à GitHub
4. Ajouter la clé API
5. Déployer !

**Temps estimé : 10 minutes**

---

**Bonne chance ! 🚀**
