"use client"

import { useState } from "react";
import Hex from "./hex/Hex";
import HexChunk from "./hex/HexChunk";

type HexMapProps = {
    hexes: HexMap
    deductCredits: (amt: number) => void
}

export default function HexMapStage({ hexes, deductCredits }: HexMapProps) {
    const [hexMap, setHexMap] = useState<HexMap>(hexes);
    return (
        <section className="h-full w-full bg-black">
            {hexMap.hexChunks.map((hexChunk: HexChunk, i) => (
                <HexChunk key={hexChunk._id} hexChunk={hexChunk} chunkNo={i} />
            ))}
        </section>
    )
} 