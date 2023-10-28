type HexUser = {
    _id: string
    clerkId: string
    email: string
    credits: number
    apiKey: stringtring
}

type HexMap = {
    _id: string
    name: string
    userId: string
    hexes: Hex[]
}

type Hex = {
    _id: string
    history: string[]
    terrainType: Terrain
    feature: string
    position: {
        x: number
        y: number
    }
}

type Terrain = 'M' | 'F' | 'P' | 'C' | 'O' | 'L' | 'H' | 'D' | 'J' | 'Ma' | '?'