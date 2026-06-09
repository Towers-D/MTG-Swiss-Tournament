export type Match = {
    id: string;
    playersInMatch: Array<String>;

    // Foreign-Key matches a roundNum
    round: string;
    
};

export const matchSchema = {
    title: 'Match',
    version: 3,
    primaryKey: 'id',
    type: 'object',
    properties: {
        id: {
            type: 'string',
            maxLength: 36,
            pattern: '^[0-9a-fA-F-]{36}$'
        },
        playersInMatch: {
            type: 'array',
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