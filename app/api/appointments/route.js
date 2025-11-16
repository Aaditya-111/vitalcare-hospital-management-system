import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma.js'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    
    const where = status ? { status } : {}
    
    const appointments = await prisma.appointment.findMany({
      where,
      include: {
        patient: true,
        doctor: true
      },
      orderBy: { createdAt: 'desc' }
    })
    
    return NextResponse.json(appointments)
  } catch (error) {
    console.error('Error fetching appointments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const data = await request.json()
    
    // Create or find patient
    let patient = await prisma.patient.findFirst({
      where: { phone: data.phone }
    })
    
    if (!patient) {
      patient = await prisma.patient.create({
        data: {
          name: data.patientName,
          phone: data.phone
        }
      })
    }
    
    // Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        patientId: patient.id,
        patientName: data.patientName,
        phone: data.phone,
        department: data.department,
        preferredDate: new Date(data.preferredDate),
        preferredTime: data.preferredTime,
        reasonForVisit: data.reasonForVisit,
        status: 'pending'
      },
      include: {
        patient: true
      }
    })
    
    return NextResponse.json(appointment, { status: 201 })
  } catch (error) {
    console.error('Error creating appointment:', error)
    return NextResponse.json(
      { error: 'Failed to create appointment' },
      { status: 500 }
    )
  }
}
