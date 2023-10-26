import { useRef } from "react";
import Hex from "./Hex"
import { getAdjacentHexes } from "@/utils/hexlogic/getAdjacentHexes";

type HexChunkProps = {
    hexChunk: HexChunk
    chunkNo: number
}

export default function HexChunk({ hexChunk, chunkNo }: HexChunkProps) {
    const chunkRef = useRef<HexChunk>(hexChunk);
    const HEXSIZE = 10 // rems
    const CHUNKDIMENSIONS = Math.floor(Math.sqrt(hexChunk.hexes.length));

    return (
        <div key={hexChunk._id} className="grid grid-cols-4 grid-rows-4">
            <div className={`h-[${HEXSIZE}rem] max-w-fit gap-x-[1px] grid`} style={{ gridTemplateColumns: `repeat(${CHUNKDIMENSIONS}, 1fr)` }} key={chunkNo}>
                {chunkRef.current.hexes.map((hex: Hex, i) => (
                    <Hex hex={hex} pos={i} chunkNo={chunkNo} adjHexes={getAdjacentHexes(i, CHUNKDIMENSIONS, chunkRef.current.hexes)} hexSize={HEXSIZE} chunkSize={CHUNKDIMENSIONS} key={`${chunkNo + '-' + i}`} />
                ))}
            </div>
        </div>
    )
}