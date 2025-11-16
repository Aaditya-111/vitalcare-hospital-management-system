import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma.js'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const ward = searchParams.get('ward')
    const available = searchParams.get('available')
    
    const where = {}
    if (ward) where.ward = ward
    if (available !== null) where.available = available === 'true'
    
    const beds = await prisma.bed.findMany({
      where,
      orderBy: { bedNumber: 'asc' }
    })
    
    return NextResponse.json(beds)
  } catch (error) {
    console.error('Error fetching beds:', error)
    return NextResponse.json(
      { error: 'Failed to fetch beds' },
      { status: 500 }
    )
  }
}
