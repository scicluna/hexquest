import { useAuth } from "@clerk/nextjs"

export async function generateHexChunkClient(userId: string, mapId: string, x: number, y: number, token: string | null) {

    if (!token) {
        console.error("INVALID TOKEN")
    }
    //returns an array of hex objects
    const chunk = await fetch(`${process.env.URL || ''}/api/maps/${userId}/${mapId}/hexchunk`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    console.log(chunk)

    return chunk.json()
}