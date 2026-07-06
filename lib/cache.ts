import NodeCache from 'node-cache';

// Caché en memoria con TTL de 1 hora para respuestas de Groq.
// En Vercel serverless, este caché se pierde entre cold starts,
// pero es suficiente para el MVP.
const cache = new NodeCache({
    stdTTL: 3600, // 1 hora en segundos
    checkperiod: 120, // Limpia claves expiradas cada 2 min
    useClones: false, // Más rápido, no necesitamos clonar
});

export function getCached<T>(key: string): T | undefined {
    return cache.get<T>(key);
}

export function setCached<T>(key: string, value: T): void {
    cache.set(key, value);
}

export function clearCache(): void {
    cache.flushAll();
}