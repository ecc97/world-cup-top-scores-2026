import type {
    FootballDataScorersResponse,
    FootballDataScorer,
    Scorer,
} from '../types';
import { getCountryInfo, mapSectionToPosition, getInitials } from './countries';

const API_URL = 'https://api.football-data.org/v4/competitions/WC/scorers';
const API_KEY = process.env.FOOTBALL_DATA_API_KEY;

const FETCH_TIMEOUT_MS = 5000;

async function fetchWithTimeout(
    url: string,
    options: RequestInit,
    timeoutMs: number
): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
        });
        return response;
    } finally {
        clearTimeout(timeoutId);
    }
}

function mapScorer(raw: FootballDataScorer): Scorer {
    const countryInfo = getCountryInfo(raw.player.nationality);

    return {
        id: raw.player.id,
        name: raw.player.name,
        country: countryInfo.nameEs,
        countryCode: countryInfo.countryCode,
        flag: countryInfo.flag,
        teamColor: countryInfo.color,
        crest: raw.team.crest,
        goals: raw.goals,
        assists: raw.assists,
        matches: raw.playedMatches,
        position: mapSectionToPosition(raw.player.section),
        initials: getInitials(raw.player.name),
    };
}

export async function fetchScorers(): Promise<Scorer[]> {
    if (!API_KEY) {
        throw new Error('FOOTBALL_DATA_API_KEY no está configurada');
    }

    let response: Response;
    try {
        response = await fetchWithTimeout(
            API_URL,
            {
                headers: { 'X-Auth-Token': API_KEY },
                next: { revalidate: 300 },
            },
            FETCH_TIMEOUT_MS
        );
    } catch (error) {
        const message =
            error instanceof Error && error.name === 'AbortError'
                ? 'Timeout al conectar con football-data.org'
                : 'Error de red al conectar con football-data.org';
        throw new Error(message);
    }

    if (!response.ok) {
        throw new Error(
            `football-data.org respondió con status ${response.status}`
        );
    }

    const data = (await response.json()) as FootballDataScorersResponse;

    if (!data.scorers || !Array.isArray(data.scorers)) {
        throw new Error('Respuesta inválida de football-data.org');
    }

    return data.scorers.map(mapScorer);
}