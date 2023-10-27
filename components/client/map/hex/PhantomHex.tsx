import style from './hexPhantomStyle.module.css'

type HexProps = {
    hex: { position: { x: number, y: number } }
    HEXSIZE: number
    addHex: (coords: { x: number, y: number }) => void
}

export default function PhantomHex({ hex, HEXSIZE, addHex }: HexProps) {
    const top = `50% + ${HEXSIZE * hex.position.y * 1.5}`
    const left = `50% + ${HEXSIZE * hex.position.x * .5 * 1.732}`

    return (
        <div style={{
            "--hex-size": `${HEXSIZE}rem`,
            top: `calc(${top}rem)`,
            left: `calc(${left}rem)`,
        } as React.CSSProperties}
            className={`${style.hexagon} z-50 pointer-events-auto absolute`}
            onClick={() => addHex(hex.position)}>
        </div>
    )
}