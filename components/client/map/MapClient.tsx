"use client"

import { UserButton } from "@clerk/nextjs"
import { useState } from "react"
import HexMap from "./HexMap"

type MapClientProps = {
    user: HexUser
    hexes: HexMap
}

//for every array of hexes, we need a 4x4 grid of hexes
export default function MapClient({ user, hexes }: MapClientProps) {
    const [credits, setCredits] = useState(user.credits);

    function deductCredits(amt: number) {
        setCredits(credits - amt);
        //Some kind of DB call to handle credit change
    }

    return (
        <main className="h-full w-full">
            <div className="fixed top-2 right-2 flex gap-4 items-center dark:text-white">
                {!user.apiKey && <p>Credits: {credits}</p>}
                <UserButton />
            </div>
            <HexMap hexes={hexes} deductCredits={deductCredits} />
        </main>
    )
}