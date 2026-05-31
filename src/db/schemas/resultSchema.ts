export type Result = {
    //PK id = playerID + '|' + matchID
    id: string;
    fk_playerID: string;
    fk_matchID: string;
    wins: number;
    losses: number;
};

export const resultSchema = {
    title: 'Result',
    version: 0,
    primaryKey: {
        key: 'id',
        fields: [
            'fk_playerID',
            'fk_matchID'
        ],
        separator: '|'
    },
    type: 'object',
    properties: {
        id: {
            type: 'string',
            maxLength: 73,
            pattern: '^[0-9a-fA-F-]{36}$'
        },
        fk_playerID: {
            type: 'string',
            maxLength: 36,
            pattern: '^[0-9a-fA-F-]{36}$'
        },
        fk_matchID: {
            type: 'string',
            maxLength: 36,
            pattern: '^[0-9a-fA-F-]{36}$'
        },
        wins: {
            type: 'number',
            minimum: 0,
            maximum: 2
        },
        losses: {
            type: 'number',
            minimum: 0,
            maximum: 2
        }
    },
    required: [
        'id',
        'fk_playerID',
        'fk_matchID',
        'wins',
        'losses'
    ]
}