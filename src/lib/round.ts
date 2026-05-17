import { retrieveJSON, isData, Json } from "./Json";
import { range, shuffleArray } from "./utils";



document.addEventListener("DOMContentLoaded", () =>{
    if (isData() === false) {
        window.location.replace("/");
    }
    
    var json:Json = retrieveJSON() as Json;

    console.log(json);
    console.log(json.players[0])
    console.log("hello")
});