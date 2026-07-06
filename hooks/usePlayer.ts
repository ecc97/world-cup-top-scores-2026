'use client';

import { useEffect, useState } from 'react';
import type { PlayerApiResponse, ApiError } from '@/types';

interface UsePlayerResult {
    data: PlayerApiResponse | null;
    loading: boolean;
    error: ApiError | null;
}

export function usePlayer(playerId: number | null): UsePlayerResult {
    const [data, setData] = useState<PlayerApiResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ApiError | null>(null);

    useEffect(() => {
        if (playerId === null) {
            setData(null);
            setError(null);
            setLoading(false);
            return;
        }

        let cancelled = false;

        async function fetchPlayer() {
            setLoading(true);
            setError(null);
            setData(null);

            try {
                const response = await fetch(`/api/player?id=${playerId}`);
                const json = await response.json();

                if (cancelled) return;

                if (!response.ok) {
                    setError(json as ApiError);
                    return;
                }

                setData(json as PlayerApiResponse);
            } catch (err) {
                if (cancelled) return;
                setError({
                    error: 'Error de red al obtener el análisis',
                    details: err instanceof Error ? err.message : 'Error desconocido',
                });
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchPlayer();

        return () => {
            cancelled = true;
        };
    }, [playerId]);

    return { data, loading, error };
}