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
    updateHistory: (hex: Hex, newHistory: string) => void
    deductCredits: (amount: number) => void
    hexUser: HexUser
}

export function Hex(props: HexProps, ref: ForwardedRef<HTMLDivElement>) {
    const { hex, HEXSIZE, adjHexes, flipHex, updateHistory, deductCredits, hexUser } = props;
    const [isFlipped, setIsflipped] = React.useState(hex.terrainType !== '?');

    const image = getImage(hex);

    function terrainFlip() {
        if (hex.terrainType !== '?') return;
        const newTerrain = generateTerrain(hex, adjHexes);
        const newFeature = generateFeature(newTerrain);
        flipHex(hex, newTerrain, newFeature);
        setIsflipped(true);
    }

    return (
        <div
            ref={ref}
            style={{
                "--hex-size": `${HEXSIZE}rem`,
                top: `calc(50% + ${HEXSIZE * hex.position.y * 1.5}rem)`,
                left: `calc(50% + ${HEXSIZE * hex.position.x * .5 * 1.732}rem)`,
            } as React.CSSProperties}
            className={`${style.hexagon} ${isFlipped ? style.flipped : style.new} z-50 pointer-events-auto cursor-pointer absolute hover:brightness-125`}
            onClick={terrainFlip}>
            <div className={`${hex.terrainType === '?' ? style.back : style.front} relative h-full w-full} `}>
                <Image src={image} alt={'map tile'} height={(HEXSIZE) * 17} width={(HEXSIZE * (1.732 / 2)) * 17} unoptimized className='w-auto h-full aspect-auto absolute bottom-0 cursor-pointer pointer-events-none z-0' />
                {(hex.terrainType !== '?') && <HexWindow hex={hex} img={image} adjHexes={adjHexes} updateHistory={updateHistory} deductCredits={deductCredits} hexUser={hexUser} />}
            </div>
        </div>
    )
};
export default React.forwardRef<HTMLDivElement, HexProps>(Hex);