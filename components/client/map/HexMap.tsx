"use client"
import { useMemo, useRef, useState } from "react";
import Hex from "./hex/Hex";
import { getAdjacentHexes } from "@/utils/hexlogic/getAdjacentHexes";

type HexMapProps = {
    hexUser: HexUser
    mapid: string
    hexMap: HexMap
    deductCredits: (amt: number) => void
}

export default function HexMapStage({ hexUser, mapid, hexMap, deductCredits }: HexMapProps) {
    const [hexes, setHexes] = useState<Hex[]>(hexMap.hexes);
    const mapRef = useRef<HTMLDivElement>(null);
    const HEXSIZE = 10 // rems

    const hexLookup = useMemo(() => {
        const map = new Map<string, Hex>();
        for (const hex of hexes) {
            map.set(`${hex.position.x},${hex.position.y}`, hex);
        }
        return map;
    }, [hexes]);

    const minX = useMemo(() => Math.min(...Array.from(hexLookup.values()).map(hex => hex.position.x)), [hexLookup]);
    const minY = useMemo(() => Math.min(...Array.from(hexLookup.values()).map(hex => hex.position.y)), [hexLookup]);
    const canvasWidth = 100 + (minX < 0 ? -minX * HEXSIZE : 0);  // If you have a specific HEXSIZE to calculate width.
    const canvasHeight = 100 + (minY < 0 ? -minY * HEXSIZE : 0); // If you have a specific HEXSIZE to calculate height.

    function addHex(hex: Hex) {
        setHexes([...hexes, hex]);
    }

    return (
        <section ref={mapRef} className={`flex justify-center items-center relative`} style={{ width: `${canvasWidth}dvw`, height: `${canvasHeight}dvh` }}>
            {hexes.map((hex: Hex, i) => (
                <Hex key={hex._id} hex={hex} HEXSIZE={HEXSIZE} adjHexes={getAdjacentHexes(hex, hexMap, hexLookup)} />
            ))}
        </section>
    )
} 