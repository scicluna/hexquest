"use client"
import { useMemo, useRef, useState, useEffect } from "react";
import Hex from "./hex/Hex";
import { getAdjacentHexes } from "@/utils/hexlogic/getAdjacentHexes";
import PhantomHex from "./hex/PhantomHex";
import { generateHex } from "@/utils/hexcrud/generateHex";
import { getAdjacentDirections } from "@/utils/hexlogic/getAdjacentDirections";
import { updateHex } from "@/utils/hexcrud/updateHex";

type HexMapProps = {
    hexUser: HexUser
    mapid: string
    hexMap: HexMap
    deductCredits: (amt: number) => void
}

export default function HexMapStage({ hexUser, mapid, hexMap, deductCredits }: HexMapProps) {
    const [hexes, setHexes] = useState<Hex[]>(hexMap.hexes);
    const firstHexRef = useRef<HTMLDivElement>(null);
    const HEXSIZE = 10 // rems

    const hexLookup = useMemo(() => {
        const map = new Map<string, Hex>();
        for (const hex of hexes) {
            map.set(`${hex.position.x},${hex.position.y}`, hex);
        }
        return map;
    }, [hexes]);

    const phantomHexes = useMemo(() => {
        const potentialPhantomHexes = new Set<string>();

        hexes.forEach(hex => {
            const adjDirections = getAdjacentDirections(hex.position.y);

            adjDirections.forEach(dir => {
                const adjX = hex.position.x + dir.x;
                const adjY = hex.position.y + dir.y;

                if (!hexLookup.has(`${adjX},${adjY}`)) {
                    potentialPhantomHexes.add(`${adjX},${adjY}`);
                }
            });
        });

        return Array.from(potentialPhantomHexes).map(coordStr => {
            const [x, y] = coordStr.split(',').map(Number);
            return { position: { x, y } };  // Returning just the position for simplicity. Adjust as needed.
        });
    }, [hexes, hexLookup]);


    const minX = useMemo(() => Math.min(...Array.from(hexLookup.values()).map(hex => hex.position.x)), [hexLookup]);
    const minY = useMemo(() => Math.min(...Array.from(hexLookup.values()).map(hex => hex.position.y)), [hexLookup]);
    const canvasWidth = 100 + (minX < 0 ? -minX * HEXSIZE * 1.44 : 0);  // 1.44 is a magic number. idk why it works.
    const canvasHeight = 100 + (minY < 0 ? -minY * HEXSIZE * 5.15 : 0); // 5.15 is a magic number. idk why it works.

    useEffect(() => {
        if (firstHexRef.current) {
            const rect = firstHexRef.current.getBoundingClientRect();
            const scrollX = rect.left - (window.innerWidth / 2) + (HEXSIZE * 1.732 / 2);
            const scrollY = rect.top - (window.innerHeight / 2) + (HEXSIZE * 1.5);
            window.scrollTo({
                top: scrollY,
                left: scrollX,
                behavior: 'smooth'
            });
        }
    }, []);

    async function addHex(coords: { x: number, y: number }) {
        const hex = await generateHex(hexUser._id, mapid, coords.x, coords.y);
        setHexes([...hexes, hex]);
    }

    async function flipHex(hex: Hex, newTerrain: Terrain, newFeature: string) {
        const updatedHex = hexes.filter(h => h._id === hex._id)[0];
        updatedHex.terrainType = newTerrain;
        updatedHex.feature = newFeature;
        setHexes([...hexes.filter(h => h._id !== hex._id), updatedHex]);

        await updateHex(hexUser._id, hexMap._id, hex._id, updatedHex);
    }

    async function updateHistory(hex: Hex, newHistory: string) {
        const updatedHex = hexes.filter(h => h._id === hex._id)[0];
        updatedHex.history.push(newHistory);
        setHexes([...hexes.filter(h => h._id !== hex._id), updatedHex]);

        await updateHex(hexUser._id, hexMap._id, hex._id, updatedHex);
    }

    return (
        <section className={`flex justify-center items-center relative`} style={{ width: `${canvasWidth}dvw`, height: `${canvasHeight}dvh` }}>
            {hexes.map((hex: Hex, i) => (
                <Hex key={hex._id}
                    hex={hex} HEXSIZE={HEXSIZE}
                    adjHexes={getAdjacentHexes(hex, hexLookup)}
                    flipHex={flipHex}
                    deductCredits={deductCredits}
                    updateHistory={updateHistory}
                    hexUser={hexUser}
                    ref={i === 0 ? firstHexRef : null} />
            ))}
            {phantomHexes.map((hex: { position: { x: number, y: number } }) => (
                <PhantomHex key={`${hex.position.x},${hex.position.y}`}
                    hex={hex} HEXSIZE={HEXSIZE} addHex={addHex} />
            ))}
        </section>
    )
} 