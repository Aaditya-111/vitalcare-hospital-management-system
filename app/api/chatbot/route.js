import { NextResponse } from 'next/server'
import { analyzeMedicalSymptoms } from '../../../lib/huggingface.js'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  return NextResponse.json({ status: 'ok' })
}

export async function POST(request) {
  try {
    if (process.env.NEXT_PHASE === 'phase-production-build') {
      return NextResponse.json({
        response: 'Build phase - chatbot is not available.',
        timestamp: new Date().toISOString()
      })
    }

    const { message } = await request.json()
    
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }
    
    // Analyze symptoms using Hugging Face
    const aiResponse = await analyzeMedicalSymptoms(message)

    const { default: prisma } = await import('../../../lib/prisma.js')

    // Save to chat history
    await prisma.chatHistory.create({
      data: {
        message,
        response: aiResponse,
        symptoms: message
      }
    })
    
    return NextResponse.json({
      response: aiResponse,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error in chatbot:', error)
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    )
  }
}
