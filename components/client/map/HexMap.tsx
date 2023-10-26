"use client"

import { useState } from "react";

type HexMapProps = {
    hexes: HexMap
    deductCredits: (amt: number) => void
}

export default function HexMapStage({ hexes, deductCredits }: HexMapProps) {
    const [hexMap, setHexMap] = useState<HexMap>(hexes);
    console.log(hexMap)
    return (
        <section className="h-full w-full">
            {hexMap.hexChunks.map((hexChunk: HexChunk, i) => (
                <div className="grid grid-cols-4 grid-rows-4">
                    {hexChunk.hexes.map((hex: Hex, j) => (
                        <div>
                            {hex.terrainType}
                        </div>
                    ))}
                </div>
            ))}
        </section>
    )
}