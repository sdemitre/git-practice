
import { NextResponse } from 'next/server';
import { recordInteraction } from '@/lib/store';

export async function POST(request: Request) {
    const body = await request.json();
    const { postId, type } = body;

    if (!postId || !type) {
        return NextResponse.json({ error: 'Missing postId or type' }, { status: 400 });
    }

    recordInteraction(postId, type);
    return NextResponse.json({ success: true });
}
