//fetch request to our api route to try and grab our user info
//if it doesn't find it, we build out a user instead

import { auth } from "@clerk/nextjs";

//either way we return the object
export async function updateUserInformation() {
    const { getToken } = auth()
    const token = await getToken()
    const user = await userIsInDatabase(token);

    if (user) {
        return await user
    }

    const newUser = await fetch(`${process.env.URL}/api/user`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    })
    return await newUser.json()
}

async function userIsInDatabase(token: string | null) {
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