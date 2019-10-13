import { ApolloServer } from 'apollo-server-express'
import { WebApp } from 'meteor/webapp'
import { getUser } from 'meteor/apollo'
import merge from 'lodash/merge'

import ResolutionSchema from '../../api/resolutions/Resolution.graphql'
import ResolutionResolvers from '../../api/resolutions/resolvers'
import UsersSchema from '../../api/users/User.graphql'
import UserResolver from '../../api/users/resolvers'

const testSchema = `
type Query {
  hi: String
  resolutions: [Resolution]
  user: User
}
`
// ...
const typeDefs = [testSchema, ResolutionSchema, UsersSchema]

const hiResolver = {
  Query: {
    hi: () => 'Hello World',
  },
}

const resolvers = merge(
  hiResolver, ResolutionResolvers, UserResolver,
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
