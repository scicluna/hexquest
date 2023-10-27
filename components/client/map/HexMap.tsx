"use client"

import { useEffect, useRef, useState } from "react";
import HexChunk from "./hex/HexChunk";

type HexMapProps = {
    hexUser: HexUser
    mapid: string
    hexes: HexMap
    deductCredits: (amt: number) => void
}

export default function HexMapStage({ hexUser, mapid, hexes, deductCredits }: HexMapProps) {
    const [hexChunks, setHexChunks] = useState<HexChunk[]>(hexes.hexChunks);
    const mapRef = useRef<HTMLDivElement>(null);
    const width = hexChunks.length * 100 + 100;
    const height = hexChunks.length * 100 + 100;

    function addHexChunk(chunk: HexChunk) {
        setHexChunks([...hexChunks, chunk]);
    }

    useEffect(() => {
        if (mapRef.current) {
            const centerPosX = (mapRef.current.offsetWidth) / 2 + 40;
            const centerPosY = (mapRef.current.offsetHeight) / 2 + 40;
        }

    }, [mapRef]);

    return (
        <section ref={mapRef} className={`flex justify-center items-center relative`} style={{ width: `${width}dvw`, height: `${height}dvh` }}>
            {hexChunks.map((hexChunk: HexChunk, i) => (
                <HexChunk key={hexChunk._id} hexUser={hexUser} mapid={mapid} hexChunk={hexChunk} chunkNo={i} allChunks={hexes.hexChunks} addHexChunk={addHexChunk} />
            ))}
        </section>
    )
} 