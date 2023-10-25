
//refetch user information
//fetch map information
//if no hexes generate a 4x4 chunk and save to db then pass to client component
//if hexes exist, pass to client component

import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import MapClient from "@/components/client/map/MapClient";
import { getUser } from "@/utils/usercrud/getUser";
import { getHexes } from "@/utils/hexcrud/getHexes";
import { generateHexChunk } from "@/utils/hexcrud/generateHexChunk";

type MapProps = {
    params: {
        userid: string
        mapid: string
    }
}

export default async function Map({ params }: MapProps) {
    const { userId } = auth();

    const user: HexUser = await getUser();
    if (!user) redirect('/sign-in');

    if (!userId || user._id !== params.userid) redirect('/sign-in');

    //return hexes or []
    const hexes: Hex[][] | any[] = await getHexes(params.userid, params.mapid);
    if (hexes.length === 0) {
        const chunk: Hex[] = await generateHexChunk(params.userid, params.mapid);
        hexes.push(chunk);
    }

    console.log(hexes)

    return <MapClient user={user} hexes={hexes} />
}