// import { generateHexChunk } from '@/utils/hexcrud/generateHex'
// import style from './hexPhantomStyle.module.css'
// import { generateHexChunkClient } from '@/utils/hexcrud/generateHexChunkClient'
// import { useAuth } from '@clerk/nextjs'

// type HexPhantomProps = {
//     user: HexUser
//     mapid: string
//     hexDirection: string
//     pos: number
//     hexSize: number
//     chunkSize: number
//     visible: boolean
//     currChunk: HexChunk
//     addHexChunk: (hexChunk: HexChunk) => void
// }

// export default function HexPhantom({ user, mapid, hexDirection, pos, hexSize, chunkSize, visible, currChunk, addHexChunk }: HexPhantomProps) {
//     const { getToken } = useAuth();

//     async function newHexChunk() {
//         let newY = currChunk.position.y
//         let newX = currChunk.position.x

//         switch (hexDirection) {
//             case 'Top':
//                 newY = currChunk.position.y - 1;
//                 break;
//             case 'Bottom':
//                 newY = currChunk.position.y + 1;
//                 break;
//             case 'Left':
//                 newX = currChunk.position.x - 1;
//                 break;
//             case 'Right':
//                 newX = currChunk.position.x + 1;
//                 break;
//         }

//         const newChunk = await generateHexChunkClient(user._id, mapid, newX, newY, await getToken());
//         addHexChunk(newChunk);
//     }


//     return (
//         <div style={{
//             "--hex-size": `${hexSize}rem`, marginBottom: `${-hexSize * .25}rem`,
//             marginLeft: `${Math.floor(pos / chunkSize) % 2 === 0 ? hexSize * (1.732 / 2 / 2) : 0}rem`,
//             marginRight: `${Math.floor(pos / chunkSize) % 2 === 0 ? -hexSize * (1.732 / 2 / 2) : 0}rem`
//         } as React.CSSProperties}
//             className={` ${style.hexagon} ${visible ? 'visible z-50' : 'invisible -z-50'} pointer-events-auto`}
//             onClick={newHexChunk}>
//         </div>
//     )
// }