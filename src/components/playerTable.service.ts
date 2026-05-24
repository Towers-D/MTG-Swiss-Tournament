import { TabulatorFull as Tabulator, type CellComponent } from "tabulator-tables";
import { removePlayer as removeFromDatabase } from "../db/database";

export class PlayerTable {
    private table:Tabulator;
    private counter:HTMLDivElement;

    constructor(tableElement:HTMLDivElement, playerCounter:HTMLDivElement) {
        this.counter = playerCounter;
        this.table = new Tabulator(tableElement, {
            responsiveLayout: true,
            height: "311px",
            columns: [
                { title: "Name", field: "name" },
                { title: "Remove", field: "remove", hozAlign: "center", cellClick: (event, cell) => this.removePlayer(event, cell) }
            ],
        });
    }

    private updatePlayerCount(): void {
        this.counter.textContent = this.getNumberOfPlayers().toString();
    }


    /**
     * Removes a player from the players table, then updates count
     * 
     * @param _event - tabulator event, required but not used.
     * @param cell - cell that triggered the function.
     */
    private removePlayer(_event:UIEvent, cell:CellComponent): void {
        const UUID = cell.getRow().getData().uuid;
        removeFromDatabase(UUID);
        cell.getRow().delete();
        this.updatePlayerCount();
    }

    addPlayer(playerName:string, UUID:string): void {
        this.table.addRow({ 
            name: playerName, 
            uuid: UUID, 
            remove: "X" 
        });
        this.updatePlayerCount();
    }

    getNumberOfPlayers(): number {
        if (this.table.getRows()){
            return this.table.getRows().length;
        }
        return 0;
    }

    getInstance(): PlayerTable {
        return this;
    }
}