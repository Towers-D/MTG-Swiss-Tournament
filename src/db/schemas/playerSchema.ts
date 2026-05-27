export type Player = {
    id: string;
    name: string;
};

export const playerSchema = {
    title: 'Player',
    version: 1,
    primaryKey: 'id',
    type: 'object',
    properties: {
        id: {
            type: 'string',
            maxLength: 36,
            pattern: '^[0-9a-fA-F-]{36}$'
        },

        name: {
            type: 'string',
            maxLength: 25
        }
    },
    required: [
        'id',
        'name'
    ]
}

