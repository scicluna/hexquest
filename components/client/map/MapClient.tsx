"use client"

import { UserButton } from "@clerk/nextjs"
import { useState } from "react"
import HexMap from "./HexMap"
import { updateUser } from "@/utils/usercrud/updateUser"

type MapClientProps = {
    user: HexUser
    mapid: string
    hexMap: HexMap
}

export default function MapClient({ user, mapid, hexMap }: MapClientProps) {
    const [credits, setCredits] = useState(user.credits);

    async function deductCredits(amt: number) {
        setCredits(credits - amt);
        user.credits = user.credits - amt;
        await updateUser(user);
    }

    return (
        <main className="">
            <div className="fixed top-2 right-2 flex gap-4 items-center dark:text-white z-50">
                {!user.apiKey && <p>Credits: {credits}</p>}
                <UserButton />
            </div>
            <HexMap hexUser={user} mapid={mapid} hexMap={hexMap} deductCredits={deductCredits} />
        </main>
    )
}