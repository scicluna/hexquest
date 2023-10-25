import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Map from "@/models/Map";

//get all hexes from a map
export async function GET(req: Request, { params }: { params: { userid: string, mapid: string } }) {
    const { userId } = auth();
    if (!userId) return NextResponse.redirect('/sign-in');

    const userid = params.userid
    const mapid = params.mapid

    const map = await Map.findOne({ _id: mapid, userId: userid })

    return new Response(JSON.stringify(map.hexes), { status: 200 })
}