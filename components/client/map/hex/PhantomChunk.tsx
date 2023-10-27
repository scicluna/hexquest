import { useState } from "react"
import HexPhantom from "./HexPhantom"

type PhantomChunkProps = {
    hexUser: HexUser
    mapid: string
    hexChunk: HexChunk
    addHexChunk: (chunk: HexChunk) => void
    CHUNKDIMENSIONS: number
    HEXSIZE: number
    borderDirection: (gridDimensions: number, i: number) => string
    verticalOffset: number
    horizontalOffset: number
}

type directions = {
    Top: boolean
    Bottom: boolean
    Left: boolean
    Right: boolean
}

export default function PhantomChunk({ hexUser, mapid, hexChunk, addHexChunk, CHUNKDIMENSIONS, HEXSIZE, borderDirection, verticalOffset, horizontalOffset }: PhantomChunkProps) {
    return (
        <div className={`pointer-events-none h-[${HEXSIZE}rem] max-w-fit gap-x-[1px] grid absolute -translate-x-1/2 -translate-y-1/2 z-10`} style={{ gridTemplateColumns: `repeat(${(CHUNKDIMENSIONS + 3)}, 1fr)`, top: `-${verticalOffset / 2}rem`, left: `${horizontalOffset}rem` }}>
            {
                Array.from({ length: (CHUNKDIMENSIONS + 3) ** 2 }).map((_, i) => (
                    <HexPhantom user={hexUser} pos={i} mapid={mapid}
                        hexDirection={borderDirection((CHUNKDIMENSIONS + 3), i)}
                        hexSize={HEXSIZE} chunkSize={(CHUNKDIMENSIONS + 3)}
                        visible={borderDirection((CHUNKDIMENSIONS + 3), i) ? true : false}
                        currChunk={hexChunk} key={`PHANTOM-${i}`}
                        addHexChunk={addHexChunk} />
                ))
            }
        </div>
    )
}