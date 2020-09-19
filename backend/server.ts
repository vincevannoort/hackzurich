import { asNexusMethod, makeSchema, mutationType, objectType, queryType } from '@nexus/schema'
import { PrismaClient } from '@prisma/client'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { DateTimeResolver, JSONObjectResolver } from 'graphql-scalars'
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema'
import * as path from 'path'

const prisma = new PrismaClient()

const apollo = new ApolloServer({
    context: () => ({ prisma }),
    schema: makeSchema({
        typegenAutoConfig: {
            contextType: '{ prisma: PrismaClient.PrismaClient }',
            sources: [{ source: '.prisma/client', alias: 'PrismaClient' }],
        },
        outputs: {
            typegen: path.join(__dirname, 'node_modules/@types/nexus-typegen/index.d.ts'),
            schema: path.join(__dirname, './api.graphql'),
        },
        plugins: [
            nexusSchemaPrisma({
                experimentalCRUD: true,
            }),
        ],
        types: [
            asNexusMethod(JSONObjectResolver, 'json'),
            asNexusMethod(DateTimeResolver, 'date'),
            queryType({
                definition(t) {
                    t.crud.user()
                    t.crud.users({ ordering: true })
                    t.crud.group()
                    t.crud.groups({ filtering: true })
                    t.crud.alarm()
                    t.crud.alarm({ filtering: true })
                },
            }),
            mutationType({
                definition(t) {
                    t.crud.updateOneUser()
                    t.crud.createOneUser()
                    t.crud.createOneGroup()
                    t.crud.createOneAlarm()
                },
            }),
            objectType({
                name: 'User',
                definition(t) {
                    t.model.id()
                    t.model.name()
                    t.model.groups()
                    t.model.alarms()
                    t.model.wakeUpGroup()
                },
            }),
            objectType({
                name: 'Group',
                definition(t) {
                    t.model.id()
                    t.model.name()
                    t.model.users()
                    t.model.alarms()
                },
            }),
            objectType({
                name: 'Alarm',
                definition(t) {
                    t.model.id()
                    t.model.group()
                    t.model.user()
                    t.model.message()
                    // t.model.trackId()
                },
            }),
        ],
    }),
})

const app = express()

apollo.applyMiddleware({ app })

app.listen(4000, () => {
    console.log(`🚀 GraphQL service ready at http://localhost:4000/graphql`)
})