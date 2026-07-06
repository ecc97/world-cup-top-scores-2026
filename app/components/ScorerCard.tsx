'use client';

import { useState } from 'react';
import type { Scorer } from '@/types';
import Image from 'next/image';

interface ScorerCardProps {
    player: Scorer;
    rank: number;
    maxGoals: number;
    onClick: (player: Scorer) => void;
}

export function ScorerCard({ player, rank, maxGoals, onClick }: ScorerCardProps) {
    const [crestFailed, setCrestFailed] = useState(false);

    const rankClass =
        rank === 1 ? 'rank-1' : rank === 2 ? 'rank-2' : rank === 3 ? 'rank-3' : 'bg-white/10';
    const rankLabel =
        rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`;

    // Barra de progreso relativa al máximo goleador (no fija en 7)
    const barWidth = maxGoals > 0 ? (player.goals / maxGoals) * 100 : 0;

    return (
        <button
            onClick={() => onClick(player)}
            className="scorer-card rounded-2xl p-5 text-left w-full group fade-in-up"
            style={{ animationDelay: `${0.05 * rank}s` }}
        >
            <div className="flex items-center gap-4">
                {/* Ranking */}
                <div
                    className={`flex-shrink-0 w-12 h-12 rounded-xl ${rankClass} flex items-center justify-center font-display text-2xl text-white`}
                >
                    {rankLabel}
                </div>

                {/* Avatar: crest real con fallback a iniciales */}
                <div
                    className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center font-display text-2xl text-white relative overflow-hidden"
                    style={{
                        background: `linear-gradient(135deg, ${player.teamColor} 0%, ${player.teamColor}dd 100%)`,
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                    {!crestFailed ? (
                        <Image
                            src={player.crest}
                            alt={`${player.name} crest`}
                            width={48}
                            height={48}
                            className="relative z-10 object-contain p-1.5"
                            onError={() => setCrestFailed(true)}
                            unoptimized
                        />
                    ) : (
                        <span className="relative z-10">{player.initials}</span>
                    )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{player.flag}</span>
                        <h3 className="font-semibold text-white truncate group-hover:text-green-400 transition-colors">
                            {player.name}
                        </h3>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-white/50">
                        <span>{player.country}</span>
                        <span>·</span>
                        <span>{player.position}</span>
                        <span>·</span>
                        <span>{player.matches} partidos</span>
                    </div>
                </div>

                {/* Goles */}
                <div className="flex-shrink-0 text-right">
                    <div className="font-display text-4xl text-white leading-none group-hover:text-green-400 transition-colors">
                        {player.goals}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-white/40 mt-1">goles</div>
                </div>
            </div>

            {/* Barra de progreso */}
            <div className="mt-4 stat-bar">
                <div className="stat-bar-fill" style={{ width: `${barWidth}%` }}></div>
            </div>
        </button>
    );
}