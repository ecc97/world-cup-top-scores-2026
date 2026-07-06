export interface FootballDataScorersResponse {
    count: number;
    scorers: FootballDataScorer[];
    competition: {
        id: number;
        name: string;
        code: string;
        emblem: string;
    };
    season: {
        id: number;
        startDate: string;
        endDate: string;
        currentMatchday: number;
        winner: string | null;
    };
}

export interface FootballDataScorer {
    player: FootballDataPlayer;
    team: FootballDataTeam;
    playedMatches: number;
    goals: number;
    assists: number;
    penalties: number;
}

export interface FootballDataPlayer {
    id: number;
    name: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    nationality: string;
    section: string | null;
    position: string | null;
    shirtNumber: number | null;
}

export interface FootballDataTeam {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
    clubColors: string | null;
}