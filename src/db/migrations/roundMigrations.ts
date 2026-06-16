import { _convertToRoundNum, roundStage } from "../schemas/roundSchema";

export const roundMigrations = {
    1: function(oldDoc:any) {
        return oldDoc;
    },
    //Schema changed from requiring 3 digit nums to 1 to 3 digit nums
    2: function(oldDoc:any) {
        return oldDoc;
    },
    //Migration 4 was meant to be here but schema was not updated when incremented
    3: function(oldDoc:any) {
        return oldDoc;
    },
    //Converts back to requiring 3 digits, to ensure ordering
    4: function(oldDoc:any) {
        oldDoc.roundNum = _convertToRoundNum(oldDoc.roundNum);
        return oldDoc;
    },
    5: function(oldDoc:any) {
        oldDoc.stage = roundStage.COMPLETE;
        return oldDoc;
    },
    6: function(oldDoc:any) {
        if (oldDoc.stage === "results"){
            oldDoc.stage = roundStage.STANDINGS;
        }
        return oldDoc;
    }
}