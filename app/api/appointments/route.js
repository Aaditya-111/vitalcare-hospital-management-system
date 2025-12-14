import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET - Fetch appointments
export async function GET(request) {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        patient: true,
        doctor: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(appointments, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}

// POST - Create new appointment
export async function POST(request) {
  try {
    const body = await request.json();
    const { patientName, phone, department, preferredDate, preferredTime, reasonForVisit } = body;

    // Validate required fields
    if (!patientName || !phone || !department || !preferredDate || !preferredTime || !reasonForVisit) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // First, create or find the patient
    let patient = await prisma.patient.findFirst({
      where: { phone: phone }
    });

    if (!patient) {
      patient = await prisma.patient.create({
        data: {
          name: patientName,
          phone: phone,
        }
      });
    }

    // Find an available doctor in the requested department
    const doctor = await prisma.doctor.findFirst({
      where: {
        department: department,
        available: true,
      }
    });

    // Create the appointment
    const appointment = await prisma.appointment.create({
      data: {
        patientId: patient.id,
        doctorId: doctor?.id || null,
        patientName: patientName,
        phone: phone,
        department: department,
        preferredDate: new Date(preferredDate),
        preferredTime: preferredTime,
        reasonForVisit: reasonForVisit,
        status: 'pending',
      },
      include: {
        patient: true,
        doctor: true,
      }
    });

    return NextResponse.json(
      {
        message: 'Appointment created successfully',
        appointment
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating appointment:', error);
    return NextResponse.json(
      { error: 'Failed to create appointment', details: error.message },
      { status: 500 }
    );
  }
}