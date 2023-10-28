import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function PriceGallery() {
    return (
        <div className="grid grid-cols-3 gap-2">
            <Card>
                <CardHeader>
                    <CardTitle>Novice</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>100 credits (or 100 prompts)</p>
                </CardContent>
                <CardFooter>
                    <p>$10</p>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Adventurer</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>300 credits</p> (or 300 prompts)
                </CardContent>
                <CardFooter>
                    <p>$28</p>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Legend</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>500 credits</p> (or 500 prompts)
                </CardContent>
                <CardFooter>
                    <p>$45</p>
                </CardFooter>
            </Card>
        </div>
    )
}