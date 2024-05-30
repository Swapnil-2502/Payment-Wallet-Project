import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";
const prisma = new PrismaClient()

async function main() {
  const Priya = await prisma.user.upsert({
    where: { number: '999' },
    update: {},
    create: {
      number: '999',
      password: await bcrypt.hash('999',10),
      name: "Priya",
      Balance: {
        create: {
            amount: 1000,
            locked: 0
        }
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 1000,
          token: "128",
          provider: "HDFC Bank",
        },
      },
    },
  })
  // const bob = await prisma.user.upsert({
  //   where: { number: '9999999998' },
  //   update: {},
  //   create: {
  //     number: '9999999998',
  //     password: await bcrypt.hash('alice',10),
  //     name: 'bob',
  //     OnRampTransaction: {
  //       create: {
  //         startTime: new Date(),
  //         status: "Failure",
  //         amount: 2000,
  //         token: "123",
  //         provider: "HDFC Bank",
  //       },
  //     },
  //   },
  // })
  console.log({ Priya })
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