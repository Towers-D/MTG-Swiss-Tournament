import { addPlayer } from "../../db/database";

export async function initPlayers(){
    await addPlayer('Alice');
    await addPlayer('Bob');
    await addPlayer('Clare');
    await addPlayer('Daniel');
    await addPlayer('Eve');
    await addPlayer('Fred');
    await addPlayer('Georgia');
}
