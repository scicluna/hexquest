import Hex from "@/models/Hex";
import Map from "@/models/Map";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { userid: string, mapid: string } }) {
    const body = await req.json();

    const { userId } = auth();
    if (!userId) return NextResponse.redirect('/sign-in');

    const hex = await Hex.create({
        mapId: params.mapid,
        history: [],
        terrainType: "?",
        feature: "",
        position: {
            x: body.x,
            y: body.y
        }
    });

    return new Response(JSON.stringify(hex), { status: 200 })
}