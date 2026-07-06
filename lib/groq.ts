import Groq from 'groq-sdk';
import type { GroqStructuredResponse, PlayerAnalysis, Scorer } from '../types';

// Cliente singleton: se instancia una sola vez y se reutiliza.
// El SDK maneja internamente el pool de conexiones.
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
    timeout: 15000, // 15 segundos
});

const GROQ_MODEL = 'llama-3.3-70b-versatile';

const VALID_FORMS = ['🔥', '⚡', '✨'];
const DEFAULT_RATINGS = {
    PAC: 75,
    ATT: 75,
    FIN: 75,
    DRI: 75,
    FOR: 75,
    FORM: '⚡',
};

function buildPrompt(player: Scorer): string {
    return `Eres un comentarista de fútbol que escribe descripciones estilo FIFA Ultimate Team en español de Latinoamérica.

Jugador: ${player.name}
Selección: ${player.country}
Posición: ${player.position}
Goles en el torneo: ${player.goals}
Asistencias en el torneo: ${player.assists}
Partidos jugados: ${player.matches}

Genera:
1. Una descripción de máximo 40 palabras que describa su estilo de juego, fortalezas y impacto en el torneo. Tono épico y deportivo, en español de Latinoamérica.
2. Ratings numéricos del 60 al 99 para: PAC (velocidad), ATT (ataque), FIN (definición), DRI (regate), FOR (físico).
3. Un emoji de forma: 🔥 (excelente), ⚡ (muy bueno), ✨ (bueno).

Responde SOLO en JSON con esta estructura exacta, sin texto adicional:
{
  "description": "texto aquí",
  "ratings": {
    "PAC": 95,
    "ATT": 92,
    "FIN": 94,
    "DRI": 90,
    "FOR": 88,
    "FORM": "🔥"
  }
}`;
}

function clampRating(value: number): number {
    if (typeof value !== 'number' || Number.isNaN(value)) return 75;
    return Math.max(60, Math.min(99, Math.round(value)));
}

function validateAndNormalize(raw: {
    description?: unknown;
    ratings?: Record<string, unknown>;
}): PlayerAnalysis {
    const ratings = (raw.ratings ?? {}) as Record<string, unknown>;

    return {
        description:
            typeof raw.description === 'string' && raw.description.length > 0
                ? raw.description
                : 'Jugador destacado con gran impacto en el torneo.',
        ratings: {
            PAC: clampRating(ratings.PAC as number),
            ATT: clampRating(ratings.ATT as number),
            FIN: clampRating(ratings.FIN as number),
            DRI: clampRating(ratings.DRI as number),
            FOR: clampRating(ratings.FOR as number),
            FORM: VALID_FORMS.includes(ratings.FORM as string)
                ? (ratings.FORM as string)
                : DEFAULT_RATINGS.FORM,
        },
    };
}

export async function generatePlayerAnalysis(
    player: Scorer
): Promise<PlayerAnalysis> {
    if (!process.env.GROQ_API_KEY) {
        throw new Error('GROQ_API_KEY no está configurada');
    }

    let completion;
    try {
        completion = await groq.chat.completions.create({
            model: GROQ_MODEL,
            messages: [
                {
                    role: 'system',
                    content:
                        'Eres un asistente que responde únicamente con JSON válido según la estructura solicitada. No agregues texto fuera del JSON.',
                },
                { role: 'user', content: buildPrompt(player) },
            ],
            temperature: 0.7,
            max_tokens: 300,
            response_format: { type: 'json_object' },
        });
    } catch (error) {
        // El SDK lanza GroqError con códigos HTTP específicos
        if (error instanceof Error) {
            if (error.name === 'AbortError' || error.message.includes('timeout')) {
                throw new Error('Timeout al conectar con Groq');
            }
            if (error.message.includes('401')) {
                throw new Error('API key de Groq inválida');
            }
            if (error.message.includes('429')) {
                throw new Error('Límite de rate de Groq alcanzado');
            }
        }
        throw new Error('Error de red al conectar con Groq');
    }

    const content = completion.choices?.[0]?.message?.content;

    if (!content || typeof content !== 'string') {
        throw new Error('Respuesta vacía de Groq');
    }

    let parsed: { description?: unknown; ratings?: Record<string, unknown> };
    try {
        parsed = JSON.parse(content);
    } catch {
        throw new Error('Groq devolvió JSON inválido');
    }

    return validateAndNormalize(parsed);
}

// Fallback si la IA falla: ratings basados en estadísticas reales
export function generateFallbackAnalysis(player: Scorer): PlayerAnalysis {
    const goalFactor = Math.min(player.goals / 7, 1);
    const base = 70;
    const boost = Math.round(goalFactor * 25);

    return {
        description: `${player.name} ha sido una pieza clave en el ataque de ${player.country}, con ${player.goals} goles en ${player.matches} partidos.`,
        ratings: {
            PAC: base + boost - 2,
            ATT: base + boost + 3,
            FIN: base + boost + 2,
            DRI: base + boost,
            FOR: base + boost - 1,
            FORM: player.goals >= 5 ? '🔥' : player.goals >= 3 ? '⚡' : '✨',
        },
    };
}