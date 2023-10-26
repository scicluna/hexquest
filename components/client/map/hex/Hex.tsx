import { AdjacentHexes } from '@/utils/hexlogic/getAdjacentHexes'
import style from './hexStyle.module.css'
import { getImage } from '@/utils/hexlogic/getImage'
import Image from 'next/image'

type HexProps = {
    hex: Hex
    pos: number
    chunkNo: number
    hexSize: number
    chunkSize: number
    adjHexes: AdjacentHexes
}

export default function Hex({ hex, pos, chunkNo, chunkSize, hexSize, adjHexes }: HexProps) {
    const image = getImage(hex);

    return (
        <div style={{
            "--hex-size": `${hexSize}rem`, marginBottom: `${-hexSize * .25}rem`,
            marginLeft: `${Math.floor(pos / chunkSize) % 2 === 0 ? hexSize * (1.732 / 2 / 2) : 0}rem`,
            marginRight: `${Math.floor(pos / chunkSize) % 2 === 0 ? -hexSize * (1.732 / 2 / 2) : 0}rem`
        } as React.CSSProperties}
            className={`relative ${style.hexagon}`} >
            <div className='relative h-full w-full point cursor-pointer hover:scale-105 hover:animate-pulse transition-all'>
                <Image src={image} alt={'map tile'} height={(hexSize) * 17} width={(hexSize * (1.732 / 2)) * 17} unoptimized className='w-auto h-full aspect-auto absolute bottom-0 cursor-pointer pointer-events-none' />
            </div>
        </div>
    )
}