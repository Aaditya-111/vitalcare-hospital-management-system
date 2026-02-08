import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const doctors = await prisma.doctor.findMany({
      select: { id: true, name: true, department: true }
    })
    return NextResponse.json(doctors)
  } catch (e) {
    return NextResponse.json({ message: "Error" }, { status: 500 })
  }
}
