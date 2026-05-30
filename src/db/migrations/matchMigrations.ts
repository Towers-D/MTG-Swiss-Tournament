export const matchMigrations = {
    0: (oldDoc: any) => oldDoc,
    1: (oldDoc: any) => {
        return {
            ...oldDoc,
            playersInMatch: []
        }
    }
}