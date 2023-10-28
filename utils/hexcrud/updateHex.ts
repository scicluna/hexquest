'use server'
import { auth } from "@clerk/nextjs"

export async function updateHex(userId: string, mapId: string, hexId: string, updatedHex: Hex) {
    const { getToken } = auth()
    const token = await getToken()

    const hex = await fetch(`${process.env.URL || ''}/api/maps/${userId}/${mapId}/hex`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            x: updatedHex.position.x,
            y: updatedHex.position.y,
            terrainType: updatedHex.terrainType,
            feature: updatedHex.feature,
            history: updatedHex.history,
            hexId: hexId
        })
    })

    return hex.json()
}