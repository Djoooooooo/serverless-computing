import React, { useState, useEffect } from 'react';

const App = () => {
    const [quote, setQuote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [connectionStatus, setConnectionStatus] = useState('initializing');

    // 🛡️ MODE SECOURS : Citations locales si le serveur ne répond pas
    const getFallbackQuote = () => {
        const fallbackQuotes = [
            { text: "La seule façon de faire du bon travail est d'aimer ce que vous faites.", author: "Steve Jobs", category: "Travail" },
            { text: "Le succès, c'est d'aller d'échec en échec sans perdre son enthousiasme.", author: "Winston Churchill", category: "Succès" },
            { text: "La vie, c'est comme une bicyclette, il faut avancer pour ne pas perdre l'équilibre.", author: "Albert Einstein", category: "Vie" },
            { text: "Ils ne savaient pas que c'était impossible, alors ils l'ont fait.", author: "Mark Twain", category: "Audace" },
            { text: "La meilleure façon de prédire l'avenir est de le créer.", author: "Peter Drucker", category: "Avenir" }
        ];
        return fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    };

    // 🚀 FONCTION SERVERLESS RÉELLE - Appel à notre backend
    const fetchQuoteFromServerless = async () => {
        try {
            // En développement local : http://localhost:5173/api/generate-quote
            // En production Vercel : https://votre-app.vercel.app/api/generate-quote
            const response = await fetch("/api/generate-quote", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            // Vérification du type de contenu
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                console.warn("⚠️ API non détectée, passage en mode secours.");
                setConnectionStatus('demo');
                return getFallbackQuote();
            }

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            const data = await response.json();
            setConnectionStatus('connected');
            return data;
        } catch (err) {
            console.warn("⚠️ Erreur connexion, passage en mode secours:", err);
            setConnectionStatus('demo');
            return getFallbackQuote();
        }
    };

    // Charger une nouvelle citation
    const loadNewQuote = async () => {
        setLoading(true);
        setError(null);

        try {
            const newQuote = await fetchQuoteFromServerless();
            setQuote(newQuote);
            // Le statut est géré dans fetchQuoteFromServerless
        } catch (err) {
            // Ce bloc ne devrait plus être atteint grâce au fallback, mais par sécurité :
            setQuote(getFallbackQuote());
            setConnectionStatus('demo');
        } finally {
            setLoading(false);
        }
    };

    // Partager la citation
    const shareQuote = () => {
        if (!quote) return;

        const text = `"${quote.text}" — ${quote.author}`;

        if (navigator.share) {
            navigator.share({
                title: 'Citation Inspirante',
                text: text
            }).catch(err => console.log('Partage annulé'));
        } else {
            navigator.clipboard.writeText(text).then(() => {
                alert('✅ Citation copiée dans le presse-papier !');
            });
        }
    };

    // Charger la première citation au démarrage
    useEffect(() => {
        loadNewQuote();
    }, []);

    return (
        <div style={styles.container}>
            {/* Pattern de fond */}
            <div style={styles.backgroundPattern}></div>

            {/* Bandeau d'information */}
            <div style={styles.infoBanner}>
                <div style={styles.infoBannerContent}>
                    <span style={styles.infoBannerIcon}>🚀</span>
                    <div>
                        <div style={styles.infoBannerTitle}>Architecture Serverless Active</div>
                        <div style={styles.infoBannerText}>
                            Citations générées en temps réel par Claude AI via fonction serverless Vercel
                        </div>
                    </div>
                </div>
            </div>

            {/* Statut de connexion */}
            <div style={styles.statusBadge}>
                <span style={{
                    ...styles.statusDot,
                    backgroundColor:
                        connectionStatus === 'connected' ? '#10b981' :
                            connectionStatus === 'error' ? '#ef4444' :
                                '#f59e0b'
                }}></span>
                <span style={styles.statusText}>
                    {connectionStatus === 'connected' ? '✅ Serverless API Active' :
                        connectionStatus === 'demo' ? '⚠️ Mode Démo (Local)' :
                            connectionStatus === 'error' ? '❌ Erreur de connexion' :
                                '⏳ Initialisation...'}
                </span>
            </div>

            {/* Container principal */}
            <div style={styles.mainCard}>
                <div style={styles.quoteIcon}>"</div>

                {loading ? (
                    <div style={styles.loadingContainer}>
                        <div style={styles.spinner}></div>
                        <div style={styles.loadingText}>Génération de la citation...</div>
                    </div>
                ) : error ? (
                    <div style={styles.errorContainer}>
                        <div style={styles.errorText}>❌ {error}</div>
                        <button onClick={loadNewQuote} style={styles.primaryButton}>
                            Réessayer
                        </button>
                    </div>
                ) : quote ? (
                    <>
                        <div style={styles.quoteText}>
                            "{quote.text}"
                        </div>

                        <div style={styles.quoteAuthor}>
                            — {quote.author}
                        </div>

                        <div style={styles.categoryBadge}>
                            {quote.category}
                        </div>

                        <div style={styles.buttonContainer}>
                            <button onClick={loadNewQuote} style={styles.primaryButton}>
                                🎲 Nouvelle Citation
                            </button>

                            <button onClick={shareQuote} style={styles.secondaryButton}>
                                📤 Partager
                            </button>
                        </div>

                        {quote.timestamp && (
                            <div style={styles.timestamp}>
                                Générée le {new Date(quote.timestamp).toLocaleString('fr-FR')}
                            </div>
                        )}
                    </>
                ) : null}
            </div>

            {/* Guide technique */}
            <div style={styles.technicalGuide}>
                <h3 style={styles.guideTitle}>🔧 Architecture Serverless</h3>

                <div style={styles.guideContent}>
                    <div style={styles.guideSection}>
                        <h4 style={styles.guideSectionTitle}>Stack Technique</h4>
                        <div style={styles.techStack}>
                            <span style={styles.techBadge}>React 18</span>
                            <span style={styles.techBadge}>Vite</span>
                            <span style={styles.techBadge}>Vercel Functions</span>
                            <span style={styles.techBadge}>Claude AI API</span>
                        </div>
                    </div>

                    <div style={styles.guideSection}>
                        <h4 style={styles.guideSectionTitle}>Flux de données</h4>
                        <div style={styles.flowDiagram}>
                            Frontend React → /api/generate-quote → Claude AI → Réponse JSON
                        </div>
                    </div>

                    <div style={styles.guideSection}>
                        <h4 style={styles.guideSectionTitle}>✅ Avantages Serverless</h4>
                        <ul style={styles.advantagesList}>
                            <li>🔒 Clé API sécurisée côté serveur</li>
                            <li>⚡ Scalabilité automatique</li>
                            <li>💰 Paiement à l'usage (pas de serveur 24/7)</li>
                            <li>🌍 Déploiement global instantané</li>
                            <li>🛡️ Pas de problèmes CORS</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Styles inline pour éviter les dépendances CSS externes
const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    backgroundPattern: {
        position: 'fixed',
        inset: 0,
        opacity: 0.1,
        pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)',
        backgroundSize: '50px 50px',
    },
    infoBanner: {
        position: 'fixed',
        top: '20px',
        left: '20px',
        right: '20px',
        backgroundColor: '#fef3c7',
        border: '2px solid #fbbf24',
        padding: '15px 20px',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        zIndex: 10,
        maxWidth: '1000px',
        margin: '0 auto',
    },
    infoBannerContent: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
    },
    infoBannerIcon: {
        fontSize: '24px',
    },
    infoBannerTitle: {
        fontWeight: 'bold',
        color: '#78350f',
        marginBottom: '4px',
    },
    infoBannerText: {
        color: '#92400e',
        fontSize: '12px',
    },
    statusBadge: {
        position: 'fixed',
        top: '100px',
        right: '20px',
        backgroundColor: 'rgba(255,255,255,0.95)',
        padding: '12px 20px',
        borderRadius: '50px',
        fontSize: '14px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    statusDot: {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        animation: 'pulse 2s infinite',
    },
    statusText: {
        fontWeight: '500',
    },
    mainCard: {
        maxWidth: '800px',
        width: '100%',
        position: 'relative',
        zIndex: 1,
        marginTop: '80px',
        backgroundColor: 'rgba(255,255,255,0.98)',
        backdropFilter: 'blur(10px)',
        borderRadius: '30px',
        padding: '60px',
        boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
        textAlign: 'center',
    },
    quoteIcon: {
        position: 'absolute',
        top: '20px',
        left: '40px',
        fontSize: '70px',
        color: '#667eea',
        opacity: 0.2,
        fontFamily: 'Georgia, serif',
    },
    loadingContainer: {
        padding: '40px 0',
    },
    spinner: {
        width: '48px',
        height: '48px',
        border: '4px solid rgba(102, 126, 234, 0.3)',
        borderTop: '4px solid #667eea',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 20px',
    },
    loadingText: {
        color: '#667eea',
        fontSize: '18px',
    },
    errorContainer: {
        padding: '40px 0',
    },
    errorText: {
        color: '#ef4444',
        fontSize: '18px',
        marginBottom: '20px',
    },
    quoteText: {
        fontSize: '28px',
        lineHeight: '1.6',
        color: '#1f2937',
        fontStyle: 'italic',
        marginBottom: '30px',
        fontFamily: 'Georgia, serif',
    },
    quoteAuthor: {
        fontSize: '20px',
        color: '#764ba2',
        fontWeight: 'bold',
        marginBottom: '15px',
    },
    categoryBadge: {
        display: 'inline-block',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '8px 20px',
        borderRadius: '50px',
        fontSize: '14px',
        fontWeight: '500',
        marginBottom: '30px',
    },
    buttonContainer: {
        display: 'flex',
        gap: '15px',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    primaryButton: {
        padding: '15px 30px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '50px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
        transition: 'transform 0.2s',
    },
    secondaryButton: {
        padding: '15px 30px',
        background: 'white',
        color: '#667eea',
        border: '2px solid #667eea',
        borderRadius: '50px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s',
    },
    timestamp: {
        marginTop: '20px',
        fontSize: '12px',
        color: '#6b7280',
        fontStyle: 'italic',
    },
    technicalGuide: {
        marginTop: '30px',
        maxWidth: '800px',
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
    },
    guideTitle: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#667eea',
        marginBottom: '20px',
    },
    guideContent: {
        textAlign: 'left',
        color: '#374151',
    },
    guideSection: {
        marginBottom: '20px',
    },
    guideSectionTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#764ba2',
        marginBottom: '10px',
    },
    techStack: {
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
    },
    techBadge: {
        backgroundColor: '#ede9fe',
        color: '#5b21b6',
        padding: '6px 12px',
        borderRadius: '6px',
        fontSize: '13px',
        fontWeight: '500',
    },
    flowDiagram: {
        backgroundColor: '#ede9fe',
        padding: '15px',
        borderRadius: '8px',
        fontFamily: 'monospace',
        fontSize: '14px',
        color: '#5b21b6',
    },
    advantagesList: {
        listStyle: 'none',
        padding: 0,
        fontSize: '14px',
        lineHeight: '2',
    },
};

// Ajouter les animations CSS
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  button:hover {
    transform: translateY(-2px);
  }
`;
document.head.appendChild(styleSheet);

export default App;
