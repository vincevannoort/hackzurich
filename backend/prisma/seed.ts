import { PrismaClient } from '@prisma/client'

async function seed() {
    const prisma = new PrismaClient()
    const users = ['Hidde', 'Vince', 'Casper']

    const group = await prisma.group.create({
        data: {
            name: 'Voorbeeld groep'
        }
    })

    await Promise.all(users.map(user => {
        return prisma.user.create({
            data: {
                name: user,
                groups: {
                    connect: [{
                        id: group.id
                    }]
                },
                alarms: {
                    create: [{
                        message: 'Goedermorgen nerds!',
                        group: {
                            connect: {
                                id: group.id
                            }
                        }
                    }]
                }
            }
        })
    }))

    await prisma.$disconnect()
}

seed()
