type HexUser = {
    _id: string
    clerkId: string
    email: string
    credits: number
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
    terrain: 'M' | 'F' | 'P' | 'C' | 'O' | 'L' | 'B' | 'H' | 'D' | 'J' | '?'
    feature: string
}