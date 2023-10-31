import Hex from "@/models/Hex";
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
        },
        location: {
            type: "none",
            name: "none"
        }
    });

    return new Response(JSON.stringify(hex), { status: 200 })
}

export async function PUT(req: Request, { params }: { params: { userid: string, mapid: string } }) {
    const { userId } = auth();
    if (!userId) return NextResponse.redirect('/sign-in');

    const body = await req.json();
    const { x, y, terrainType, feature, history, location, hexId } = body;

    const hex = await Hex.findOneAndUpdate({ _id: hexId }, {
        position: {
            x,
            y
        },
        terrainType,
        feature,
        history,
        location
    }, { new: true });

    return new Response(JSON.stringify(hex), { status: 200 })
}