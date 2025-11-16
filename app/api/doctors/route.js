import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma.js'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const department = searchParams.get('department')
    
    const where = department ? { department } : {}
    
    const doctors = await prisma.doctor.findMany({
      where,
      orderBy: { name: 'asc' }
    })
    
    return NextResponse.json(doctors)
  } catch (error) {
    console.error('Error fetching doctors:', error)
    return NextResponse.json(
      { error: 'Failed to fetch doctors' },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const data = await request.json()
    
    const doctor = await prisma.doctor.create({
      data
    })
    
    return NextResponse.json(doctor, { status: 201 })
  } catch (error) {
    console.error('Error creating doctor:', error)
    return NextResponse.json(
      { error: 'Failed to create doctor' },
      { status: 500 }
    )
  }
}
