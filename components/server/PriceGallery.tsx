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
                    <p>100 credits</p>
                </CardContent>
                <CardFooter>
                    <p>$5</p>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Adventurer</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>300 credits</p>
                </CardContent>
                <CardFooter>
                    <p>$12.50</p>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Legend</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>500 credits</p>
                </CardContent>
                <CardFooter>
                    <p>$22.00</p>
                </CardFooter>
            </Card>
        </div>
    )
}