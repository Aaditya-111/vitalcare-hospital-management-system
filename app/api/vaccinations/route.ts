import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createAuditLog } from "@/lib/logger"

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    // Build query based on filters
    const where: any = {};
    if (type) {
      where.type = type;
    }

    const vaccinations = await prisma.vaccination.findMany({
      where,
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json(vaccinations, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error: any) {
    console.error('Error fetching vaccinations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch vaccinations', details: error.message },
      { status: 500 }
    );
  }
}

// POST - Update vaccination stock or create new vaccination
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, type, available, stock, description } = body;

    // Validate required fields
    if (!name || !type) {
      return NextResponse.json(
        { error: 'name and type are required' },
        { status: 400 }
      );
    }

    // Check if vaccination exists
    const existingVaccination = await prisma.vaccination.findFirst({
      where: { name },
    });

    let vaccination: any;
    if (existingVaccination) {
      // Update existing vaccination
      vaccination = await prisma.vaccination.update({
        where: { id: existingVaccination.id },
        data: {
          available: available ?? existingVaccination.available,
          stock: stock ?? existingVaccination.stock,
          description: description ?? existingVaccination.description,
        },
      });
    } else {
      // Create new vaccination
      vaccination = await prisma.vaccination.create({
        data: {
          name,
          type,
          available: available ?? true,
          stock: stock ?? 0,
          description,
        },
      });
    }

    // Create Audit Log
    await createAuditLog({
      action: existingVaccination ? "UPDATE_VACCINATION" : "CREATE_VACCINATION",
      entity: "Vaccination",
      entityId: vaccination.id,
      details: { name, stock, available },
      ipAddress: request.headers.get("x-forwarded-for") || "unknown"
    })

    return NextResponse.json(
      { message: 'Vaccination updated successfully', vaccination },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating vaccination:', error);
    return NextResponse.json(
      { error: 'Failed to update vaccination', details: error.message },
      { status: 500 }
    );
  }
}
