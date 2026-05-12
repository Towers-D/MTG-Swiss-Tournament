import { TabulatorFull as Tabulator } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";
import { sanitise } from "./utils.ts";

/**
 * Contains the code for generating and managing the players table for the buildevent page.
 * 
 * @remarks
 * Uses the tabulator library to build and manage the player table when starting the event, afterwards, different tables will be used
 * using the output of @function{getJSON}.
 * 
 * @param tableID - the ID of the table DIV tabulator will use. The ID must belong to a `div`.
 * @param inputID - the ID of the input field where names are entered. The ID must belong to a `input`.
 * @param buttonID - the ID of the button to add players when using a mouse or touchscreen. The ID must belong to a `button`.
 * @param counterID - the ID of the div containing which will track the number of players. The ID must belong to a `div`.
 */
export class PlayerTable {
    table: Tabulator;
    playerInput: HTMLInputElement;
    button: HTMLButtonElement;
    playerCounter: HTMLDivElement;

    constructor(tableID: string, inputID: string, buttonID: string, counterID: string) {
        this.table = new Tabulator(`#${tableID}`, {
            responsiveLayout: true,
            height: "311px",
            columns: [
                { title: "Name", field: "name" },
                { title: "Remove", field: "remove", hozAlign: "center", cellClick: this.removePlayer.bind(this) }
            ],
        });

        this.playerInput = document.getElementById(inputID) as HTMLInputElement;
        this.button = document.getElementById(buttonID) as HTMLButtonElement;
        this.playerCounter = document.getElementById(counterID) as HTMLDivElement;
        this.bindEvents();
    }

    /**
     * Bind adding players to clicking the add_player button and hitting enter when in the player_input textbox.
     */
    private bindEvents() {
        this.button.addEventListener("click", this.addPlayer.bind(this));
        this.playerInput.addEventListener("keypress", this.keyTest.bind(this));
    }

    /**
     * Checks if the key hit in the `add_player` field is the "enter" key, if so add the player.
     * 
     * @param keyEvent - Keyboard event being used.
     */
    private keyTest(keyEvent:KeyboardEvent) {
        if (keyEvent.key === "Enter") {
            this.addPlayer();
        }
    }

    /**
     * Adds a player to the players table, then updates count
     */
    addPlayer(): void {
        if (this.playerInput.value.length !== 0) {
            this.table.addRow({ name: sanitise(this.playerInput.value), remove: "X" });
            this.playerInput.value = "";
            this.playerInput.focus();
            this.updatePlayerCount();
        }
    }
    /**
     * Removes a player from the players table, then updates count
     * 
     * @param e - tabulator event, required but not used.
     * @param cell - cell that triggered the function.
     */
    removePlayer(_, cell): void {
        this.table.deleteRow(cell.getRow());
        this.updatePlayerCount();
    }

    /**
     * Called when adding or removing players from the table, changes the value of the player_count div.
     */
    private updatePlayerCount(): void {
        this.playerCounter.textContent = this.table.getRows().length;
    }
}