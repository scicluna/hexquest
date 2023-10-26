type HexProps = {
    hex: Hex
}

export default function Hex({ hex }: HexProps) {
    return (
        <h1>{hex.terrainType}</h1>
    )
}