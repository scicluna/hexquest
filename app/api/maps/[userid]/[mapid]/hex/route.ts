import Hex from "@/models/Hex";
import Map from "@/models/Map";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { userid: string, mapid: string } }) {
    const { userId } = auth();
    if (!userId) return NextResponse.redirect('/sign-in');

    const body = await req.json();

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

export async function PUT(req: Request, { params }: { params: { userid: string, mapid: string } }) {
    const { userId } = auth();
    if (!userId) return NextResponse.redirect('/sign-in');

    const body = await req.json();
    const { x, y, terrainType, feature, history, hexId } = body;

    const hex = await Hex.findOneAndUpdate({ _id: hexId }, {
        position: {
            x,
            y
        },
        terrainType,
        feature,
        history
    }, { new: true });

    return new Response(JSON.stringify(hex), { status: 200 })
}