import BuildMapForm from "@/components/client/BuildMapForm";
import { getWorlds } from "@/utils/worldcrud/getWorlds";
import { Edit } from "lucide-react";
import Link from "next/link";

//fetch worlds based on userid
//allow crud on worlds
export default async function Worlds({ params }: { params: { userid: string } }) {
    const worlds: HexMap[] = await getWorlds(params.userid);

    return (
        <main className="flex h-[100dvh] w-full justify-center gap-2 p-4 dark:bg-stone-950 dark:text-white">
            {worlds && worlds.length > 0
                ?
                <section className="flex flex-col max-w-sm break-words items-center">
                    <BuildMapForm userid={params.userid} />
                    <div className="flex">
                        <div className="flex flex-col p-4 gap-2 text-2xl font-bold text-center">
                            {worlds.map(map => (
                                <div className="flex gap-2">
                                    <Link key={map._id} href={`${process.env.URL}/worlds/${params.userid}/${map._id}`}>{map.name}</Link>
                                    <Edit />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                :
                <>
                    <p>Create your first world!</p>
                    <BuildMapForm userid={params.userid} />
                </>
            }
        </main>
    )
}