import { NextRequest, NextResponse } from 'next/server';
import { fetchScorers } from '@/lib/football-data';
import { generatePlayerAnalysis, generateFallbackAnalysis } from '@/lib/groq';
import { getCached, setCached } from '@/lib/cache';
import type { ApiError, PlayerApiResponse } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET(
    request: NextRequest
): Promise<NextResponse> {
    const searchParams = request.nextUrl.searchParams;
    const idParam = searchParams.get('id');

    // Validación de query param
    if (!idParam) {
        const error: ApiError = {
            error: 'Query param "id" es requerido',
            status: 400,
        };
        return NextResponse.json(error, { status: 400 });
    }

    const playerId = parseInt(idParam, 10);
    if (Number.isNaN(playerId)) {
        const error: ApiError = {
            error: 'Query param "id" debe ser un número',
            status: 400,
        };
        return NextResponse.json(error, { status: 400 });
    }

    try {
        // 1. Obtener lista de goleadores (usa caché ISR de 5 min)
        const scorers = await fetchScorers();
        const player = scorers.find((s) => s.id === playerId);

        if (!player) {
            const error: ApiError = {
                error: `Jugador con id ${playerId} no encontrado`,
                status: 404,
            };
            return NextResponse.json(error, { status: 404 });
        }

        // 2. Verificar caché de análisis IA
        const cacheKey = `player_analysis_${playerId}`;
        const cachedAnalysis = getCached<PlayerApiResponse['analysis']>(cacheKey);

        if (cachedAnalysis) {
            const response: PlayerApiResponse = {
                player,
                analysis: cachedAnalysis,
                cached: true,
            };
            return NextResponse.json(response, { status: 200 });
        }

        // 3. Generar análisis con IA (o fallback si falla)
        let analysis;
        let fromFallback = false;

        try {
            analysis = await generatePlayerAnalysis(player);
        } catch (groqError) {
            console.error('[API /api/player] Groq falló, usando fallback:', groqError);
            analysis = generateFallbackAnalysis(player);
            fromFallback = true;
        }

        // 4. Guardar en caché (solo si vino de IA, no de fallback)
        if (!fromFallback) {
            setCached(cacheKey, analysis);
        }

        const response: PlayerApiResponse = {
            player,
            analysis,
            cached: false,
        };

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error('[API /api/player]', error);

        const apiError: ApiError = {
            error: 'Error al obtener análisis del jugador',
            details: error instanceof Error ? error.message : 'Error desconocido',
            status: 500,
        };

        return NextResponse.json(apiError, { status: 500 });
    }
}