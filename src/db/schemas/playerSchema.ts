export const playerSchema = {
    title: 'Player',
    version: 0,
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
    }
}