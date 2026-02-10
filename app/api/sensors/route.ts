import { NextResponse } from 'next/server';
import { mockSensors } from '@/app/lib/data';

export async function GET() {
    return NextResponse.json(mockSensors);
}
