export const matchMigrations = {
    1: function(oldDoc:any) {
        return oldDoc;
    },
    2: function(oldDoc:any) {
        return oldDoc;
    },
    3: function(oldDoc: any) {
        return {
            ...oldDoc,
            playersInMatch: []
        }
    }
}