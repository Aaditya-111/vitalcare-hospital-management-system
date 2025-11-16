import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma.js'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    
    const where = type ? { type } : {}
    
    const vaccinations = await prisma.vaccination.findMany({
      where,
      orderBy: { name: 'asc' }
    })
    
    return NextResponse.json(vaccinations)
  } catch (error) {
    console.error('Error fetching vaccinations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch vaccinations' },
      { status: 500 }
    )
  }
}
