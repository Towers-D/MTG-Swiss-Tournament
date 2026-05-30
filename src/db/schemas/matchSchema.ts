export type Match = {
    id: string;
    numPlayers: Array<String>;

    // Foreign-Key matches a roundNum
    round: string;
    
};

export const matchSchema = {
    title: 'Match',
    version: 2,
    primaryKey: 'id',
    type: 'object',
    properties: {
        id: {
            type: 'string',
            maxLength: 36,
            pattern: '^[0-9a-fA-F-]{36}$'
        },
        playerInMatch: {
            type: 'number',
            items: {
                type: 'string'
            }
        },
        round: {
            type: 'number',
            minimum: 1,
            multipleOf: 1
        }
    },
    required: [
        'id',
        'playersInMatch',
        'round'
    ]
}