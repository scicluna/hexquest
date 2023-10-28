import { AdjacentHexes } from '@/utils/hexlogic/getAdjacentHexes'
import style from './hexStyle.module.css'
import { getImage } from '@/utils/hexlogic/getImage'
import Image from 'next/image'
import React, { ForwardedRef } from 'react'
import { generateTerrain } from '@/utils/hexlogic/generateTerrain'
import { generateFeature } from '@/utils/hexlogic/generateFeature'
import HexWindow from './HexWindow'


type HexProps = {
    hex: Hex
    HEXSIZE: number
    adjHexes: AdjacentHexes
    flipHex: (hex: Hex, newTerrain: Terrain, newFeature: string) => void
}

export function Hex(props: HexProps, ref: ForwardedRef<HTMLDivElement>) {
    const { hex, HEXSIZE, adjHexes, flipHex } = props;

    const image = getImage(hex);

    function terrainFlip() {
        if (hex.terrainType !== '?') return;

        const newTerrain = generateTerrain(hex, adjHexes);
        const newFeature = generateFeature(newTerrain);
        flipHex(hex, newTerrain, newFeature);
    }

    return (
        <div
            ref={ref}
            style={{
                "--hex-size": `${HEXSIZE}rem`,
                top: `calc(50% + ${HEXSIZE * hex.position.y * 1.5}rem)`,
                left: `calc(50% + ${HEXSIZE * hex.position.x * .5 * 1.732}rem)`,
            } as React.CSSProperties}
            className={`${style.hexagon} z-50 pointer-events-auto absolute`}
            onClick={terrainFlip}
        >
            <div className='relative h-full w-full point cursor-pointer hover:scale-105 hover:animate-pulse transition-all z-50'>
                <Image src={image} alt={'map tile'} height={(HEXSIZE) * 17} width={(HEXSIZE * (1.732 / 2)) * 17} unoptimized className='w-auto h-full aspect-auto absolute bottom-0 cursor-pointer pointer-events-none z-0' />
                {(hex.terrainType !== '?') && <HexWindow hex={hex} img={image} adjHexes={adjHexes} />}
            </div>
        </div>
    )
};
export default React.forwardRef<HTMLDivElement, HexProps>(Hex);