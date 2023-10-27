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
    hexMap: HexMap,
    hexLookup: Map<string, Hex>
): AdjacentHexes {
    const { x, y } = currentHex.position;

    return {
        northwest: hexLookup.get(`${x},${y - 1}`),
        northeast: hexLookup.get(`${x + 1},${y - 1}`),
        west: hexLookup.get(`${x - 1},${y}`),
        east: hexLookup.get(`${x + 1},${y}`),
        southwest: hexLookup.get(`${x},${y + 1}`),
        southeast: hexLookup.get(`${x + 1},${y + 1}`)
    };
}

