import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

async function main() {
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not Set')
  try {
    const users = await prisma.user.findMany()
    console.log('Total users:', users.length)
    users.forEach(u => {
      console.log(`- Email: ${u.email}, Role: ${u.role}, Has Password: ${!!u.password}`)
    })
  } catch (error) {
    console.error('Error querying database:', error)
  }
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
