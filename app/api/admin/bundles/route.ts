import { NextResponse } from 'next/server';
import bundlesData from '@/data/bundles.json';

export async function GET() {
  return NextResponse.json(bundlesData, {
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}
