import { RowComponent } from "tabulator-tables";
import { DateTime } from "luxon";


export interface Json { 
    key:string: any
};

const JSON_STRING:string = "tournamentJSON";

//TO-DO function to remove localstorage after lifespan

/**
 * Creates the initial JSON file needed to create rounds.
 */
export function createJSON(playerRows:Array<RowComponent>):void  {
    const json:Json = {};
    json.round = 0;
    json.lifespan = DateTime.now().plus({ days: 1 }); // make nicer
    json.players = {};

    var counter = 0;

    playerRows.forEach(row => {
        const data = row.getData() as {
            name: string;
            remove: string;
        }

        json.players[counter++] = {
            name: data.name,
            matches: {

            }
        };
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

export function retrieveJSON():Json|null {
    if(isData()) {
        const raw = localStorage.getItem(JSON_STRING) as string;
        var data:Json = JSON.parse(raw);
        return data;
    }
    return null;
}