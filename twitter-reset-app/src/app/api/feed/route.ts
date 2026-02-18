
import { NextResponse } from 'next/server';
import { getFeed } from '@/lib/store';

export async function GET() {
    const feed = getFeed();
    return NextResponse.json(feed);
}
