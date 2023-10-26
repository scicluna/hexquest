"use client"

import { useState } from "react";
import Hex from "./Hex";

type HexMapProps = {
    hexes: HexMap
    deductCredits: (amt: number) => void
}

export default function HexMapStage({ hexes, deductCredits }: HexMapProps) {
    const [hexMap, setHexMap] = useState<HexMap>(hexes);
    console.log(hexMap)
    return (
        <section className="h-full w-full">
            {hexMap.hexChunks.map((hexChunk: HexChunk) => (
                <div key={hexChunk._id} className="grid grid-cols-4 grid-rows-4">
                    {hexChunk.hexes.map((hex: Hex) => (
                        <Hex key={hex._id} hex={hex} />
                    ))}
                </div>
            ))}
        </section>
    )
}