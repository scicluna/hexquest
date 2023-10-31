import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { getLocationImage } from "@/utils/hexlogic/getImage";
import Image from "next/image";

export default function HexIcon({ iconName, iconType }: { iconName: string, iconType: string }) {
    const image = getLocationImage(iconType);
    if (image === null) return null;

    return (
        <div className="bottom-1/2 left-1/2 h-16 w-16 absolute -translate-x-1/2 translate-y-1/2 z-50 pointer-events-none">
            <Image src={image} alt={"Location Image"} fill />
        </div>
    )
}