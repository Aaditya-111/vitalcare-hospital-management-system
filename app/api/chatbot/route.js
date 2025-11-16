import { NextResponse } from 'next/server'
import { analyzeMedicalSymptoms } from '../../../lib/huggingface.js'
import prisma from '../../../lib/prisma.js'

export async function POST(request) {
  try {
    const { message } = await request.json()
    
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }
    
    // Analyze symptoms using Hugging Face
    const aiResponse = await analyzeMedicalSymptoms(message)
    
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
