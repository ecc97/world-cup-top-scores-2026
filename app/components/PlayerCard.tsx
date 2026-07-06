'use client';

import { useState } from 'react';
import type { Scorer, PlayerRatings } from '@/types';
import Image from 'next/image';

interface PlayerCardProps {
    player: Scorer;
    ratings: PlayerRatings;
}

export function PlayerCard({ player, ratings }: PlayerCardProps) {
    const [crestFailed, setCrestFailed] = useState(false);

    const overallRating = Math.round(
        (ratings.PAC + ratings.ATT + ratings.FIN + ratings.DRI + ratings.FOR) / 5
    );

    return (
        <div className="player-card">
            <div className="card-pattern"></div>

            {/* Header con rating */}
            <div className="relative p-6 pb-2">
                <div className="flex items-start justify-between">
                    <div>
                        <div className="font-display text-6xl text-yellow-400 leading-none drop-shadow-lg">
                            {overallRating}
                        </div>
                        <div className="font-display text-xl text-white/80 mt-1">{player.position}</div>
                        <div className="text-xs text-white/50 mt-1 flex items-center gap-1">
                            <span>{player.flag}</span>
                            <span>{player.country.toUpperCase()}</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-[10px] uppercase tracking-widest text-white/40">World Cup</div>
                        <div className="font-display text-2xl text-white/80">2026</div>
                    </div>
                </div>
            </div>

            {/* Avatar central: crest real con fallback a iniciales */}
            <div className="relative flex justify-center my-4">
                <div
                    className="w-32 h-32 rounded-full flex items-center justify-center font-display text-5xl text-white relative overflow-hidden"
                    style={{
                        background: `linear-gradient(135deg, ${player.teamColor} 0%, ${player.teamColor}99 100%)`,
                    }}
                >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent"></div>
                    <div className="absolute inset-2 rounded-full border-2 border-white/20"></div>
                    {!crestFailed ? (
                        <Image
                            src={player.crest}
                            alt={`${player.name} crest`}
                            width={100}
                            height={100}
                            className="relative z-10 object-contain p-4"
                            onError={() => setCrestFailed(true)}
                            unoptimized
                        />
                    ) : (
                        <span className="relative z-10">{player.initials}</span>
                    )}
                </div>
            </div>

            {/* Nombre */}
            <div className="text-center px-6">
                <div className="font-display text-3xl text-white leading-tight tracking-wide">
                    {player.name.toUpperCase()}
                </div>
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mt-2"></div>
            </div>

            {/* Atributos */}
            <div className="grid grid-cols-3 gap-2 px-6 mt-5">
                {[
                    { label: 'PAC', value: ratings.PAC },
                    { label: 'ATT', value: ratings.ATT },
                    { label: 'FIN', value: ratings.FIN },
                    { label: 'DRI', value: ratings.DRI },
                    { label: 'FOR', value: ratings.FOR },
                    { label: 'FORM', value: ratings.FORM, isIcon: true },
                ].map((attr) => (
                    <div key={attr.label} className="text-center">
                        <div className="font-display text-2xl text-yellow-400 leading-none">
                            {attr.value}
                        </div>
                        <div className="text-[9px] uppercase tracking-widest text-white/50 mt-1">
                            {attr.label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}