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
            if (this.getActive()) {
                func();
            }
        });
    }

    private getActive():boolean {
        return this.inverse ? !isData(): isData();
    }

    updateButtonState() {
        this.button.disabled = this.getActive()
    }
}

// TODO convert functions below into Buttons, and find why to reset them after any button pressed.

// Delete Data button
function manageDeleteButton(dataExists:boolean): void {
    var deletebutton:HTMLButtonElement = document.getElementById("delete") as HTMLButtonElement;

    deletebutton.disabled = !dataExists;
    deletebutton.addEventListener("click", () => {
        deleteJSON();
    });

}

// Continue Tournament button
function manageContinuebutton(dataExists:boolean): void {
    var continueButton:HTMLButtonElement = document.getElementById("continue") as HTMLButtonElement;

    continueButton.disabled = !dataExists;
    continueButton.addEventListener("click", () => {
        window.location.assign("/round");
    });
}

// TODO load JSON button

// view standings
function manageStandingsbutton(dataExists:boolean): void {
    var standingsButton:HTMLButtonElement = document.getElementById("standings") as HTMLButtonElement;

    standingsButton.disabled = !dataExists;
    standingsButton.addEventListener("click", () => {
        window.location.assign("/round");
    });
}

// Create Tournament
function manageCreatebutton(dataExists:boolean): void {
    var createButton:HTMLButtonElement = document.getElementById("create") as HTMLButtonElement;

    createButton.disabled = dataExists;
    createButton.addEventListener("click", () => {
        window.location.assign("/lobby");
    });
}

function resetButtons(){
    var dataExists = isData();

}

function setButtons(dataExists:boolean): void {
    manageDeleteButton(dataExists);
    manageContinuebutton(dataExists);
    manageStandingsbutton(dataExists);
    manageCreatebutton(dataExists);
}

document.addEventListener("DOMContentLoaded", () =>{
    var dataExists = isData();
    setButtons(dataExists);
});