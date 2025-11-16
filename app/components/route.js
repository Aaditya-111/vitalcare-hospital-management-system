import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    
    
    const { patientName, phone, department, preferredDate, preferredTime, reasonForVisit } = body;
    
    if (!patientName || !phone || !department || !preferredDate || !preferredTime || !reasonForVisit) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    
    
    
    console.log('New appointment request:', body);
    
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Appointment request received',
        appointmentId: Date.now() 
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error processing appointment:', error);
    return NextResponse.json(
      { error: 'Failed to process appointment request' },
      { status: 500 }
    );
  }
}


export async function GET(request) {
  try{
    const appointments = []; 
    
    return NextResponse.json({
      success: true,
      appointments
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}