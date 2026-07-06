import { PlayerAnalysis, Scorer } from "./domain";

export interface PlayerApiResponse {
    player: Scorer;
    analysis: PlayerAnalysis;
    cached: boolean;
}

export interface ApiError {
    error: string;
    details?: string;
    status?: number;
}