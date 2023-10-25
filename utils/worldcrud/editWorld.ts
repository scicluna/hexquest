export async function editWorld(mapId: string, mapName: string, userId: string, getToken: any) {
    const token = await getToken();

    const map = await fetch(`/api/maps/${userId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            mapId: mapId,
            mapName: mapName
        })
    })

    return map.json();
}