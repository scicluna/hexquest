import { auth } from "@clerk/nextjs"

export async function getHexes(userId: string, mapId: string) {
    const { getToken } = auth()
    const token = await getToken()

    const hexes = await fetch(`${process.env.URL || ''}/api/maps/${userId}/${mapId}/hexes`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        cache: 'no-cache'
    })

    return hexes.json()
}