export async function deleteWorld(mapId: string, userId: string, getToken: any) {
    const token = await getToken();

    const map = await fetch(`/api/maps/${userId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            mapId: mapId,
        })
    })

    return map.json();
}