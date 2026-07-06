export interface Scorer {
    id: number;
    name: string;
    country: string;
    countryCode: string;
    flag: string;
    teamColor: string;
    crest: string;
    goals: number;
    assists: number;
    matches: number;
    position: string;
    initials: string;
}

export interface PlayerRatings {
    PAC: number;
    ATT: number;
    FIN: number;
    DRI: number;
    FOR: number;
    FORM: string;
}

export interface PlayerAnalysis {
    description: string;
    ratings: PlayerRatings;
}