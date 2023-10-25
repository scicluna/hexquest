import Hex from "@/models/Hex";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { userid: string, mapid: string } }) {
    const { userId } = auth();
    if (!userId) return NextResponse.redirect('/sign-in');

    //create a 16 hexes
    const chunk = []
    for (let i = 0; i < 16; i++) {
        chunk.push(await Hex.create({
            mapId: params.mapid,
            history: [],
            terrainType: "?",
            feature: "",
        }))
    }

    return new Response(JSON.stringify(chunk), { status: 200 })
}