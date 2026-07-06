export interface GroqStructuredResponse {
    description: string;
    ratings: {
        PAC: number;
        ATT: number;
        FIN: number;
        DRI: number;
        FOR: number;
        FORM: string;
    };
}