import { AdjacentHexes } from "@/utils/hexlogic/getAdjacentHexes";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Image, { StaticImageData } from "next/image";


type HexWindowProps = {
    hex: Hex
    img: StaticImageData
    adjHexes: AdjacentHexes
}

export default function HexWindow({ hex, img, adjHexes }: HexWindowProps) {
    return (
        <Dialog>
            <DialogTrigger className="h-full w-full text-white" />
            <DialogContent>
                <Image className="object-cover opacity-10" src={img} alt={'tile backsplash'} fill unoptimized />
                <DialogHeader>
                    <DialogDescription>
                        <p>Hex: {hex.position.x} {hex.position.y}</p>
                        <p>Feature: {hex.feature}</p>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}