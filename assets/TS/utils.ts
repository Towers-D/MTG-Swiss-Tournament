// 
/**
 * Santises an input string from special characters.
 * 
 * @remarks
 * Modified from Matt Hyde here: {@link https://stackoverflow.com/a/48226843}
 * 
 * @param input - A string to be sanitised.
 * @returns `input` with the special characters [&, <, >, ", ', /, `, ;] replaced/removed.
 */
export function sanitise(input:string): string {
    const MAP:Map<string, string> = new Map();
    MAP.set('&', '&amp;');
    MAP.set('<', '&lt;');
    MAP.set('>', '&gt;');
    MAP.set('"', '&quot;');
    MAP.set("'", '&#x27;');
    MAP.set('/', '&#x2F;');
    MAP.set('`', '&grave;');
    MAP.set(';', "");

    const REG:RegExp = /[&<>"'/;`]/ig;
    return input.replace(REG, (match) => MAP.get(match) as string);
}