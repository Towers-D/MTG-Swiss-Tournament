export type Json = { [key:string]: any};
import { RowComponent } from "tabulator-tables";

const JSON_STRING:string = "tournamentJSON";

//TO-DO function to remove localstorage after lifespan

/**
 * Creates the initial JSON file needed to create rounds.
 */
export function createJSON(playerRows:Array<RowComponent>):void  {
    const json:Json = {};
    json.round = 0;
    json.lifespan = Date.now() + 12 * 1000 * 60 * 60; // make nicer
    json.players = {};

    playerRows.forEach(row => {
        const data = row.getData() as {
            name: string;
            remove: string;
        }

        json.players[data.name] = {};
    });

    localStorage.setItem(JSON_STRING, JSON.stringify(json));
};

export function deleteJSON():void {
    localStorage.removeItem(JSON_STRING);
}

/**
 * Checks if the stored data exceeds the lifespan it was created with and if so deletes it.
 * 
 * @returns `null` when no localStorage is found. Otherwise return whether the data was removed. 
 */
function checkExpired(data:Json):boolean {
    if (Date.now() > data.lifespan) {
        deleteJSON();
        return true;
    }
    return false;
}

export function isData():boolean {
    const raw = localStorage.getItem(JSON_STRING);
    const data:Json|null = raw ? JSON.parse(raw) : null;
    return data ? !checkExpired(data) : false;
}
