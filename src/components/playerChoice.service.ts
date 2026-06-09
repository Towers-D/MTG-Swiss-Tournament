import { getPlayerList } from "../db/database";

export type PlayerOption = {
    id: string;
    name: string;
}

export async function getPlayerOptions(): Promise<PlayerOption[]> {
    const players = await getPlayerList(true);

    return players.map(player => ({
        id: player.id,
        name: player.name
    }));
}