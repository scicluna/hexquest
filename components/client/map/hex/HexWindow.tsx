import { AdjacentHexes } from "@/utils/hexlogic/getAdjacentHexes";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Message, useChat } from "ai/react";
import Image, { StaticImageData } from "next/image";
import { useEffect, useRef } from "react";


type HexWindowProps = {
    hex: Hex
    img: StaticImageData
    adjHexes: AdjacentHexes
    updateHistory: (hex: Hex, newHistory: string) => void
    deductCredits: (amount: number) => void
}

export default function HexWindow({ hex, img, adjHexes, updateHistory, deductCredits }: HexWindowProps) {
    const chatContainer = useRef<HTMLDivElement>(null)
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        onFinish: (async (message: Message) => {
            // updateHistory
            // deductCredits
        })
    })

    useEffect(() => {
        if (!chatContainer.current) return;
        const { scrollHeight } = chatContainer.current;
        if (true) {
            chatContainer.current.scrollTo({
                top: scrollHeight,
                behavior: "smooth",
            });
        }
    }, [messages]);

    return (
        <Dialog>
            <DialogTrigger className="h-full w-full text-white" />
            <DialogContent className="h-[40dvh] flex flex-col gap-2 opacity-100">
                <Image className="object-cover opacity-10" src={img} alt={'tile backsplash'} fill unoptimized />
                <div className="flex flex-col">
                    <DialogDescription>Hex: {hex.position.x} {hex.position.y}</DialogDescription>
                    <DialogDescription>Feature: {hex.feature}</DialogDescription>
                </div>
                <div ref={chatContainer} className="h-full bg-black rounded-xl p-2">
                    {hex.history.map((history, i) => (
                        <DialogDescription key={`${hex.position.x}x${hex.position.y}x${i}`} className="border border-b-black border-b-2">{history}</DialogDescription>
                    ))}
                    {messages.map((message, i) => (
                        <div key={message.id} className='flex flex-col p-2 whitespace-pre-wrap'>
                            <DialogDescription className='font-extrabold'>{message.role === 'user' ? 'User: ' : 'AI: '}</DialogDescription>
                            <DialogDescription>{message.content}</DialogDescription>
                        </div>
                    ))}
                </div>
                <form onSubmit={e => {
                    handleSubmit(e, {
                        options: {
                            body: { currentHex: JSON.stringify(hex), adjHexes: JSON.stringify(adjHexes) }
                        }
                    })
                }}
                    className='w-full flex gap-4 justify-center items-center z-50'>
                    <input
                        autoComplete='off'
                        className="border border-gray-300 dark:border-slate-600 rounded shadow-xl p-2 w-1/2 text-black "
                        value={input}
                        onChange={handleInputChange}
                        name="prompt"
                        placeholder='Prompt the AI'
                    />
                    <button className=' bg-purple-600 dark:text-gray-100 dark:bg-purple-950 px-4 py-2 rounded-full hover:bg-purple-500 hover:dark:bg-purple-800' type="submit" disabled={isLoading}>Send</button>
                </form>
            </DialogContent>
        </Dialog >
    )
}