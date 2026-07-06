'use client';

import { useEffect } from 'react';
import type { Scorer } from '@/types';
import { usePlayer } from '@/hooks/usePlayer';
import { PlayerCard } from './PlayerCard';
import Image from 'next/image';

interface PlayerModalProps {
    player: Scorer;
    onClose: () => void;
}

export function PlayerModal({ player, onClose }: PlayerModalProps) {
    const { data, loading, error } = usePlayer(player.id);

    // Cerrar con Escape y bloquear scroll del body
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    const ratings = data?.analysis.ratings;
    const description = data?.analysis.description;

    return (
        <div
            className="fixed inset-0 z-50 modal-backdrop flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="modal-content relative max-w-5xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors"
                    aria-label="Cerrar"
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                    >
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>

                <div className="grid md:grid-cols-2 gap-6 items-center">
                    {/* Player Card */}
                    <div className="flex justify-center">
                        {loading || !ratings ? (
                            <div className="w-80 h-[500px] rounded-2xl skeleton"></div>
                        ) : (
                            <PlayerCard player={player} ratings={ratings} />
                        )}
                    </div>

                    {/* Info panel */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
                        <div className="flex items-center gap-3 mb-4">
                            <Image
                                src={player.crest}
                                alt={player.name}
                                width={40}
                                height={40}
                                className="rounded-full border border-black/10"
                            />
                            <div>
                                <h2 className="font-display text-3xl text-white leading-tight">{player.name}</h2>
                                <p className="text-sm text-white/50">
                                    {player.country} · {player.position}
                                </p>
                            </div>
                        </div>

                        {/* Stats grid */}
                        <div className="grid grid-cols-3 gap-3 mb-6">
                            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                                <div className="font-display text-3xl text-green-400">{player.goals}</div>
                                <div className="text-[10px] uppercase tracking-wider text-white/50">Goles</div>
                            </div>
                            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                                <div className="font-display text-3xl text-white">{player.assists}</div>
                                <div className="text-[10px] uppercase tracking-wider text-white/50">Asistencias</div>
                            </div>
                            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                                <div className="font-display text-3xl text-white">{player.matches}</div>
                                <div className="text-[10px] uppercase tracking-wider text-white/50">Partidos</div>
                            </div>
                        </div>

                        {/* AI Description */}
                        <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                                <span className="text-[10px] uppercase tracking-widest text-yellow-400 font-semibold">
                                    Análisis IA
                                </span>
                            </div>

                            {error && (
                                <div className="text-red-400/80 text-sm italic">
                                    No se pudo generar el análisis. Mostrando datos estimados.
                                </div>
                            )}

                            {loading ? (
                                <div className="space-y-2">
                                    <div className="h-3 skeleton rounded w-full"></div>
                                    <div className="h-3 skeleton rounded w-11/12"></div>
                                    <div className="h-3 skeleton rounded w-10/12"></div>
                                </div>
                            ) : (
                                description && (
                                    <p className="text-sm text-white/80 leading-relaxed italic">
                                        "{description}"
                                    </p>
                                )
                            )}
                        </div>

                        {/* Attributes */}
                        {ratings && (
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                                    <span className="text-[10px] uppercase tracking-widest text-green-400 font-semibold">
                                        Atributos generados
                                    </span>
                                </div>
                                <div className="space-y-2">
                                    {[
                                        { label: 'PAC · Velocidad', value: ratings.PAC },
                                        { label: 'ATT · Ataque', value: ratings.ATT },
                                        { label: 'FIN · Definición', value: ratings.FIN },
                                        { label: 'DRI · Regate', value: ratings.DRI },
                                        { label: 'FOR · Físico', value: ratings.FOR },
                                    ].map((attr) => (
                                        <div key={attr.label}>
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="text-white/60">{attr.label}</span>
                                                <span className="font-display text-yellow-400">{attr.value}</span>
                                            </div>
                                            <div className="stat-bar">
                                                <div
                                                    className="stat-bar-fill"
                                                    style={{ width: `${attr.value}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] text-white/40">
                            <span>Datos: football-data.org</span>
                            <span>
                                Rating: {data?.cached ? 'IA (cacheado)' : 'IA Generativa'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}