export type Match = {
    id: string;
    numPlayers: number;

    // Foreign-Key matches a roundNum
    round: string;
    
};

export const matchSchema = {
    title: 'Match',
    version: 1,
    primaryKey: 'id',
    type: 'object',
    properties: {
        id: {
            type: 'string',
            maxLength: 36,
            pattern: '^[0-9a-fA-F-]{36}$'
        },
        numPlayers: {
            type: 'number',
            minimum: 1,
            multipleOf: 1
        },
        round: {
            type: 'number',
            minimum: 1,
            multipleOf: 1
        }
    },
    required: [
        'id',
        'numPlayers',
        'round'
    ]
}