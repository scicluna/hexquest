import { dungeonNames } from "@/public/locationnames/dungeons";
import { weightedRandom } from "./generateTerrain";
import { AdjacentHexes } from "./getAdjacentHexes";
import { townNames } from "@/public/locationnames/towns";

export function generateLocation(terrain: HexTerrain, adjHexes: AdjacentHexes) {
    if (terrain === 'O') {
        return {
            type: 'none',
            name: 'none'
        } as HexLocation
    }
    const weights: Record<string, number> = {
        'Dungeon': 1,
        'Town': 1,
        'none': 20
    }
    Object.values(adjHexes).forEach(adjHex => {
        if (adjHex) {
            switch (adjHex.location.type) {
                case 'Dungeon': {
                    weights['Dungeon'] -= 100
                    break
                }
                case 'Town': {
                    weights['Town'] -= 100
                    break
                }
                default: {
                    break
                }
            }
        }
    })

    const location: HexLocation = { type: 'none', name: 'none' }
    location.type = weightedRandom(weights) as 'Dungeon' | 'Town' | 'none';

    switch (location.type) {
        case 'Dungeon': {
            location.name = dungeonNames[Math.floor(Math.random() * dungeonNames.length)]
            break
        }
        case 'Town': {
            location.name = townNames[Math.floor(Math.random() * townNames.length)]
            break
        }
        default: {
            location.name = 'none'
            break
        }
    }

    return location;
}