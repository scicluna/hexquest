import Hex from "@/models/Hex";
import HexChunk from "@/models/HexChunk";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { userid: string, mapid: string } }) {
    const { userId } = auth();
    if (!userId) return NextResponse.redirect('/sign-in');

    // Step 1: Create an empty HexChunk
    const hexChunk = await HexChunk.create({
        mapId: params.mapid,
        hexes: [],
    });

    // Step 2: Create 16 hexes and associate them with the HexChunk
    const hexes = [];
    for (let i = 0; i < 16; i++) {
        const hex = await Hex.create({
            hexChunkId: hexChunk._id,  // Reference the created HexChunk
            history: [],
            terrainType: "?",
            feature: "",
        });
        hexes.push(hex);
    }

    // Step 3: Update HexChunk with the created hexes
    hexChunk.hexes = hexes.map(hex => hex._id);
    await hexChunk.save();

    const populatedHexChunk = await HexChunk.findById(hexChunk._id).populate('hexes');

    return new Response(JSON.stringify(populatedHexChunk), { status: 200 })
}