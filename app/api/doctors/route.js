import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const department = searchParams.get('department');

    // Build query based on filters
    const where = {};
    if (department) {
      where.department = department;
    }

    const doctors = await prisma.doctor.findMany({
      where,
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json(doctors, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Error in doctors API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch doctors', details: error.message },
      { status: 500 }
    );
  }
}