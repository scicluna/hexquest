import { auth } from "@clerk/nextjs"

export async function getUser() {
    const { getToken } = auth()
    const token = await getToken()

    try {
        const user = await fetch(`${process.env.URL}/api/user`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        if (user) {
            return await user.json()
        } else {
            return null
        }
    } catch {
        return null
    }
}