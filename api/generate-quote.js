export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Méthode non autorisée' });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
        console.error("Erreur: Clé API manquante");
        return res.status(500).json({
            message: 'Configuration serveur invalide (Clé API manquante)'
        });
    }

    try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01',
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                model: "claude-3-5-sonnet-20241022",
                max_tokens: 300,
                messages: [
                    {
                        role: "user",
                        content: "Génère une citation inspirante aléatoire en français. Format JSON attendu: { \"text\": \"la citation\", \"author\": \"l'auteur\", \"category\": \"catégorie (ex: Motivation, Vie, Succès)\" }. Ne donne QUE le JSON, rien d'autre."
                    }
                ]
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Erreur API Claude:", errorData);
            throw new Error(`Erreur API Claude: ${response.status}`);
        }

        const data = await response.json();

        let content = data.content[0].text;

        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            content = jsonMatch[0];
        }

        let quoteData;
        try {
            quoteData = JSON.parse(content);
        } catch (e) {
            console.error("Erreur parsing JSON:", content);
            quoteData = {
                text: content,
                author: "Claude AI",
                category: "Inspiration"
            };
        }

        quoteData.timestamp = new Date().toISOString();

        res.status(200).json(quoteData);

    } catch (error) {
        console.error("Erreur serveur:", error);
        res.status(500).json({
            message: 'Erreur lors de la génération de la citation',
            error: error.message
        });
    }
}
