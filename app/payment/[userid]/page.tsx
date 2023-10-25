import PriceGallery from "@/components/server/PriceGallery";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default async function Payment({ params }: { params: { userid: string } }) {

    return (
        <main className="h-[100dvh] dark:bg-stone-950 w-full flex justify-center items-center relative">
            <div className="fixed top-2 right-2">
                <UserButton />
            </div>
            <section className="flex flex-col gap-4 dark:text-white">
                <PriceGallery />
                <p className="text-center">or enter your own key</p>
                <form className="flex items-center">
                    <Label>OpenAI API Key</Label>
                    <Input className="mx-4" name="apikey" type="text" />
                    <Button type="submit">Submit</Button>
                </form>
                <p className="text-center dark:text-stone-800">I hash and save your API key for future use. If you don't trust me, stick to stripe payments or review my <Link target="_blank" href={'https://github.com/scicluna/hexquest'} className="text-blue-500 hover:animate-pulse">github</Link>.</p>
            </section>
            <Link className="fixed bottom-2 right-2 text-sm hover:animate-pulse dark:text-white" href={`/worlds/${params.userid}`}>Continue Without Paying</Link>
        </main>
    )
}