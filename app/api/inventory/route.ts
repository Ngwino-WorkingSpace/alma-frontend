import { NextResponse } from 'next/server';
import { mockFoodItems } from '@/app/lib/data';

export async function GET() {
    return NextResponse.json(mockFoodItems);
}
