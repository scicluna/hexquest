"use client"

import { useState } from "react";
import HexChunk from "./hex/HexChunk";

type HexMapProps = {
    hexUser: HexUser
    mapid: string
    hexes: HexMap
    deductCredits: (amt: number) => void
}

export default function HexMapStage({ hexUser, mapid, hexes, deductCredits }: HexMapProps) {
    const [hexChunks, setHexChunks] = useState<HexChunk[]>(hexes.hexChunks);

    function addHexChunk(chunk: HexChunk) {
        setHexChunks([...hexChunks, chunk]);
    }

    return (
        <section className="">
            {hexChunks.map((hexChunk: HexChunk, i) => (
                <HexChunk key={hexChunk._id} hexUser={hexUser} mapid={mapid} hexChunk={hexChunk} chunkNo={i} allChunks={hexes.hexChunks} addHexChunk={addHexChunk} />
            ))}
        </section>
    )
} 