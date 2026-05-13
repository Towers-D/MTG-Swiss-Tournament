import { isData, deleteJSON } from "./Json";

class Button {
    private func:Function;
    inverse:boolean;
    button:HTMLButtonElement;

    constructor (func: () => void, buttonID:string, inverse:boolean = false) {
        this.button = document.getElementById(buttonID) as HTMLButtonElement;
        this.inverse = inverse;
        this.func = func;

        this.updateButtonState()

        this.button.addEventListener("click", () => {
            if (this.isActive()) {
                func();
            }
        });
    }

    private isActive():boolean {
        return this.inverse ? !isData(): isData();
    }

    updateButtonState() {
        this.button.disabled = this.isActive()
    }
}

function resetButtons(buttons:Array<Button>): void{
    buttons.forEach((button) => {
        button.updateButtonState();
    });

}

// TODO load JSON button


document.addEventListener("DOMContentLoaded", () =>{
    var deleteButton = new Button(deleteJSON, "delete");
    var continueButton = new Button(() => {window.location.assign('/round')}, "continue");
    var standingsButton = new Button(() => {window.location.assign('/standings')}, "standings");
    var createButton = new Button(() => {window.location.assign('/lobby')}, "create", true);

    var buttons:Array<Button> = [deleteButton, continueButton, standingsButton, createButton];

    const htmlButtons = document.querySelectorAll("button");

    htmlButtons.forEach((htmlButton) => {
        htmlButton.addEventListener("click", () => {
            resetButtons(buttons);
        });
    });
});