
import { NextResponse } from 'next/server';
import { resetSystem } from '@/lib/store';

export async function POST() {
    resetSystem();
    return NextResponse.json({ success: true, message: 'User data wiped. Feed reset.' });
}
