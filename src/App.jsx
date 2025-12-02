import React, { useState, useEffect } from 'react';

const App = () => {
    const [quote, setQuote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [connectionStatus, setConnectionStatus] = useState('initializing');

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

    const fetchQuoteFromServerless = async () => {
        try {
            const response = await fetch("/api/generate-quote", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
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
            setConnectionStatus('demo');
            return getFallbackQuote();
        }
    };

    const loadNewQuote = async () => {
        setLoading(true);
        setError(null);

        try {
            const newQuote = await fetchQuoteFromServerless();
            setQuote(newQuote);
        } catch (err) {
            setQuote(getFallbackQuote());
            setConnectionStatus('demo');
        } finally {
            setLoading(false);
        }
    };

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

    useEffect(() => {
        loadNewQuote();
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.backgroundPattern}></div>

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
                    </>
                ) : null}
            </div>
        </div>
    );
};

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
    mainCard: {
        maxWidth: '800px',
        width: '100%',
        position: 'relative',
        zIndex: 1,
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
        fontSize: '32px',
        lineHeight: '1.6',
        color: '#1f2937',
        fontStyle: 'italic',
        marginBottom: '30px',
        fontFamily: 'Georgia, serif',
    },
    quoteAuthor: {
        fontSize: '24px',
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
        marginBottom: '40px',
    },
    buttonContainer: {
        display: 'flex',
        gap: '20px',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    primaryButton: {
        padding: '18px 36px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '50px',
        fontSize: '18px',
        fontWeight: '600',
        cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
        transition: 'transform 0.2s',
    },
    secondaryButton: {
        padding: '18px 36px',
        background: 'white',
        color: '#667eea',
        border: '2px solid #667eea',
        borderRadius: '50px',
        fontSize: '18px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s',
    },
};

const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  button:hover {
    transform: translateY(-2px);
  }
`;
document.head.appendChild(styleSheet);

export default App;
