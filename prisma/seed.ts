import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.organization.upsert({
    where: { name: 'Bor Corp' },
    update: {},
    create: {
      name: 'Bor Corp',
    },
  })

  await prisma.organization.upsert({
    where: { name: 'Chem Ltd' },
    update: {},
    create: {
      name: 'Chem Ltd',
    },
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
