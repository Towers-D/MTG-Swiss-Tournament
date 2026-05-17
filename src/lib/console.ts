import { isData } from "../db/database";

function resetButtons(): void {
    const CONSOLE_BUTTONS = document.querySelectorAll<HTMLButtonElement>(".consoleButton");

    CONSOLE_BUTTONS.forEach(button => {
        button.disabled = button.classList.contains('needsData') ? !isData() : isData();
    })
}

function detectButtonPressed(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (target.tagName === 'BUTTON') {
        console.log('Button clicked');
        resetButtons();
    }
}

export function setUp() {
    document.title = "MTG Swiss Console";
    
    resetButtons();

    document.addEventListener("click", detectButtonPressed);
    return () => {
        document.removeEventListener('click', detectButtonPressed);
    };
}