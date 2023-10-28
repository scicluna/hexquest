import { getAdjacentDirections } from "./getAdjacentDirections"

export type AdjacentHexes = {
    northwest: Hex | undefined
    northeast: Hex | undefined
    west: Hex | undefined
    east: Hex | undefined
    southwest: Hex | undefined
    southeast: Hex | undefined
}

export function getAdjacentHexes(
    currentHex: Hex,
    hexLookup: Map<string, Hex>
): AdjacentHexes {
    const { x, y } = currentHex.position;
    const directions = getAdjacentDirections(y);

    return {
        northeast: hexLookup.get(`${x + directions[0].x},${y + directions[0].y}`),
        northwest: hexLookup.get(`${x + directions[1].x},${y + directions[1].y}`),
        east: hexLookup.get(`${x + directions[2].x},${y}`),
        west: hexLookup.get(`${x + directions[3].x},${y}`),
        southeast: hexLookup.get(`${x + directions[4].x},${y + directions[4].y}`),
        southwest: hexLookup.get(`${x + directions[5].x},${y + directions[5].y}`)
    };
}


