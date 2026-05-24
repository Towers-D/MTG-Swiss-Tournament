import type { AsyncAction } from "rxjs/internal/scheduler/AsyncAction";
import { uploadJSON } from "../db/database";
import { goToPage } from "./utils";

let dataExists: (() => Promise<boolean>)|null = null;

// export async function resetButtons(): Promise<void> {
//     const CONSOLE_BUTTONS = document.querySelectorAll<HTMLButtonElement>(".consoleButton");

//     await CONSOLE_BUTTONS.forEach(async button => {
//         if (dataExists !== null){
//             const result = await dataExists();
//             button.disabled = button.classList.contains('needsData') ? !result : result;
//         }
//     })
// }

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