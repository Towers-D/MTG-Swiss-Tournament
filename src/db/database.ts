import { addRxPlugin, createRxDatabase, type RxDatabase, type RxDocument } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';


//Player Collection
import { BYE_PLAYER, LATE_PLAYER, playerSchema, type Player } from './schemas/playerSchema';

//Get rid of annoying warning
import { disableWarnings, RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { _convertToRoundNum, getNextRoundStage, roundSchema, roundStage } from './schemas/roundSchema';
import { matchSchema, type Match } from './schemas/matchSchema';
import { playerMigrations } from './migrations/playerMigrations';
import { roundMigrations } from './migrations/roundMigrations';
import { matchMigrations } from './migrations/matchMigrations';
import { resultSchema } from './schemas/resultSchema';
import { resultMigrations } from './migrations/resultMigrations';
disableWarnings();


import { wrappedValidateAjvStorage  } from 'rxdb/plugins/validate-ajv';
import { RxDBMigrationSchemaPlugin } from 'rxdb/plugins/migration-schema';
import { TOURNAMENT_STAGES, tournamentSchema } from './schemas/tournamentSchema';
import { tournamentMigrations } from './migrations/tournamentMigrations';

//Dev mode
addRxPlugin(RxDBMigrationSchemaPlugin);
if (import.meta.env.DEV) {
    addRxPlugin(RxDBDevModePlugin);
}

export enum MTGColllections {
    Player = "players",
    Round = "rounds",
    Match = "matches",
    Result = "results"
} 


export function uploadJSON(): void {
    console.log('JSON');
}

let dbPromise: Promise<RxDatabase> | null = null;

export async function getDB() {
    await indexedDB.deleteDatabase("tournament");
    if (!dbPromise) {
        dbPromise = _create();
    }
    return dbPromise;
}

const _create = async () => {
    const DB = await createRxDatabase({
        name: 'tournament',
        storage: wrappedValidateAjvStorage({
            storage: getRxStorageDexie()
        })
    });

    await DB.addCollections({
        tournaments: {
            schema: tournamentSchema,
            migrationStrategies: tournamentMigrations
        },
        players: {
            schema: playerSchema,
            migrationStrategies: playerMigrations
        },
        rounds: {
            schema: roundSchema,
            migrationStrategies: roundMigrations
        },
        matches: {
            schema: matchSchema,
            migrationStrategies: matchMigrations
        },
        results: {
            schema: resultSchema,
            migrationStrategies: resultMigrations
        }
    });

    return DB;
}



// ### Utility Functions
async function _getNames() {
    const DB = await getDB();
    return await Object.keys(DB.collections);
}

async function _getDocsFromCollection(collection:MTGColllections) {
    const DB = await getDB();
    const COLLECTION = await DB.collections[collection]
    const DOCS = await COLLECTION.find().exec();
    return DOCS;
}

async function _getCollection(collection:MTGColllections) {
    const DOCS = await _getDocsFromCollection(collection);
    return await DOCS.map(doc => doc.toJSON());
}

export async function _logCollection(collection:MTGColllections) {
    const JSON = await _getCollection(collection);
    console.log(JSON);
}

export async function _deleteCollection(collection:MTGColllections) {
    const DOCS = await _getDocsFromCollection(collection)
    await Promise.all(DOCS.map(doc => doc.remove()));
}

export async function collectionHasDocs(collection:MTGColllections): Promise<boolean> {
    const DOCS = await _getDocsFromCollection(collection);
    return DOCS.length > 0 ? true : false;
}

export async function deleteDatabase(): Promise<boolean> {
    const NAMES: Array<string> = await _getNames();
    await Promise.all(NAMES.map(async (name) => {await _deleteCollection(name as MTGColllections)}));
    return true;
}

export async function dataExists(): Promise<boolean> {
    const NAMES: Array<string> = await _getNames();
    for (const NAME of NAMES) {
        if (await collectionHasDocs(NAME as MTGColllections)) {
            return true;
        }
    }
    return false;
}

// TOURNAMENT FUNCTIONS
async function _createTournament() {
    const DB: RxDatabase = await getDB();

    const UUID = crypto.randomUUID();

    const TOURNAMENT = DB.tournaments.insert({
        id: UUID,
        roundsInTournament: new Array<string>(),
        stage: TOURNAMENT_STAGES[0]
    });
}

export async function advanceStage() {
    const ROUND = await _getCurrentRoundDoc();
    if (ROUND) {
        const NEXT_STAGE = await getNextRoundStage(await getCurrentStageInRound() as roundStage);
        await ROUND.patch({
            stage: NEXT_STAGE
        })
    }
}

// #### RESULT FUNCTIONS
export async function createResult(playerID:string, matchID:string): Promise<string> {
    const DB: RxDatabase = await getDB();
    const RESULT = await DB.matches.insert({
        fk_playerID: playerID,
        fk_matchID: matchID
    });
    return RESULT.id;
}

export async function updateResult(resultID:string, wins:number, losses:number) {
    const DB = await getDB();
    const RESULT = await DB.results.findOne(resultID).exec();
    if (RESULT) {
        await RESULT.patch({
            wins: wins,
            losses: losses
        })
    }
}

export async function addResult(playerID:string, matchID:string, wins:number, losses:number): Promise<String> {
    const UUID = await createResult(playerID, matchID);
    await updateResult(UUID, wins, losses);
    return UUID;
}

// #### MATCH FUNCTIONS
export async function addMatch(playerIDs:Array<String>, round:number = -1): Promise<string> {
    const DB: RxDatabase = await getDB();
    const UUID = crypto.randomUUID();
    const ROUND = round >= 0 ? round : await getCurrentRound();
    await DB.matches.insert({
        id: UUID,
        playersInMatch: playerIDs,
        round: _convertToRoundNum(ROUND),
    })
    return UUID;
}

async function _countResultsInMatch(match:RxDocument): Promise<number> {
    const DB: RxDatabase = await getDB();

    return await DB.results.count({
        selector: {
            fk_matchID: match.primary
        }
    }).exec();
}

async function _getMatchesInRound(roundNum:number) {
    const DB: RxDatabase = await getDB();

    return await DB.matches.find({
        selector: {
            round: _convertToRoundNum(roundNum)
        }
    }).exec();
}

export async function getMatchesInCurrentRound(): Promise<Array<Match>> {
    const MATCHES_IN_ROUND = await _getMatchesInRound(await getCurrentRound());
    return await MATCHES_IN_ROUND.map(match => match.toJSON());
}

async function _getMatchDocByID(matchID:string): Promise<RxDocument> {
    const DB = await getDB();
    return await DB.matches.findOne(matchID).exec();
}

export async function getMatchObjbyID(matchID:string): Promise<Match> {
    const MATCH_DOC = await _getMatchDocByID(matchID);
    return MATCH_DOC.toJSON() as Match;
}


// #### ROUND FUNCTIONS
export async function addRound() {
    const DB: RxDatabase = await getDB();
    //PKs need to be strings
    const NEW_ROUND: number = await getCurrentRound() + 1;

    await DB.rounds.insert({
        roundNum: _convertToRoundNum(NEW_ROUND),
        date: new Date().toISOString(),
        stage: roundStage.LOBBY
    })
}

export async function getCurrentStageInRound(): Promise<roundStage|null> {
    const ROUND = await _getCurrentRoundDoc();
    if (ROUND) {
        return await ROUND.get('stage');
    }
    return null;
}

export async function advanceCurrentRound() {
    let round = await _getCurrentRoundDoc();
    if (round) {
        await round.patch({
            stage: getNextRoundStage(round.get('stage'))
        })
    }
}

export async function isCurrentRoundStage(checkStage:roundStage): Promise<boolean> {
    return (await getCurrentStageInRound() === checkStage) ? true : false;

}

export async function needNewRound() {
    const ROUND_NUMBER = await getCurrentRound();
    if (ROUND_NUMBER === 0) {
        return true;
    }
    return await _roundFinished();
}

async function _roundFinished(): Promise<boolean> {
    if (await isCurrentRoundEmpty()) {
        return false;
    }

    const MATCHES = await _getMatchesInRound(await getCurrentRound());
    for (const MATCH of MATCHES) {
        const RESULTS:number = await _countResultsInMatch(MATCH);
        const NUM_PLAYERS:number = await MATCH.get('playersInMatch').length

        if (NUM_PLAYERS > RESULTS) {
            return false;
        }
    }
    return true;
}

export async function isCurrentRoundEmpty(): Promise<boolean> {
    return await isRoundEmpty(await getCurrentRound());
}

export async function isRoundEmpty(roundNum:number): Promise<boolean> {
    const matchesInRound = await _getMatchesInRound(roundNum);
    return await matchesInRound.length === 0 ? true : false;
}

async function _getCurrentRoundDoc(): Promise<RxDocument> {
    const DB: RxDatabase = await getDB();
    const IDX: number = await getCurrentRound();
    return await DB.rounds.findOne(_convertToRoundNum(IDX)).exec();

}

// async function getCurrentRoundIndex(): Promise<number> {
//     return await getCurrentRound() -1;
// }

export async function getCurrentRound(): Promise<number> {
    const DB: RxDatabase = await getDB();
    const rounds = await DB.rounds.find().exec();
    return await rounds.length;
}

// #### PLAYER FUNCTIONS

/**
 * 
 * @param playerName 
 * @returns a `string` that is the players UUID for use of removal
 */
export async function addPlayer(playerName: string): Promise<string> {
    const DB = await getDB();
    const UUID = crypto.randomUUID()
    await DB.players.insert({
        id: UUID,
        name: playerName
    })
    return UUID;
}

/**
 * 
 * @param playerID 
 */
export async function removePlayer(playerID: string): Promise<void> {
    const player = await _getPlayerDocByID(playerID);
    if (player) {
        await player.remove();
    }
}

export async function getPlayerList(withBye:boolean = false) {
    let players = await _getCollection(MTGColllections.Player);

    if (withBye && players.length % 2 !== 0) {
        players.push(BYE_PLAYER);
    }

    return players;
}

async function _getPlayerDocByID(playerID:string): Promise<RxDocument> {
    const DB = await getDB();
    return await DB.players.findOne(playerID).exec();
}

export async function getPlayerObjbyID(playerID:string): Promise<Player> {
    switch (playerID) {
        case '-1':
            return BYE_PLAYER;
        case '-2':
            return LATE_PLAYER;
        default:
            const PLAYER_DOC = await _getPlayerDocByID(playerID);
            return PLAYER_DOC.toJSON() as Player;
    }
}

export async function getPlayersInMatch(matchID:string) {
    const DB: RxDatabase = await getDB();
    const MATCH = await DB.matches.findOne(matchID).exec();

    const PLAYERS = new Array<Player>();
    for (const PLAYER of MATCH.playersInMatch) {
        PLAYERS.push(await getPlayerObjbyID(PLAYER))
    }
    return PLAYERS
}