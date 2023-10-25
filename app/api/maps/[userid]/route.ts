import Map from "@/models/Map";
import { connectToDB } from "@/utils/database";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { userid: string } }) {
    connectToDB();
    const { userId } = auth();
    if (!userId) return NextResponse.redirect('/sign-in');

    const userid = params.userid
    const maps = await Map.find({ userId: userid })

    return new Response(JSON.stringify(maps), { status: 200 })
}

export async function POST(req: Request, { params }: { params: { userid: string } }) {
    connectToDB();
    const { userId } = auth();
    if (!userId) return NextResponse.redirect('/sign-in');

    const userid = params.userid
    const { mapName } = await req.json()

    const map = await Map.create({
        userId: userid,
        name: mapName,
        hexes: []
    })

    return new Response(JSON.stringify(map), { status: 200 })
}