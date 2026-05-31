export const roundMigrations = {
    1: function(oldDoc:any) {
        return oldDoc;
    },
    //Schema changed from requiring 3 digit nums to 1 to 3 digit nums
    2: function(oldDoc:any) {
        return oldDoc;
    }
}