# 🔧 Guide de Configuration

## Configuration de la clé API Anthropic

### Étape 1 : Obtenir votre clé API

1. Allez sur https://console.anthropic.com/
2. Créez un compte (ou connectez-vous)
3. Cliquez sur **"API Keys"** dans le menu
4. Cliquez sur **"Create Key"**
5. Copiez la clé (format : `sk-ant-api03-...`)

### Étape 2 : Créer le fichier `.env.local`

Dans le dossier `serverless-quotes-app`, créez un fichier nommé `.env.local` avec ce contenu :

```env
ANTHROPIC_API_KEY=sk-ant-api03-votre-clé-ici
```

**Remplacez** `sk-ant-api03-votre-clé-ici` par votre vraie clé API.

### Étape 3 : Vérifier

Le fichier `.env.local` doit contenir une seule ligne :

```env
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxxx
```

⚠️ **IMPORTANT** : 
- Ce fichier est déjà dans `.gitignore` (il ne sera pas commité)
- Ne partagez JAMAIS votre clé API publiquement
- Pour Vercel, ajoutez la clé dans les variables d'environnement du dashboard

---

## Configuration pour Vercel (Production)

### Via le Dashboard Vercel

1. Allez sur https://vercel.com/dashboard
2. Sélectionnez votre projet
3. Allez dans **Settings** → **Environment Variables**
4. Ajoutez une nouvelle variable :
   - **Name** : `ANTHROPIC_API_KEY`
   - **Value** : `sk-ant-api03-votre-clé-ici`
   - **Environments** : Cochez `Production`, `Preview`, `Development`
5. Cliquez sur **Save**
6. Redéployez votre application

### Via Vercel CLI

```bash
vercel env add ANTHROPIC_API_KEY
# Collez votre clé API quand demandé
# Sélectionnez tous les environnements (Production, Preview, Development)
```

---

## Vérification

### Test local

```bash
npm run dev
```

Si vous voyez une erreur "ANTHROPIC_API_KEY manquante", vérifiez que `.env.local` existe et contient votre clé.

### Test en production

Après déploiement sur Vercel, visitez votre URL et cliquez sur "Nouvelle Citation".

Si ça fonctionne → ✅ Configuration réussie !  
Si erreur → Vérifiez les variables d'environnement dans Vercel Dashboard.

---

## 🆘 Dépannage

### Erreur : "ANTHROPIC_API_KEY manquante"

✅ Vérifiez que `.env.local` existe  
✅ Vérifiez que la clé commence par `sk-ant-api03-`  
✅ Redémarrez le serveur de développement

### Erreur : "Erreur HTTP: 401"

✅ Votre clé API est invalide ou expirée  
✅ Générez une nouvelle clé sur console.anthropic.com

### La fonction serverless ne fonctionne pas

✅ En local, utilisez `vercel dev` au lieu de `npm run dev`  
✅ En production, vérifiez les variables d'environnement Vercel
