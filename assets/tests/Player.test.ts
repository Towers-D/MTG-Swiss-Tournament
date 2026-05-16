import {describe, expectTypeOf, expect, test} from 'vitest'
import { Player } from '../TS/Player'
import { Json } from '../TS/Json';

const ID = 0;
const NAME = 'bob';
const PLAYER = new Player(ID, NAME);

describe('Player is constructed properly', () =>{
    test('ID is 0', () => {
        expect(PLAYER.getID()).toBe(ID);
        expectTypeOf(PLAYER.getID()).toEqualTypeOf(ID);
    })

    test("name is 'bob'", () => {
        expect(PLAYER.name).toEqual(NAME);
        expectTypeOf(PLAYER.name).toEqualTypeOf(NAME);
    })
})

describe('Player.fromJSON', () =>{
    const json:Json = {
        "name": NAME,
        "results": {
            "0": {
                "opponentID": -1,
                "matchResult": {
                    "wins": 2,
                    "losses": 0
                }
            }
        }
    }
    const JSON_PLAYER = Player.fromJSON(ID, json);
    test('ID is 0', () => {
        expect(JSON_PLAYER.getID()).equal(ID);
        expectTypeOf(JSON_PLAYER.getID()).toEqualTypeOf(ID)
    })

    test('json player is constructed properly', () => {
        expect(JSON_PLAYER.name).equal(NAME)
        expectTypeOf(JSON_PLAYER.name).toEqualTypeOf(NAME)
    })
})