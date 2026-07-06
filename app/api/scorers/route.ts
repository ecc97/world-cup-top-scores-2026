import { NextResponse } from 'next/server';
import { fetchScorers } from '@/lib/football-data';
import type { ApiError } from '@/types';

export const dynamic = 'force-dynamic'; // Desactiva caché estática

export async function GET(): Promise<NextResponse> {
    try {
        const scorers = await fetchScorers();

        return NextResponse.json(
            { scorers, count: scorers.length },
            { status: 200 }
        );
    } catch (error) {
        console.error('[API /api/scorers]', error);

        const apiError: ApiError = {
            error: 'Error al obtener goleadores',
            details: error instanceof Error ? error.message : 'Error desconocido',
            status: 500,
        };

        return NextResponse.json(apiError, { status: 500 });
    }
}