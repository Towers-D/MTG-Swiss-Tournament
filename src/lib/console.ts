import { uploadJSON } from "../db/database";
import { goToPage } from "./utils";

export function goToButton(page:string): void {
    goToPage(page);
    //resetButtons();
}

export function jsonButton(): void {
    uploadJSON();
    //resetButtons();
}

export function setUp() {
    document.title = "MTG Swiss Console";
    //resetButtons();
}