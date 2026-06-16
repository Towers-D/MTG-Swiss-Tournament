export const  TOURNAMENT_STAGES =  [
    'lobby',
    'pairing',
    'matches',
    'results'
] as const;

type TournamentStage = typeof TOURNAMENT_STAGES[number];

export type Tournament = {
    id: string;
    roundsInTournament: Array<string>;
    stage: TournamentStage;
};

export const tournamentSchema = {
    title: 'Tournament',
    version: 0,
    primaryKey: 'id',
    type: 'object',
    properties: {
        id: {
            type: 'string',
            maxLength: 36,
            pattern: '^[0-9a-fA-F-]{36}$'
        },
        roundsInTournament: {
            type: 'array',
            items: {
                type: 'string',
                pattern: '^[0-9]{3}$',
                maxLength: 3
            }
        },
        stage: {
            type: 'string',
            enum: [...TOURNAMENT_STAGES]
        }
    },
    required: [
        'id',
        'roundsInTournament',
        'stage'
    ]
}