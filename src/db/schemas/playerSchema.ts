export type Player = {
    id: string;
    name: string;
};

//TODO add DROP_PLAYER

export const BYE_PLAYER:Player = {id: '-1', name: 'BYE'} as Player;
export const LATE_PLAYER:Player = {id: '-2', name: 'LATE'} as Player;


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

