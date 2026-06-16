import { _convertToRoundNum } from "../schemas/roundSchema";

export const matchMigrations = {
    1: function(oldDoc:any) {
        return oldDoc;
    },
    2: function(oldDoc:any) {
        return oldDoc;
    },
    // Switch from number of players to array of ids
    3: function(oldDoc: any) {
        return {
            ...oldDoc,
            playersInMatch: []
        }
    },
    //Accept the new Round ID
    4: function(oldDoc: any) {
        oldDoc.round = _convertToRoundNum(oldDoc.round);
        return oldDoc;
    }
}