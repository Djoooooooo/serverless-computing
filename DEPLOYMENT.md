# 🚀 Guide de Déploiement Rapide

## Étape 1 : Installation des dépendances

```bash
npm install
```

## Étape 2 : Configuration de la clé API

1. Créez le fichier `.env.local` :
```bash
cp .env.example .env.local
```

2. Ajoutez votre clé API Anthropic dans `.env.local` :
```env
ANTHROPIC_API_KEY=sk-ant-api03-votre-clé-ici
```

**Obtenir une clé API :**
- Allez sur https://console.anthropic.com/
- Créez un compte
- Générez une clé API dans "API Keys"

## Étape 3 : Test en local (optionnel)

```bash
npm run dev
```

Visitez http://localhost:5173

⚠️ **Note** : En mode dev, la fonction serverless ne fonctionnera pas. Pour tester la vraie fonction, utilisez `vercel dev` ou déployez directement.

## Étape 4 : Déploiement sur Vercel

### Option A : Via CLI (Rapide)

```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Ajouter la variable d'environnement
vercel env add ANTHROPIC_API_KEY

# Redéployer en production
vercel --prod
```

### Option B : Via GitHub (Automatique)

1. **Créez un dépôt GitHub** :
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/votre-username/serverless-quotes-app.git
git push -u origin main
```

2. **Importez sur Vercel** :
   - Allez sur https://vercel.com/new
   - Connectez votre compte GitHub
   - Sélectionnez le dépôt `serverless-quotes-app`
   - Cliquez sur "Import"

3. **Configurez les variables d'environnement** :
   - Dans Vercel Dashboard → Settings → Environment Variables
   - Ajoutez : `ANTHROPIC_API_KEY` = `votre-clé-api`
   - Cliquez sur "Save"

4. **Déployez** :
   - Cliquez sur "Deploy"
   - Attendez 1-2 minutes
   - Votre app est en ligne ! 🎉

## Étape 5 : Vérification

Visitez votre URL Vercel (ex: `https://serverless-quotes-app.vercel.app`)

Cliquez sur **"Nouvelle Citation"** → Une citation devrait être générée par Claude AI !

---

## ✅ Checklist de déploiement

- [ ] Dépendances installées (`npm install`)
- [ ] Clé API Anthropic obtenue
- [ ] `.env.local` créé et configuré
- [ ] Test local réussi (optionnel)
- [ ] Compte Vercel créé
- [ ] Variable d'environnement `ANTHROPIC_API_KEY` ajoutée sur Vercel
- [ ] Application déployée
- [ ] Test de génération de citation réussi

---

## 🎯 Résultat attendu

Après déploiement, vous aurez :

✅ Une application web accessible publiquement  
✅ Des citations générées en temps réel par Claude AI  
✅ Une architecture serverless scalable  
✅ Déploiement automatique à chaque push (si GitHub)  

---

## 🆘 Besoin d'aide ?

Consultez le [README.md](./README.md) complet pour plus de détails et le dépannage.
