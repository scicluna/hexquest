"use client"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useState } from "react"
import { createWorld } from "@/utils/worldcrud/createWorld"
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { PopoverClose } from "@radix-ui/react-popover"

export default function BuildMapForm({ userid }: { userid: string }) {
    const router = useRouter();
    const [mapName, setMapName] = useState("");
    const { getToken } = useAuth();

    async function generateMap(e: React.FormEvent) {
        if (mapName === "") return;
        if (userid === "") return;

        e.preventDefault();
        await createWorld(mapName, userid, getToken)
        setMapName("")
        router.refresh();
    }

    return (
        <div>
            <Popover>
                <PopoverTrigger className="text-blue-500 text-3xl bg-stone-100 p-2 rounded-xl hover:bg-stone-200 hover:animate-pulse">New!</PopoverTrigger>
                <PopoverContent>
                    <form className="flex flex-col p-2 gap-2"
                        onSubmit={generateMap}>
                        <Label>Map Name:</Label>
                        <Input type="text" value={mapName} onChange={e => setMapName(e.target.value)} />
                        <PopoverClose>
                            <Button type="submit">Submit</Button>
                        </PopoverClose>
                    </form>
                </PopoverContent>
            </Popover>
        </div>
    )
}

