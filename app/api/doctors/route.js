import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const doctors = [
      { id: 1, name: 'Dr. Anand patel', specialty: 'Cardiology', available: true },
      { id: 2, name: 'Dr. Ashok singh', specialty: 'Pediatrics', available: true },
      { id: 3, name: 'Dr. C.H Yogesh', specialty: 'Neurology', available: false },
    ];

    return NextResponse.json(doctors, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Error in doctors API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}