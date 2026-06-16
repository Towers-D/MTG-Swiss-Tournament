export type Round = {
    roundNum: string;
    date: string;
    stage: roundStage
};

export function _convertToRoundNum(roundNum:number): string {
    return roundNum.toString().padStart(3, '0')
}

export enum roundStage {
    LOBBY = 'lobby',
    PAIRINGS = 'pairings',
    MATCHES = 'matches',
    STANDINGS = 'standings',
    COMPLETE = 'complete'
}

export function getNextRoundStage(currStage:roundStage): roundStage {
    const STAGES = Object.values(roundStage);
    const ENUM_IDX = STAGES.indexOf(currStage);

    return ENUM_IDX < STAGES.length -1 ? STAGES[ENUM_IDX + 1] : roundStage.COMPLETE;
}

export const roundSchema = {
    title: 'Round',
    version: 7,
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
        },

        stage: {
            type: 'string',
            enum: Object.values(roundStage)
        }
    },
    required: [
        'roundNum',
        'date',
        'stage'
    ]
}