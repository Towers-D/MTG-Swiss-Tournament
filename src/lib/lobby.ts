import "tabulator-tables/dist/css/tabulator.min.css";
import { isData } from "../db/database";
import { goToPage } from "./utils";
import { PlayerTable } from "../components/playerTable.service";

export function setUp(): void {
    document.title = "MTG Swiss Lobby";

    if (isData()) {
        goToPage()
    }
}