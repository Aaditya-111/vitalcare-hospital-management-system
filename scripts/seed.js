const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing data
  await prisma.chatHistory.deleteMany()
  await prisma.appointment.deleteMany()
  await prisma.vaccination.deleteMany()
  await prisma.bed.deleteMany()
  await prisma.patient.deleteMany()
  await prisma.doctor.deleteMany()

  // Seed Doctors
  console.log('👨‍⚕️ Seeding doctors...')
  const doctors = [
    { name: 'Dr. Rajesh Kumar', title: 'Senior Cardiologist', description: '15 years of experience in interventional cardiology and heart disease management.', department: 'cardiology', experience: 15 },
    { name: 'Dr. Priya Sharma', title: 'Cardiac Surgeon', description: 'Specialist in bypass surgery and valve replacement procedures.', department: 'cardiology', experience: 12 },
    { name: 'Dr. Amit Patel', title: 'Cardiologist', description: 'Expert in preventive cardiology and heart failure treatment.', department: 'cardiology', experience: 10 },
    { name: 'Dr. Vikram Singh', title: 'Senior Neurologist', description: 'Specialist in stroke management and neurological disorders.', department: 'neurology', experience: 18 },
    { name: 'Dr. Anjali Desai', title: 'Neurosurgeon', description: 'Expert in brain and spine surgery with 12 years experience.', department: 'neurology', experience: 12 },
    { name: 'Dr. Arjun Reddy', title: 'Neurologist', description: 'Focuses on epilepsy, Parkinson\'s, and movement disorders.', department: 'neurology', experience: 8 },
    { name: 'Dr. Kavita Iyer', title: 'General Physician', description: 'Primary care specialist for routine checkups and general health.', department: 'opd', experience: 10 },
    { name: 'Dr. Rahul Mehta', title: 'Family Medicine', description: 'Comprehensive care for patients of all ages.', department: 'opd', experience: 9 },
    { name: 'Dr. Sneha Gupta', title: 'Internal Medicine', description: 'Expert in adult medicine and chronic disease management.', department: 'opd', experience: 11 },
    { name: 'Dr. Sanjay Verma', title: 'ENT Specialist', description: 'Expert in ear, nose, and throat disorders and surgeries.', department: 'ent', experience: 14 },
    { name: 'Dr. Meera Nair', title: 'ENT Surgeon', description: 'Specialist in sinus surgery and hearing restoration.', department: 'ent', experience: 10 },
    { name: 'Dr. Karan Malhotra', title: 'ENT Consultant', description: 'Focuses on voice disorders and throat conditions.', department: 'ent', experience: 7 },
    { name: 'Dr. Aditya Joshi', title: 'General Surgeon', description: 'Expert in laparoscopic and minimally invasive surgery.', department: 'surgery', experience: 16 },
    { name: 'Dr. Pooja Kapoor', title: 'Trauma Surgeon', description: 'Specialist in emergency and trauma surgical procedures.', department: 'surgery', experience: 13 },
    { name: 'Dr. Rohan Chopra', title: 'Surgical Consultant', description: 'Advanced surgical techniques and post-operative care.', department: 'surgery', experience: 11 },
  ]

  for (const doctor of doctors) {
    await prisma.doctor.create({ data: doctor })
  }
  console.log(`✅ Created ${doctors.length} doctors`)

  // Seed Beds
  console.log('🛏️ Seeding beds...')
  const beds = [
    { bedNumber: 'Ward A - 101', ward: 'A', bedType: 'General', available: true },
    { bedNumber: 'Ward A - 102', ward: 'A', bedType: 'General', available: false },
    { bedNumber: 'Ward A - 103', ward: 'A', bedType: 'General', available: true },
    { bedNumber: 'Ward A - 104', ward: 'A', bedType: 'General', available: true },
    { bedNumber: 'Ward A - 105', ward: 'A', bedType: 'General', available: false },
    { bedNumber: 'Ward A - 106', ward: 'A', bedType: 'General', available: true },
    { bedNumber: 'Ward B - 201', ward: 'B', bedType: 'General', available: false },
    { bedNumber: 'Ward B - 202', ward: 'B', bedType: 'General', available: true },
    { bedNumber: 'Ward B - 203', ward: 'B', bedType: 'General', available: false },
    { bedNumber: 'Ward B - 204', ward: 'B', bedType: 'General', available: true },
    { bedNumber: 'Ward B - 205', ward: 'B', bedType: 'General', available: true },
    { bedNumber: 'Ward B - 206', ward: 'B', bedType: 'General', available: false },
    { bedNumber: 'ICU - 01', ward: 'ICU', bedType: 'ICU', available: false },
    { bedNumber: 'ICU - 02', ward: 'ICU', bedType: 'ICU', available: false },
    { bedNumber: 'ICU - 03', ward: 'ICU', bedType: 'ICU', available: true },
    { bedNumber: 'ICU - 04', ward: 'ICU', bedType: 'ICU', available: false },
    { bedNumber: 'ICU - 05', ward: 'ICU', bedType: 'ICU', available: true },
    { bedNumber: 'ICU - 06', ward: 'ICU', bedType: 'ICU', available: false },
    { bedNumber: 'Emergency - E1', ward: 'Emergency', bedType: 'Emergency', available: true },
    { bedNumber: 'Emergency - E2', ward: 'Emergency', bedType: 'Emergency', available: true },
    { bedNumber: 'Emergency - E3', ward: 'Emergency', bedType: 'Emergency', available: false },
    { bedNumber: 'Emergency - E4', ward: 'Emergency', bedType: 'Emergency', available: true },
  ]

  for (const bed of beds) {
    await prisma.bed.create({ data: bed })
  }
  console.log(`✅ Created ${beds.length} beds`)

  // Seed Vaccinations
  console.log('💉 Seeding vaccinations...')
  const vaccinations = [
    { name: 'BCG', type: 'routine', available: true, stock: 50, description: 'For tuberculosis prevention (newborns)' },
    { name: 'Hepatitis B', type: 'routine', available: true, stock: 45, description: 'Birth dose for hepatitis B' },
    { name: 'OPV (Polio)', type: 'routine', available: true, stock: 60, description: 'Oral polio vaccine' },
    { name: 'DPT', type: 'routine', available: true, stock: 40, description: 'Diphtheria, Pertussis, Tetanus' },
    { name: 'MMR', type: 'routine', available: true, stock: 35, description: 'Measles, Mumps, Rubella' },
    { name: 'Rotavirus', type: 'routine', available: false, stock: 0, description: 'For diarrhea prevention' },
    { name: 'Anti-Rabies', type: 'emergency', available: true, stock: 20, description: 'For dog/animal bites' },
    { name: 'Anti-Venom', type: 'emergency', available: false, stock: 0, description: 'For snake bites' },
  ]

  for (const vaccine of vaccinations) {
    await prisma.vaccination.create({ data: vaccine })
  }
  console.log(`✅ Created ${vaccinations.length} vaccinations`)

  console.log('\n🎉 Database seeded successfully!')
  console.log('\n📊 Summary:')
  console.log(`   Doctors: ${doctors.length}`)
  console.log(`   Beds: ${beds.length}`)
  console.log(`   Vaccinations: ${vaccinations.length}`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
