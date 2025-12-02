# 🔄 Flux de Données - Architecture Serverless

## Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────────┐
│                    UTILISATEUR                                   │
│                  (Navigateur Web)                                │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ 1. Clique "Nouvelle Citation"
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                              │
│                  http://localhost:5173                           │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ App.jsx                                                   │  │
│  │                                                           │  │
│  │ const loadNewQuote = async () => {                       │  │
│  │   setLoading(true);                                      │  │
│  │                                                           │  │
│  │   const response = await fetch("/api/generate-quote", { │  │
│  │     method: "POST"                                       │  │
│  │   });                                                    │  │
│  │                                                           │  │
│  │   const quote = await response.json();                   │  │
│  │   setQuote(quote);                                       │  │
│  │ }                                                         │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ 2. POST /api/generate-quote
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│              VERCEL EDGE NETWORK (CDN)                           │
│                                                                  │
│  • Détecte la requête /api/generate-quote                       │
│  • Route vers la fonction serverless                            │
│  • Démarre une instance de la fonction                          │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ 3. Exécute la fonction
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│           BACKEND SERVERLESS (Vercel Function)                   │
│                  api/generate-quote.js                           │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ export default async function handler(req, res) {        │  │
│  │                                                           │  │
│  │   // 🔒 Récupère la clé API (sécurisée)                 │  │
│  │   const apiKey = process.env.ANTHROPIC_API_KEY;         │  │
│  │                                                           │  │
│  │   // 🤖 Appelle l'API Claude                            │  │
│  │   const response = await fetch(                          │  │
│  │     'https://api.anthropic.com/v1/messages',            │  │
│  │     {                                                    │  │
│  │       headers: { 'x-api-key': apiKey }                  │  │
│  │     }                                                    │  │
│  │   );                                                     │  │
│  │                                                           │  │
│  │   const data = await response.json();                    │  │
│  │   return res.json(data);                                 │  │
│  │ }                                                         │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ 4. POST https://api.anthropic.com/v1/messages
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                  ANTHROPIC CLAUDE AI                             │
│                  (API Externe)                                   │
│                                                                  │
│  • Reçoit la requête avec la clé API                            │
│  • Génère une citation inspirante                               │
│  • Retourne un JSON :                                           │
│    {                                                             │
│      "text": "La vie est belle...",                             │
│      "author": "Victor Hugo",                                   │
│      "category": "Vie"                                          │
│    }                                                             │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ 5. Retourne la citation
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│           BACKEND SERVERLESS (Vercel Function)                   │
│                                                                  │
│  • Reçoit la réponse de Claude                                  │
│  • Parse le JSON                                                │
│  • Ajoute des métadonnées (timestamp, source)                  │
│  • Retourne au frontend                                         │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ 6. Retourne JSON au frontend
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                              │
│                                                                  │
│  • Reçoit la citation                                           │
│  • Met à jour l'état (setQuote)                                 │
│  • Affiche la citation avec animation                           │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ 7. Affiche la citation
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    UTILISATEUR                                   │
│                                                                  │
│  Voit la citation :                                             │
│  "La vie est belle..."                                          │
│  — Victor Hugo                                                  │
│  [Vie]                                                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📊 Chronologie Détaillée

### Temps T+0ms : Utilisateur clique

```javascript
// Frontend - App.jsx
<button onClick={loadNewQuote}>
  🎲 Nouvelle Citation
</button>
```

### Temps T+10ms : Requête HTTP envoyée

```javascript
// Frontend - App.jsx
const response = await fetch("/api/generate-quote", {
  method: "POST",
  headers: { "Content-Type": "application/json" }
});
```

**Requête HTTP :**
```http
POST /api/generate-quote HTTP/1.1
Host: localhost:5173
Content-Type: application/json
```

### Temps T+50ms : Vercel détecte la requête

```
Vercel Edge Network
├── Détecte : POST /api/generate-quote
├── Cherche : api/generate-quote.js
├── Démarre : Nouvelle instance de la fonction
└── Injecte : Variables d'environnement (ANTHROPIC_API_KEY)
```

### Temps T+100ms : Fonction serverless s'exécute

```javascript
// Backend - api/generate-quote.js
export default async function handler(req, res) {
  const apiKey = process.env.ANTHROPIC_API_KEY; // 🔒 Sécurisé
  
  // Appel à Claude AI
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-20241022',
      messages: [{ role: 'user', content: 'Génère une citation...' }]
    })
  });
}
```

