    import { TabulatorFull as Tabulator, type CellComponent } from "tabulator-tables";
    import { sanitise } from "../lib/utils";

    

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
     * @param e - tabulator event, required but not used.
     * @param cell - cell that triggered the function.
     */
    private removePlayer(_event:UIEvent, cell:CellComponent): void {
        cell.getRow().delete();
        this.updatePlayerCount();
    }

    addPlayer(playerInput:HTMLInputElement): void {
        let name = playerInput.value;
        if (name.length > 0) {
            this.table.addRow({ name: sanitise(name), remove: "X" });
            playerInput.value = "";
            playerInput.focus();
            this.updatePlayerCount();
        }
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