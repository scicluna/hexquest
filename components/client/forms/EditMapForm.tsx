"use client"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "../../ui/label"
import { Input } from "../../ui/input"
import { Button } from "../../ui/button"
import { useState } from "react"
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { PopoverClose } from "@radix-ui/react-popover"
import { Edit } from "lucide-react"
import { editWorld } from "@/utils/worldcrud/editWorld"
import { deleteWorld } from "@/utils/worldcrud/deleteWorld"

type EditMapFormProps = {
    userId: string;
    map: HexMap;
}

export default function EditMapForm({ userId, map }: EditMapFormProps) {
    const router = useRouter();
    const [mapName, setMapName] = useState(map.name);
    const { getToken } = useAuth();

    async function editMap(e: React.FormEvent) {
        if (mapName === "") return;
        if (userId === "") return;

        e.preventDefault();
        await editWorld(map._id, mapName, userId, getToken)
        router.refresh();
    }

    async function deleteMap() {
        await deleteWorld(map._id, userId, getToken)
        setMapName("");
        router.refresh();
    }

    return (
        <div>
            <Popover>
                <PopoverTrigger className="text-blue-500 text-3xl p-2 rounded-xl hover:animate-pulse"><Edit /></PopoverTrigger>
                <PopoverContent>
                    <form className="flex flex-col p-2 gap-2"
                        onSubmit={editMap}>
                        <Label>Map Name:</Label>
                        <Input type="text" value={mapName} onChange={e => setMapName(e.target.value)} />
                        <div className="flex gap-2 justify-center">
                            <PopoverClose className="bg-stone-100 p-2 rounded-xl text-blue-500 hover:bg-stone-200 hover:animate-pulse" type="submit">Submit</PopoverClose>
                            <PopoverClose className="bg-stone-100 p-2 rounded-xl text-blue-500 hover:bg-stone-200 hover:animate-pulse" type="button" onClick={deleteMap}>Delete</PopoverClose>
                        </div>
                    </form>
                </PopoverContent>
            </Popover>
        </div>
    )
}

