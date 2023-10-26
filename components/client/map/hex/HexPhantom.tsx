import style from './hexPhantomStyle.module.css'

type HexPhantomProps = {
    pos: number
    hexSize: number
    chunkSize: number
    visible: boolean
}

export default function HexPhantom({ pos, hexSize, chunkSize, visible }: HexPhantomProps) {
    return (
        <div style={{
            "--hex-size": `${hexSize}rem`, marginBottom: `${-hexSize * .25}rem`,
            marginLeft: `${Math.floor(pos / chunkSize) % 2 === 0 ? hexSize * (1.732 / 2 / 2) : 0}rem`,
            marginRight: `${Math.floor(pos / chunkSize) % 2 === 0 ? -hexSize * (1.732 / 2 / 2) : 0}rem`
        } as React.CSSProperties}
            className={` ${style.hexagon} ${visible ? 'visible z-50' : 'invisible -z-10'}`} >
        </div>
    )
}