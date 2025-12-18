import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "PATIENT") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    const { doctorId, date, time, reason } = await req.json()

    // Find Patient ID
    const patient = await prisma.patient.findUnique({
      where: { userId: session.user.id }
    })

    if (!patient) return NextResponse.json({ message: "Patient profile missing" }, { status: 400 })

    // Create Appointment
    const appointment = await prisma.appointment.create({
      data: {
        patientId: patient.id,
        doctorId,
        patientName: patient.name,
        phone: patient.phone,
        department: "General", // Should fetch from doctor dept or input
        preferredDate: new Date(date),
        preferredTime: time,
        reasonForVisit: reason,
        status: "pending"
      }
    })

    return NextResponse.json(appointment)

  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Error booking" }, { status: 500 })
  }
}