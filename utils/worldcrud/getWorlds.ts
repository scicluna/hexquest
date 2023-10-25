import { auth } from "@clerk/nextjs"

export async function getWorlds(userid: string) {
    const { getToken } = auth();
    const token = await getToken();

    const maps = await fetch(`${process.env.URL}/api/maps/${userid}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })

    return maps.json();
}