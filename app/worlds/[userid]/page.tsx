import BuildMapForm from "@/components/client/BuildMapForm";
import EditMapForm from "@/components/client/EditMapForm";
import { getWorlds } from "@/utils/worldcrud/getWorlds";
import { UserButton } from "@clerk/nextjs";
import { Edit } from "lucide-react";
import Link from "next/link";

//fetch worlds based on userid
//allow crud on worlds
export default async function Worlds({ params }: { params: { userid: string } }) {
    const worlds: HexMap[] = await getWorlds(params.userid);

    return (
        <main className="flex h-[100dvh] w-full justify-center gap-2 p-4 dark:bg-stone-950 dark:text-white">
            <div className="fixed top-2 right-2">
                <UserButton />
            </div>
            {worlds && worlds.length > 0
                ?
                <section className="flex flex-col max-w-sm break-words items-center">
                    <BuildMapForm userid={params.userid} />
                    <div className="flex">
                        <div className="flex flex-col p-4 gap-2 text-2xl font-bold text-center">
                            {worlds.map(map => (
                                <div key={map._id} className="flex gap-2 justify-center items-center">
                                    <Link href={`${process.env.URL}/worlds/${params.userid}/${map._id}`}>{map.name}</Link>
                                    <EditMapForm userId={params.userid} map={map} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                :
                <div className="h-fit flex items-center gap-2">
                    <p>Create your first world!</p>
                    <BuildMapForm userid={params.userid} />
                </div>
            }
        </main>
    )
}