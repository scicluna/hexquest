export type AdjacentHexes = {
    northwest: Hex | undefined
    northeast: Hex | undefined
    west: Hex | undefined
    east: Hex | undefined
    southwest: Hex | undefined
    southeast: Hex | undefined
}

export function getAdjacentHexes(
    i: number,
    CHUNKDIMENSIONS: number,
    currentChunk: Hex[],
    chunkPosition: { x: number, y: number },
    allChunks: HexChunk[] // Assuming a 2D array for simplicity
): AdjacentHexes {

    // Calculate the row and column of the hex with index i.
    let row = Math.floor(i / CHUNKDIMENSIONS);
    let col = i % CHUNKDIMENSIONS;

    // Calculate adjacent indices for a pointy-topped hex.
    let adjacent: { [key: string]: [number, number] } = {
        northwest: [0, 0],
        northeast: [0, 0],
        west: [0, 0],
        east: [0, 0],
        southwest: [0, 0],
        southeast: [0, 0]
    };

    if (row % 2 === 0) { // even rows
        adjacent.northwest = [row - 1, col];
        adjacent.northeast = [row - 1, col + 1];
        adjacent.west = [row, col - 1];
        adjacent.east = [row, col + 1];
        adjacent.southwest = [row + 1, col];
        adjacent.southeast = [row + 1, col + 1];
    } else { // odd rows
        adjacent.northwest = [row - 1, col - 1];
        adjacent.northeast = [row - 1, col];
        adjacent.west = [row, col - 1];
        adjacent.east = [row, col + 1];
        adjacent.southwest = [row + 1, col - 1];
        adjacent.southeast = [row + 1, col];
    }

    // Convert adjacent coordinates back to indices and filter out any that are off the grid.
    let result: AdjacentHexes = {
        northwest: undefined,
        northeast: undefined,
        west: undefined,
        east: undefined,
        southwest: undefined,
        southeast: undefined
    };

    for (let direction in adjacent) {
        let [adjRow, adjCol] = adjacent[direction as keyof AdjacentHexes];

        // Within current chunk
        if (adjRow >= 0 && adjRow < CHUNKDIMENSIONS && adjCol >= 0 && adjCol < CHUNKDIMENSIONS) {
            let tile = currentChunk[adjRow * CHUNKDIMENSIONS + adjCol];
            if (tile !== undefined) {
                result[direction as keyof AdjacentHexes] = tile;
            }
        }
        // Check in neighboring chunks
        else {
            let neighborPosition: { x: number, y: number } = { ...chunkPosition };

            if (adjRow < 0) {
                neighborPosition.y--;
            } else if (adjRow >= CHUNKDIMENSIONS) {
                neighborPosition.y++;
            }

            if (adjCol < 0) {
                neighborPosition.x--;
            } else if (adjCol >= CHUNKDIMENSIONS) {
                neighborPosition.x++;
            }

            // Find the neighbor chunk based on the adjusted position.
            let neighborChunk = allChunks.find(chunk => chunk.position.x === neighborPosition.x && chunk.position.y === neighborPosition.y);

            if (neighborChunk) {
                // Adjust the coordinates to be within the neighbor chunk's boundaries.
                adjRow = (adjRow + CHUNKDIMENSIONS) % CHUNKDIMENSIONS;
                adjCol = (adjCol + CHUNKDIMENSIONS) % CHUNKDIMENSIONS;

                let tile = neighborChunk.hexes[adjRow * CHUNKDIMENSIONS + adjCol];
                if (tile !== undefined) {
                    result[direction as keyof AdjacentHexes] = tile;
                }
            }
        }
    }

    return result;
}

