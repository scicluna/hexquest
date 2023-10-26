import { useRef } from "react";
import Hex from "./Hex"
import { getAdjacentHexes } from "@/utils/hexlogic/getAdjacentHexes";
import HexPhantom from "./HexPhantom";

type HexChunkProps = {
    hexChunk: HexChunk
    chunkNo: number
    allChunks: HexChunk[]
}

export default function HexChunk({ hexChunk, chunkNo, allChunks }: HexChunkProps) {
    const chunkRef = useRef<HexChunk>(hexChunk);
    const HEXSIZE = 10 // rems
    const CHUNKDIMENSIONS = Math.floor(Math.sqrt(hexChunk.hexes.length));
    let xOffset = hexChunk.position.x * (HEXSIZE) * (1.732 / 2) * 17;  // Assuming chunkWidth is the calculated width of a chunk.
    let yOffset = hexChunk.position.y * (HEXSIZE) * 17; // Assuming chunkHeight is the calculated height of a chunk.
    const horizontalOffset = (HEXSIZE * (1.732 / 2) / 2);  // half of the width of a hex
    const verticalOffset = HEXSIZE * 0.75;  // three-quarters of the height of a hex

    function isBorder(gridDimensions: number, i: number): boolean {
        // Top Row
        if (i > gridDimensions && i < (gridDimensions * 2) - 1) {
            return true;
        }
        // Bottom Row
        if (i > gridDimensions ** 2 - gridDimensions - 1 && i < gridDimensions ** 2 - 2) {
            return true;
        }

        // Left Column
        if (i % gridDimensions === 0 && i >= gridDimensions + 1) {
            return true;
        }

        // Right Column
        if (i % gridDimensions + 1 === gridDimensions - 1 && i <= gridDimensions ** 2 - gridDimensions - 2 && i >= gridDimensions + 1) {
            return true;
        }

        return false;
    }

    return (
        <div key={hexChunk._id} className="h-fit w-fit" style={{ position: 'absolute', top: `calc(50% + ${yOffset}px)`, left: `calc(50% + ${xOffset}px)` }}>

            {/* Phantom Hex Grid */}
            <div className={`h-[${HEXSIZE}rem] max-w-fit gap-x-[1px] grid absolute -translate-x-1/2 -translate-y-1/2`} style={{ gridTemplateColumns: `repeat(${(CHUNKDIMENSIONS + 3)}, 1fr)`, zIndex: 0, top: `-${verticalOffset / 2}rem`, left: `${horizontalOffset}rem` }}>
                {Array.from({ length: (CHUNKDIMENSIONS + 3) ** 2 }).map((_, i) => (
                    isBorder((CHUNKDIMENSIONS + 3), i)
                        ?
                        <HexPhantom pos={i} hexSize={HEXSIZE} chunkSize={(CHUNKDIMENSIONS + 3)} visible={true} key={`PHANTOM-${i}`} />
                        :
                        <HexPhantom pos={i} hexSize={HEXSIZE} chunkSize={(CHUNKDIMENSIONS + 3)} visible={false} key={`PHANTOM-${i}`} />
                ))}
            </div>

            {/* Actual Hex Grid */}
            <div className={`h-[${HEXSIZE}rem] max-w-fit gap-x-[1px] grid absolute -translate-x-1/2 -translate-y-1/2`} style={{ gridTemplateColumns: `repeat(${CHUNKDIMENSIONS}, 1fr)`, zIndex: 1 }} key={chunkNo}>
                {chunkRef.current.hexes.map((hex: Hex, i) => (
                    <Hex hex={hex} pos={i} chunkNo={chunkNo} adjHexes={getAdjacentHexes(i, CHUNKDIMENSIONS, hexChunk.hexes, { x: hexChunk.position.x, y: hexChunk.position.y }, allChunks)} hexSize={HEXSIZE} chunkSize={CHUNKDIMENSIONS} key={`${chunkNo + '-' + i}`} />
                ))}
            </div>

        </div>
    )

}