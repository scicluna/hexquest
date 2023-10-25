//fetch request to our api route to try and grab our user info
//if it doesn't find it, we build out a user instead

import { auth } from "@clerk/nextjs";
import { getUser } from "./getUser";

//either way we return the object
export async function updateUser() {
    const { getToken } = auth()
    const token = await getToken()
    const user = await getUser();

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