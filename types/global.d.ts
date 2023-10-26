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
    hexChunks: HexChunk[]
}

type Hex = {
    _id: string
    history: string[]
    terrainType: 'M' | 'F' | 'P' | 'C' | 'O' | 'L' | 'H' | 'D' | 'J' | 'Ma' | '?'
    feature: string
}

type HexChunk = {
    _id: string
    mapId: string
    hexes: Hex[]
    position: {
        x: number
        y: number
    }
}