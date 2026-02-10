import { NextResponse } from 'next/server';
import { mockAlerts } from '@/app/lib/data';

export async function GET() {
    return NextResponse.json(mockAlerts);
}
