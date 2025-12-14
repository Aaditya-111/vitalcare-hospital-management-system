import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const ward = searchParams.get('ward');
    const bedType = searchParams.get('bedType');

    // Build query based on filters
    const where = {};
    if (ward) {
      where.ward = ward;
    }
    if (bedType) {
      where.bedType = bedType;
    }

    // Get all beds with filtering
    const beds = await prisma.bed.findMany({
      where,
      orderBy: {
        bedNumber: 'asc',
      },
    });

    // Calculate summary statistics
    const summary = beds.reduce((acc, bed) => {
      const wardKey = bed.ward;
      if (!acc[wardKey]) {
        acc[wardKey] = { total: 0, available: 0, occupied: 0 };
      }
      acc[wardKey].total++;
      if (bed.available) {
        acc[wardKey].available++;
      } else {
        acc[wardKey].occupied++;
      }
      return acc;
    }, {});

    return NextResponse.json({
      beds,
      summary,
      totalBeds: beds.length,
      availableBeds: beds.filter(b => b.available).length,
      occupiedBeds: beds.filter(b => !b.available).length,
    }, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Error fetching beds:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bed data', details: error.message },
      { status: 500 }
    );
  }
}

// POST - Update bed availability or create new bed
export async function POST(request) {
  try {
    const body = await request.json();
    const { bedNumber, ward, bedType, available, patientName } = body;

    // Validate required fields
    if (!bedNumber || !ward || !bedType) {
      return NextResponse.json(
        { error: 'bedNumber, ward, and bedType are required' },
        { status: 400 }
      );
    }

    // Check if bed exists
    const existingBed = await prisma.bed.findUnique({
      where: { bedNumber },
    });

    let bed;
    if (existingBed) {
      // Update existing bed
      bed = await prisma.bed.update({
        where: { bedNumber },
        data: {
          available: available ?? existingBed.available,
          patientName: available === false ? patientName : null,
          admittedAt: available === false ? new Date() : null,
        },
      });
    } else {
      // Create new bed
      bed = await prisma.bed.create({
        data: {
          bedNumber,
          ward,
          bedType,
          available: available ?? true,
          patientName: available === false ? patientName : null,
          admittedAt: available === false ? new Date() : null,
        },
      });
    }

    return NextResponse.json(
      { message: 'Bed updated successfully', bed },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating bed:', error);
    return NextResponse.json(
      { error: 'Failed to update bed', details: error.message },
      { status: 500 }
    );
  }
}