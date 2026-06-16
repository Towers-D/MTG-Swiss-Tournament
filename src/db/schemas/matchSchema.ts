export type Match = {
    id: string;
    playersInMatch: Array<String>;

    // Foreign-Key matches a roundNum
    round: string;
    
};

export const matchSchema = {
    title: 'Match',
    version: 4,
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
            type: 'string',
            pattern: '^[0-9]{3}$',
            maxLength: 3
        },
    },
    required: [
        'id',
        'playersInMatch',
        'round'
    ]
}