import "tabulator-tables/dist/css/tabulator.min.css";
import { goToPage } from "./utils";
import { PlayerTable } from "../components/playerTable.service";

export function setUp(): void {
    document.title = "MTG Swiss Lobby";
}