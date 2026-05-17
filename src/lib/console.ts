import { deleteDatabase, isData, uploadJSON } from "../db/database";
import { goToPage } from "./utils";

function resetButtons(): void {
    const CONSOLE_BUTTONS = document.querySelectorAll<HTMLButtonElement>(".consoleButton");

    CONSOLE_BUTTONS.forEach(button => {
        button.disabled = button.classList.contains('needsData') ? !isData() : isData();
    })
}

export function goToButton(page:string): void {
    goToPage(page);
    resetButtons();
}

export function jsonButton(): void {
    uploadJSON();
    resetButtons();
}

export function deleteButton(): void {
    deleteDatabase()
    resetButtons();
}

export function setUp() {
    document.title = "MTG Swiss Console";
    resetButtons();
}