import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Map from "@/models/Map";

// Get all hexes from a map
export async function GET(req: Request, { params }: { params: { userid: string, mapid: string } }) {
    const { userId } = auth();
    if (!userId) return NextResponse.redirect('/sign-in');

    const userid = params.userid
    const mapid = params.mapid

    // Fetch the Map, then populate the hexChunks and the hexes within each HexChunk
    const map = await Map.findOne({ _id: mapid, userId: userid })
        .populate('hexes');

    return new Response(JSON.stringify(map), { status: 200 });
}