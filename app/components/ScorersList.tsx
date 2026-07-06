'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Scorer, ApiError } from '@/types';
import { ScorerCard } from './ScorerCard';
import { PlayerModal } from './PlayerModal';


export function ScorersList() {
    const [scorers, setScorers] = useState<Scorer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<ApiError | null>(null);
    const [selectedPlayer, setSelectedPlayer] = useState<Scorer | null>(null);

    async function loadScorers() {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/scorers');
            const json = await response.json();

            if (!response.ok) {
                setError(json as ApiError);
                return;
            }

            setScorers(json.scorers ?? []);
        } catch (err) {
            setError({
                error: 'Error de red al obtener goleadores',
                details: err instanceof Error ? err.message : 'Error desconocido',
            });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadScorers();
    }, []);

    const sortedScorers = useMemo(
        () =>
            [...scorers].sort(
                (a, b) => b.goals - a.goals || b.assists - a.assists
            ),
        [scorers]
    );

    const maxGoals = sortedScorers[0]?.goals ?? 0;
    const totalGoals = sortedScorers.reduce((sum, p) => sum + p.goals, 0);
    const uniqueCountries = new Set(sortedScorers.map((p) => p.country)).size;

    return (
        <>
            {/* Stats summary */}
            {!loading && !error && (
                <div
                    className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8 fade-in-up"
                    style={{ animationDelay: '0.4s' }}
                >
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <div className="font-display text-3xl text-green-400">{maxGoals}</div>
                        <div className="text-[10px] uppercase tracking-wider text-white/50 mt-1">
                            Máx. goles
                        </div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <div className="font-display text-3xl text-white">{sortedScorers.length}</div>
                        <div className="text-[10px] uppercase tracking-wider text-white/50 mt-1">
                            Jugadores
                        </div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <div className="font-display text-3xl text-yellow-400">{totalGoals}</div>
                        <div className="text-[10px] uppercase tracking-wider text-white/50 mt-1">
                            Goles totales
                        </div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <div className="font-display text-3xl text-white">{uniqueCountries}</div>
                        <div className="text-[10px] uppercase tracking-wider text-white/50 mt-1">
                            Selecciones
                        </div>
                    </div>
                </div>
            )}

            {/* Error state */}
            {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 text-center mb-8 fade-in-up">
                    <div className="text-red-400 font-display text-xl mb-2">
                        {error.error}
                    </div>
                    {error.details && (
                        <div className="text-red-400/70 text-sm mb-4">{error.details}</div>
                    )}
                    <button
                        onClick={loadScorers}
                        className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 rounded-lg text-red-300 text-sm transition-colors"
                    >
                        Reintentar
                    </button>
                </div>
            )}

            {/* Scorers list */}
            <div className="grid md:grid-cols-2 gap-3">
                {loading
                    ? Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="scorer-card rounded-2xl p-5">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl skeleton"></div>
                                <div className="w-14 h-14 rounded-full skeleton"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 skeleton rounded w-3/4"></div>
                                    <div className="h-3 skeleton rounded w-1/2"></div>
                                </div>
                                <div className="w-16 h-12 skeleton rounded"></div>
                            </div>
                        </div>
                    ))
                    : sortedScorers.map((player, idx) => (
                        <ScorerCard
                            key={player.id}
                            player={player}
                            rank={idx + 1}
                            maxGoals={maxGoals}
                            onClick={setSelectedPlayer}
                        />
                    ))}
            </div>

            {/* Footer info */}
            {!loading && !error && (
                <div
                    className="mt-12 text-center text-xs text-white/30 fade-in-up"
                    style={{ animationDelay: '0.8s' }}
                >
                    <p>Los datos de goles, asistencias y partidos son oficiales (football-data.org).</p>
                    <p className="mt-1">Los ratings y descripciones son generados por IA con fines recreativos.</p>
                </div>
            )}

            {/* Modal */}
            {selectedPlayer && (
                <PlayerModal
                    player={selectedPlayer}
                    onClose={() => setSelectedPlayer(null)}
                />
            )}
        </>
    );
}