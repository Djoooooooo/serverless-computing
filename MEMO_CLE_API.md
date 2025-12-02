# 🔑 Guide Configuration Clé API Vercel

## 1. Obtenir la clé
- Site : https://console.anthropic.com/
- Menu : **API Keys** -> **Create Key**
- Copier la clé (`sk-ant...`)

## 2. Ajouter dans Vercel

### Si vous êtes à l'étape "Import" :
1. Dépliez la section **Environment Variables**.
2. Key : `ANTHROPIC_API_KEY`
3. Value : `votre-clé-copiée`
4. Cliquez sur **Add**.
5. Cliquez sur **Deploy**.

### Si le projet est déjà créé :
1. Allez dans **Settings** -> **Environment Variables**.
2. Ajoutez la clé `ANTHROPIC_API_KEY`.
3. Allez dans **Deployments**.
4. Cliquez sur **...** -> **Redeploy** pour appliquer le changement.
