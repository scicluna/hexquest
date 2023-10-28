import { auth, currentUser } from '@clerk/nextjs';
import { connectToDB } from '@/utils/database';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET() {
    connectToDB();
    const { userId } = auth();
    if (!userId) return NextResponse.redirect('/sign-in');
    const user = await User.findOne({ clerkId: userId })

    return new Response(JSON.stringify(user), { status: 200 })
}

export async function POST() {
    connectToDB();
    const { userId } = auth();
    if (!userId) return NextResponse.redirect('/sign-in');

    const clerkUser = await currentUser();
    const newUser = await User.create({
        clerkId: userId,
        email: clerkUser?.emailAddresses[0].emailAddress,
        credits: 0
    })

    return new Response(JSON.stringify(newUser), { status: 200 })
}

export async function PUT(req: Request) {
    connectToDB();
    const { userId } = auth();
    if (!userId) return NextResponse.redirect('/sign-in');

    const body = await req.json();
    const { id, email, credits, apiKey } = body;

    const user = await User.findByIdAndUpdate(id, {
        email,
        credits,
        apiKey
    }, { new: true });

    return new Response(JSON.stringify(user), { status: 200 })
}