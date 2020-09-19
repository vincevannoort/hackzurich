import { PrismaClient } from '@prisma/client'

async function seed() {
    const prisma = new PrismaClient()
    const userNames = ['Hidde', 'Vince', 'Casper']
    const groupNames = ['The young wokers', 'Sunday mornay yoga', 'Without coffee i\'m worthless']

    const groups = await Promise.all(groupNames.map(group => {
        return prisma.group.create({
            data: {
                name: group,
            }
        })
    }))

    await Promise.all(userNames.map(user => {
        return prisma.user.create({
            data: {
                name: user,
                groups: {
                    connect: groups.map(group => ({ id: group.id }))
                },
                alarms: {
                    create: [{
                        message: 'Goedermorgen nerds!',
                        group: {
                            connect: {
                                id: groups[0].id
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
