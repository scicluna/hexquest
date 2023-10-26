import { auth } from "@clerk/nextjs"

export async function generateHexChunk(userId: string, mapId: string) {
    const { getToken } = auth()
    const token = await getToken()

    //returns an array of hex objects
    const chunk = await fetch(`${process.env.URL || ''}/api/maps/${userId}/${mapId}/hexchunk`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    console.log(chunk)

    return chunk.json()
}