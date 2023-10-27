import { AdjacentHexes } from '@/utils/hexlogic/getAdjacentHexes'
import style from './hexStyle.module.css'
import { getImage } from '@/utils/hexlogic/getImage'
import Image from 'next/image'

type HexProps = {
    hex: Hex
    HEXSIZE: number
    adjHexes: AdjacentHexes
}

export default function Hex({ hex, HEXSIZE, adjHexes }: HexProps) {
    const image = getImage(hex);

    return (
        <div style={{
            "--hex-size": `${HEXSIZE}rem`, top: `50% + ${HEXSIZE * hex.position.y}rem`, left: `50% + ${HEXSIZE * hex.position.x}rem`,
        } as React.CSSProperties}
            className={`${style.hexagon} z-50 pointer-events-auto`} >
            <div className='relative h-full w-full point cursor-pointer hover:scale-105 hover:animate-pulse transition-all z-50'>
                <Image src={image} alt={'map tile'} height={(HEXSIZE) * 17} width={(HEXSIZE * (1.732 / 2)) * 17} unoptimized className='w-auto h-full aspect-auto absolute bottom-0 cursor-pointer pointer-events-none z-0' />
            </div>
        </div>
    )
}