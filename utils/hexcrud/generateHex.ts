import { auth } from "@clerk/nextjs"

export async function generateHex(userId: string, mapId: string, x: number, y: number) {
    const { getToken } = auth()
    const token = await getToken()

    //returns an array of hex objects
    const hex = await fetch(`${process.env.URL || ''}/api/maps/${userId}/${mapId}/hex`, {
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

    return hex.json()
}