import { ApolloServer } from 'apollo-server-express'
import { WebApp } from 'meteor/webapp'
import { getUser } from 'meteor/apollo'
import merge from 'lodash/merge'

import ResolutionSchema from '../../api/resolutions/Resolution.graphql'
import ResolutionResolvers from '../../api/resolutions/resolvers'

const testSchema = `
type Query {
  hi: String,
  resolutions: [Resolution]
}
`


const typeDefs = [testSchema, ResolutionSchema]

const hiResolver = {
  Query: {
    hi: () => 'Hello World',
  },
}

const resolvers = merge(
  hiResolver, ResolutionResolvers,
)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => ({
    user: await getUser(req.headers.authorization),
  }),
})

server.applyMiddleware({
  app: WebApp.connectHandlers,
  path: '/graphql',
})
