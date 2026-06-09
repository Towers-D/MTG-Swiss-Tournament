export type Player = {
    id: string;
    name: string;
};

const BYE:Player = {id: '-1', name: 'BYE'} as Player;
const LATE:Player = {id: '-2', name: 'LATE'} as Player;

export enum MTGColllections {
    Player = "players",
    Round = "rounds",
    Match = "matches",
    Result = "results"
} 

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

