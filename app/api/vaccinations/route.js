import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    // Mock data for now - replace with your actual Prisma query later
    const vaccinations = [
      { id: 1, name: 'COVID-19', type: 'covid', available: true },
      { id: 2, name: 'Flu Shot', type: 'flu', available: true },
      { id: 3, name: 'Hepatitis B', type: 'hepatitis', available: true },
    ];

    // Filter by type if provided
    const filtered = type 
      ? vaccinations.filter(v => v.type === type)
      : vaccinations;

    return NextResponse.json(filtered, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Error fetching vaccinations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch vaccinations' },
      { status: 500 }
    );
  }
}
