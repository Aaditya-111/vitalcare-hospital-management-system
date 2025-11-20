import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Your bed data - replace with your actual data source
    const beds = [
      { id: 1, type: 'ICU', available: 5, total: 10 },
      { id: 2, type: 'General', available: 15, total: 30 },
      { id: 3, type: 'Emergency', available: 8, total: 20 }
    ];

    return NextResponse.json(beds);
  } catch (error) {
    console.error('Error fetching beds:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bed data' },
      { status: 500 }
    );
  }
}