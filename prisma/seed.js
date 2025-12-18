const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const prisma = new PrismaClient()

async function main() {
    const hashedPassword = await bcrypt.hash('password123', 10)

    // Create Admin
    const admin = await prisma.user.upsert({
        where: { email: 'admin@vitalcare.com' },
        update: {},
        create: {
            email: 'admin@vitalcare.com',
            name: 'Admin User',
            password: hashedPassword,
            role: 'ADMIN',
        },
    })

    // Create Doctor
    const doctorUser = await prisma.user.upsert({
        where: { email: 'doctor@vitalcare.com' },
        update: {},
        create: {
            email: 'doctor@vitalcare.com',
            name: 'Dr. Sarah Smith',
            password: hashedPassword,
            role: 'DOCTOR',
            doctor: {
                create: {
                    name: 'Dr. Sarah Smith',
                    title: 'Senior Cardiologist',
                    description: 'Specialist in heart health with 10 years experience',
                    department: 'Cardiology',
                    experience: 10,
                    available: true,
                    schedules: {
                        create: [
                            { dayOfWeek: 1, startTime: '09:00', endTime: '17:00' },
                            { dayOfWeek: 2, startTime: '09:00', endTime: '17:00' },
                            { dayOfWeek: 3, startTime: '09:00', endTime: '17:00' },
                            { dayOfWeek: 4, startTime: '09:00', endTime: '17:00' },
                            { dayOfWeek: 5, startTime: '09:00', endTime: '13:00' },
                        ]
                    }
                }
            }
        },
    })

    // Create Patient
    const patientUser = await prisma.user.upsert({
        where: { email: 'patient@vitalcare.com' },
        update: {},
        create: {
            email: 'patient@vitalcare.com',
            name: 'John Doe',
            password: hashedPassword,
            role: 'PATIENT',
            patient: {
                create: {
                    name: 'John Doe',
                    phone: '1234567890',
                    email: 'patient@vitalcare.com',
                    age: 30,
                    gender: 'Male',
                    address: '123 Main St'
                }
            }
        },
    })

    console.log({ admin, doctorUser, patientUser })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
