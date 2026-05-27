export type Round = {
    roundNum: string;
    date: string;
};

export const roundSchema = {
    title: 'Round',
    version: 1,
    primaryKey: 'roundNum',
    type: 'object',
    properties: {
        roundNum: {
            type: 'string',
            pattern: '^[0-9]{3}$',
            maxLength: 3
        },

        date: {
            type: 'string',
            format: 'date-time'
        }
    },
    required: [
        'roundNum',
        'date'
    ]
}