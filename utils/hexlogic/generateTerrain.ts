import { AdjacentHexes } from "./getAdjacentHexes";

export function generateTerrain(hex: Hex, adjHexes: AdjacentHexes) {
    const weights: Record<string, number> = {
        'M': .01, 'F': .01, 'P': .01, 'C': .01, 'O': .01, 'L': .01, 'H': .01, 'D': .01, 'J': .01, 'Ma': .01, '?': .00
    };

    Object.values(adjHexes).forEach(adjHex => {
        if (adjHex) {
            switch (adjHex.terrainType) {
                // Mountain
                case "M": {
                    weights['M'] += 12
                    weights['H'] += 5
                    weights['D'] += 4
                    weights['F'] += 2
                    weights['J'] += 2
                    weights['Ma'] += 1
                    weights['P'] += 1
                    weights['C'] += 1
                    weights['L'] += 1
                    weights['O'] += .1
                    break
                }
                // Forest
                case "F": {
                    weights['F'] += 12
                    weights['P'] += 4.5
                    weights['H'] += 4
                    weights['Ma'] += 3
                    weights['M'] += 2
                    weights['J'] += 2
                    weights['C'] += 1
                    weights['L'] += 1
                    weights['O'] += .1
                    weights['D'] += .1
                    break
                }
                // Plains
                case "P": {
                    weights['P'] += 12
                    weights['F'] += 5
                    weights['H'] += 5
                    weights['J'] += 3
                    weights['D'] += 3
                    weights['Ma'] += 3
                    weights['C'] += 3
                    weights['L'] += 3
                    weights['M'] += 1.5
                    weights['O'] += .1
                    break
                }
                // Coast
                case "C": {
                    weights['O'] += 14
                    weights['C'] += 12
                    weights['P'] += 1
                    weights['F'] += 1
                    weights['H'] += .5
                    weights['J'] += .5
                    weights['L'] += .5
                    weights['Ma'] += .5
                    weights['D'] += 0
                    weights['M'] += 0
                    break
                }
                // Ocean
                case "O": {
                    weights['O'] += 24
                    weights['C'] += 8
                    weights['P'] += .5
                    weights['F'] += .5
                    weights['H'] += .5
                    weights['M'] += .5
                    weights['J'] += 0
                    weights['L'] += 0
                    weights['Ma'] += 0
                    weights['D'] += 0
                    break
                }
                // Lake
                case "L": {
                    weights['M'] += 2
                    weights['P'] += 4
                    weights['F'] += 2
                    weights['H'] += 2
                    weights['J'] += 2
                    weights['L'] += 2
                    weights['Ma'] += 2
                    weights['C'] += 2
                    weights['D'] += 2
                    weights['O'] += 0
                    break
                }
                // Hills
                case "H": {
                    weights['H'] += 10
                    weights['M'] += 5
                    weights['D'] += 3
                    weights['F'] += 3
                    weights['J'] += 2
                    weights['P'] += 2
                    weights['Ma'] += 1
                    weights['C'] += 1
                    weights['L'] += 1
                    weights['O'] += .1
                    break
                }
                // Desert
                case "D": {
                    weights['D'] += 12
                    weights['H'] += 6
                    weights['M'] += 5
                    weights['P'] += 3
                    weights['L'] += 2
                    weights['C'] += 1
                    weights['J'] += .5
                    weights['Ma'] += .5
                    weights['F'] += .5
                    weights['O'] += 0
                    break
                }
                // Jungle
                case "J": {
                    weights['J'] += 6
                    weights['P'] += 4.5
                    weights['H'] += 4
                    weights['Ma'] += 3
                    weights['M'] += 2
                    weights['F'] += 2
                    weights['C'] += 1
                    weights['L'] += 1
                    weights['O'] += .5
                    weights['D'] += .1
                    break
                }
                // Marsh
                case "Ma": {
                    weights['Ma'] += 6
                    weights['L'] += 3
                    weights['F'] += 3
                    weights['J'] += 3
                    weights['P'] += 2
                    weights['H'] += 2
                    weights['C'] += 1
                    weights['D'] += 1
                    weights['M'] += .5
                    weights['O'] += .1
                    break
                }
                default: {
                    break;
                }
            }
        }
    })

    return weightedRandom(weights) as Terrain;
}

function weightedRandom(weights: Record<string, number>) {
    // Calculate total weight
    const totalWeight = Object.values(weights).reduce((acc, curr) => acc + curr, 0);

    // Generate a random value between 0 and totalWeight
    const r = Math.random() * totalWeight;

    let sum = 0;
    for (const key in weights) {
        sum += weights[key];
        if (r <= sum) return key;
    }

    return '?'; // default if nothing matched, but this should not happen
}
