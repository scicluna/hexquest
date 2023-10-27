import { useRef } from "react";
import Hex from "./Hex"
import { getAdjacentHexes } from "@/utils/hexlogic/getAdjacentHexes";
import HexPhantom from "./HexPhantom";
import PhantomChunk from "./PhantomChunk";

type HexChunkProps = {
    hexUser: HexUser
    mapid: string
    hexChunk: HexChunk
    chunkNo: number
    allChunks: HexChunk[]
    addHexChunk: (hexChunk: HexChunk) => void
}

export default function HexChunk({ hexUser, mapid, hexChunk, chunkNo, allChunks, addHexChunk }: HexChunkProps) {
    const chunkRef = useRef<HexChunk>(hexChunk);
    const HEXSIZE = 10 // rems
    const CHUNKDIMENSIONS = Math.floor(Math.sqrt(hexChunk.hexes.length));
    let xOffset = hexChunk.position.x * (HEXSIZE) * (1.732) * 32.2;  // Assuming chunkWidth is the calculated width of a chunk.
    let yOffset = hexChunk.position.y * (HEXSIZE) * 17 * 2.85; // Assuming chunkHeight is the calculated height of a chunk.
    const horizontalOffset = (HEXSIZE * (1.732 / 2) / 2);  // half of the width of a hex
    const verticalOffset = HEXSIZE * 0.75;  // three-quarters of the height of a hex

    function borderDirection(gridDimensions: number, i: number): string {
        // Top Row
        if (i > gridDimensions && i < (gridDimensions * 2) - 1) {
            return "Top";
        }
        // Bottom Row
        if (i > gridDimensions ** 2 - gridDimensions - 1 && i < gridDimensions ** 2 - 2) {
            return "Bottom";
        }

        // Left Column
        if (i % gridDimensions === 0 && i >= gridDimensions + 1) {
            return "Left";
        }

        // Right Column
        if (i % gridDimensions + 1 === gridDimensions - 1 && i <= gridDimensions ** 2 - gridDimensions - 2 && i >= gridDimensions + 1) {
            return "Right";
        }

        return "";
    }

    return (
        <div key={hexChunk._id} className=""
            style={{ position: 'absolute', top: `calc(50% + ${yOffset}px)`, left: `calc(50% + ${xOffset}px)` }}>

            {/* Phantom Hex Grid */}
            <PhantomChunk hexUser={hexUser} hexChunk={hexChunk} CHUNKDIMENSIONS={CHUNKDIMENSIONS} HEXSIZE={HEXSIZE} addHexChunk={addHexChunk} borderDirection={borderDirection} horizontalOffset={horizontalOffset} verticalOffset={verticalOffset} mapid={mapid} />

            {/* Actual Hex Grid */}
            <div className={`pointer-events-none h-[${HEXSIZE}rem] max-w-fit gap-x-[1px] grid absolute -translate-x-1/2 -translate-y-1/2 z-20`} style={{ gridTemplateColumns: `repeat(${CHUNKDIMENSIONS}, 1fr)` }} key={chunkNo}>
                {chunkRef.current.hexes.map((hex: Hex, i) => (
                    <Hex hex={hex} pos={i} chunkNo={chunkNo} adjHexes={getAdjacentHexes(i, CHUNKDIMENSIONS, hexChunk.hexes, { x: hexChunk.position.x, y: hexChunk.position.y }, allChunks)} hexSize={HEXSIZE} chunkSize={CHUNKDIMENSIONS} key={`${chunkNo + '-' + i}`} />
                ))}
            </div>

        </div>
    )

}