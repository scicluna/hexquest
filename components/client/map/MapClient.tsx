"use client"

type MapClientProps = {
    user: HexUser
    hexes: Hex[][]
}

export default function MapClient({ user, hexes }: MapClientProps) {
    return (
        <h1>MAP</h1>
    )
}