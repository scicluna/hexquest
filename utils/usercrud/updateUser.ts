'use server'
//fetch request to our api route to try and grab our user info
//if it doesn't find it, we build out a user instead

import { auth } from "@clerk/nextjs";
import { getUser } from "./getUser";

//either way we return the object
export async function updateUser(hexUser: HexUser) {
    console.log("HERE")
    const { getToken } = auth()
    const token = await getToken()
    const user = await getUser();

    if (!user) {
        return await user
    }

    const newUser = await fetch(`${process.env.URL}/api/user`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: hexUser._id, email: hexUser.email, credits: hexUser.credits, apiKey: hexUser.apiKey })
    })
    return await newUser.json()
}