/**
 * Fonction Serverless - Génération de Citations avec Claude AI
 * 
 * Cette fonction s'exécute sur Vercel Edge Functions (serverless)
 * Elle appelle l'API Anthropic Claude pour générer des citations inspirantes
 * 
 * Endpoint: POST /api/generate-quote
 */

export default async function handler(req, res) {
    // Configuration CORS pour permettre les appels depuis le frontend
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Gérer les requêtes OPTIONS (preflight)
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Accepter uniquement les requêtes POST
    if (req.method !== 'POST') {
        return res.status(405).json({
            error: 'Méthode non autorisée',
            message: 'Utilisez POST pour générer une citation'
        });
    }

    try {
        // Récupérer la clé API depuis les variables d'environnement
        const apiKey = process.env.ANTHROPIC_API_KEY;

        if (!apiKey) {
            console.error('❌ ANTHROPIC_API_KEY manquante');
            return res.status(500).json({
                error: 'Configuration serveur invalide',
                message: 'La clé API Anthropic n\'est pas configurée'
            });
        }

        // Appel à l'API Claude d'Anthropic
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-5-sonnet-20241022',
                max_tokens: 1024,
                messages: [{
                    role: 'user',
                    content: `Génère une citation inspirante unique et originale en français. 
          
Réponds UNIQUEMENT avec un objet JSON dans ce format exact (sans markdown, sans backticks) :
{
  "text": "La citation inspirante ici",
  "author": "Nom de l'auteur (peut être fictif si inspiré)",
  "category": "Catégorie (Motivation/Sagesse/Succès/Vie/Inspiration)"
}

La citation doit être :
- Profonde et inspirante
- En français parfait
- Originale et unique
- Entre 10 et 25 mots`
                }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('❌ Erreur API Anthropic:', errorData);
            return res.status(response.status).json({
                error: 'Erreur API Anthropic',
                message: errorData.error?.message || 'Erreur lors de la génération'
            });
        }

        const data = await response.json();

        // Extraire le contenu de la réponse
        const content = data.content[0].text;

        // Parser le JSON de la citation
        let quote;
        try {
            // Nettoyer le contenu (enlever les backticks markdown si présents)
            const cleanContent = content.replace(/```json\n?|\n?```/g, '').trim();
            quote = JSON.parse(cleanContent);
        } catch (parseError) {
            console.error('❌ Erreur parsing JSON:', parseError);
            console.error('Contenu reçu:', content);

            // Fallback : créer une citation à partir du texte brut
            quote = {
                text: content.substring(0, 200),
                author: "Claude AI",
                category: "Inspiration"
            };
        }

        // Validation des données
        if (!quote.text || !quote.author || !quote.category) {
            return res.status(500).json({
                error: 'Format de citation invalide',
                message: 'La citation générée ne contient pas tous les champs requis'
            });
        }

        // Ajouter des métadonnées
        const enrichedQuote = {
            ...quote,
            timestamp: new Date().toISOString(),
            source: 'Claude AI - Serverless Function'
        };

        console.log('✅ Citation générée avec succès:', enrichedQuote);

        // Retourner la citation
        return res.status(200).json(enrichedQuote);

    } catch (error) {
        console.error('❌ Erreur serveur:', error);
        return res.status(500).json({
            error: 'Erreur serveur',
            message: error.message || 'Une erreur inattendue s\'est produite'
        });
    }
}
