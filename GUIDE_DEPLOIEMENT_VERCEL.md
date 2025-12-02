# 🚀 Guide de Déploiement sur Vercel - Pas à Pas

## ✅ Prérequis

Avant de commencer, vous devez avoir :

1. ✅ **Vercel CLI installé** (déjà fait !)
2. ⚠️ **Clé API Anthropic** (à obtenir si pas encore fait)
3. ⚠️ **Compte Vercel** (gratuit - à créer)

---

## 📋 ÉTAPES DE DÉPLOIEMENT

### Étape 1 : Obtenir votre clé API Anthropic

**Si vous ne l'avez pas encore :**

1. Allez sur https://console.anthropic.com/
2. Créez un compte (gratuit)
3. Cliquez sur **"API Keys"** dans le menu
4. Cliquez sur **"Create Key"**
5. **Copiez la clé** (format : `sk-ant-api03-...`)

⚠️ **IMPORTANT** : Gardez cette clé, vous en aurez besoin à l'étape 4 !

---

### Étape 2 : Se connecter à Vercel

**Commande à exécuter :**

```bash
vercel login
```

**Ce qui va se passer :**
1. Vercel va ouvrir votre navigateur
2. Vous devrez créer un compte Vercel (gratuit) ou vous connecter
3. Autorisez l'accès
4. Revenez au terminal

**Exécutez cette commande maintenant :**

```bash
cd j:/Claude/serverless-quotes-app
vercel login
```

---

### Étape 3 : Déployer l'application

**Commande à exécuter :**

```bash
vercel
```

**Ce qui va se passer :**

Vercel va vous poser plusieurs questions. Voici comment répondre :

```
? Set up and deploy "j:/Claude/serverless-quotes-app"? 
→ Répondez : Y (Yes)

? Which scope do you want to deploy to?
→ Sélectionnez votre compte (utilisez les flèches ↑↓ et Entrée)

? Link to existing project?
→ Répondez : N (No)

? What's your project's name?
→ Appuyez sur Entrée (accepter "serverless-quotes-app")

? In which directory is your code located?
→ Appuyez sur Entrée (accepter "./")

? Want to override the settings?
→ Répondez : N (No)
```

**Vercel va alors :**
1. Analyser votre projet
2. Détecter Vite
3. Builder l'application
4. Déployer sur le cloud
5. Vous donner une URL (ex: `https://serverless-quotes-app-xxx.vercel.app`)

⏱️ **Temps estimé** : 1-2 minutes

---

### Étape 4 : Ajouter la clé API Anthropic

**⚠️ IMPORTANT** : Sans cette étape, l'application ne fonctionnera pas !

**Commande à exécuter :**

```bash
vercel env add ANTHROPIC_API_KEY
```

**Ce qui va se passer :**

```
? What's the value of ANTHROPIC_API_KEY?
→ Collez votre clé API Anthropic (sk-ant-api03-...)

? Add ANTHROPIC_API_KEY to which Environments?
→ Sélectionnez TOUS les environnements :
  ✓ Production
  ✓ Preview
  ✓ Development
  (Utilisez Espace pour sélectionner, Entrée pour valider)
```

---

### Étape 5 : Redéployer en production

**Commande à exécuter :**

```bash
vercel --prod
```

**Ce qui va se passer :**
1. Vercel redéploie avec la clé API
2. Vous obtenez l'URL de production finale
3. L'application est maintenant LIVE ! 🎉

---

## ✅ Vérification

### Testez votre application

1. Ouvrez l'URL donnée par Vercel (ex: `https://serverless-quotes-app-xxx.vercel.app`)
2. Cliquez sur **"Nouvelle Citation"**
3. Une citation devrait être générée par Claude AI ! 🎉

**Si ça fonctionne → Félicitations ! Votre app serverless est en ligne ! 🚀**

---

## 🔄 Mises à jour futures

Chaque fois que vous modifiez votre code :

```bash
# Déployer les changements
vercel --prod
```

C'est tout ! Vercel redéploie automatiquement.

---

## 🆘 Dépannage

### Erreur : "ANTHROPIC_API_KEY manquante"

**Solution :**
```bash
vercel env add ANTHROPIC_API_KEY
vercel --prod
```

### Erreur : "Erreur HTTP: 401"

**Cause** : Clé API invalide

**Solution :**
1. Vérifiez votre clé sur https://console.anthropic.com/
2. Supprimez l'ancienne variable :
   ```bash
   vercel env rm ANTHROPIC_API_KEY
   ```
3. Ajoutez la nouvelle :
   ```bash
   vercel env add ANTHROPIC_API_KEY
   vercel --prod
   ```

### L'application ne se met pas à jour

**Solution :**
```bash
vercel --prod --force
```

---

## 📊 Résumé des Commandes

```bash
# 1. Se connecter à Vercel
vercel login

# 2. Déployer l'application
vercel

# 3. Ajouter la clé API
vercel env add ANTHROPIC_API_KEY

# 4. Déployer en production
vercel --prod

# 5. (Optionnel) Voir les logs
vercel logs

# 6. (Optionnel) Ouvrir le dashboard
vercel
```

---

## 🎯 Checklist de Déploiement

- [ ] Vercel CLI installé (`npm install -g vercel`)
- [ ] Clé API Anthropic obtenue
- [ ] Connecté à Vercel (`vercel login`)
- [ ] Application déployée (`vercel`)
- [ ] Clé API ajoutée (`vercel env add ANTHROPIC_API_KEY`)
- [ ] Déployé en production (`vercel --prod`)
- [ ] Application testée (clic sur "Nouvelle Citation")
- [ ] ✅ Application en ligne !

---

## 🌟 Prochaines Étapes

Maintenant que votre application est en ligne :

1. **Partagez l'URL** avec vos amis ! 🎉
2. **Personnalisez le design** dans `src/App.jsx`
3. **Ajoutez des fonctionnalités** (favoris, historique, etc.)
4. **Configurez un domaine personnalisé** (dans Vercel Dashboard)

---

## 📚 Ressources

- [Dashboard Vercel](https://vercel.com/dashboard)
- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Anthropic](https://docs.anthropic.com/)

---

**Bonne chance avec votre déploiement ! 🚀**
