import { useAuth } from "@clerk/nextjs";

export async function createWorld(mapName: string, userId: string, getToken: any) {
    const token = await getToken();

    const maps = await fetch(`/api/maps/${userId}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            mapName: mapName
        })
    })

    return maps.json();
}