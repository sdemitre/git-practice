
import { NextResponse } from 'next/server';
import { getUserProfile } from '@/lib/store';

export async function GET() {
    const profile = getUserProfile();
    return NextResponse.json(profile);
}