**Requête HTTP vers Claude :**
```http
POST https://api.anthropic.com/v1/messages HTTP/1.1
x-api-key: sk-ant-api03-xxxxxxxxxx
anthropic-version: 2023-06-01
Content-Type: application/json

{
  "model": "claude-3-5-sonnet-20241022",
  "messages": [...]
}
```

### Temps T+2000ms : Claude génère la citation

```json
{
  "content": [
    {
      "text": "{\"text\":\"La vie est belle\",\"author\":\"Victor Hugo\",\"category\":\"Vie\"}"
    }
  ]
}
```

### Temps T+2100ms : Fonction parse et retourne

```javascript
// Backend - api/generate-quote.js
const data = await response.json();
const content = data.content[0].text;
const quote = JSON.parse(content);

const enrichedQuote = {
  ...quote,
  timestamp: new Date().toISOString(),
  source: 'Claude AI - Serverless Function'
};

return res.status(200).json(enrichedQuote);
```

**Réponse HTTP :**
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "text": "La vie est belle",
  "author": "Victor Hugo",
  "category": "Vie",
  "timestamp": "2025-12-02T01:17:00.000Z",
  "source": "Claude AI - Serverless Function"
}
```

### Temps T+2150ms : Frontend reçoit et affiche

```javascript
// Frontend - App.jsx
const data = await response.json();
setQuote(data); // Met à jour l'état React
setLoading(false);
```

**Rendu React :**
```jsx
<div className="quote-text">
  "La vie est belle"
</div>
<div className="quote-author">
  — Victor Hugo
</div>
<div className="category-badge">
  Vie
</div>
```

### Temps T+2200ms : Utilisateur voit la citation

```
┌────────────────────────────────────┐
│  "La vie est belle"                │
│  — Victor Hugo                     │
│  [Vie]                             │
│                                    │
│  [🎲 Nouvelle Citation] [📤 Partager] │
└────────────────────────────────────┘
```

---

## 🔐 Sécurité : Où est la clé API ?

### ❌ Mauvaise approche (Frontend)

```javascript
// ⚠️ DANGEREUX : Clé visible dans le navigateur
const apiKey = "sk-ant-api03-ma-cle-secrete";

const response = await fetch('https://api.anthropic.com/v1/messages', {
  headers: { 'x-api-key': apiKey } // 🚨 Exposé !
});
```

**Problème :** N'importe qui peut ouvrir DevTools → Network et voir la clé.

### ✅ Bonne approche (Serverless)

```javascript
// Frontend (client)
const response = await fetch("/api/generate-quote");
// ✅ Pas de clé API

// Backend (serveur)
const apiKey = process.env.ANTHROPIC_API_KEY; // 🔒 Sécurisé
```

**Avantage :** La clé reste côté serveur, jamais exposée.

---

## 💰 Coût par requête

```
1 requête = 1 exécution de fonction serverless + 1 appel API Claude

Vercel Functions (gratuit) :
├── 100,000 exécutions/mois gratuites
└── Au-delà : 0.0002€ par exécution

Anthropic Claude API :
├── Input : ~0.003€ pour 1000 tokens
└── Output : ~0.015€ pour 1000 tokens

Total par citation : ~0.0005€ (0.05 centimes)
```

**Exemple :** 1000 citations/mois = ~0.50€

---

## 🚀 Scalabilité

### Scénario : 10,000 utilisateurs simultanés

```
Vercel Auto-Scaling
├── Détecte : 10,000 requêtes/seconde
├── Démarre : 10,000 instances de la fonction
├── Traite : Toutes les requêtes en parallèle
└── Arrête : Les instances après exécution

Coût : 10,000 × 0.0002€ = 2€
Temps : ~2-3 secondes par requête
```

**Avec un serveur traditionnel :**
- Besoin de plusieurs serveurs
- Configuration manuelle
- Coût : ~100€/mois minimum

---

## 🎯 Conclusion

Cette architecture serverless offre :

✅ **Sécurité** : Clé API jamais exposée  
✅ **Performance** : Edge Network global  
✅ **Scalabilité** : Auto-scaling automatique  
✅ **Coût** : Paiement à l'usage  
✅ **Simplicité** : Pas de serveur à gérer  

**C'est ça, le serverless computing !** 🚀
