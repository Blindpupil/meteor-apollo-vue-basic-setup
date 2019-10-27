import { ApolloServer } from 'apollo-server-express'
import { WebApp } from 'meteor/webapp'
import { getUser } from 'meteor/apollo'
import merge from 'lodash/merge'

import ResolutionSchema from '../../api/resolutions/Resolution.graphql'
import ResolutionResolvers from '../../api/resolutions/resolvers'
import UsersSchema from '../../api/users/User.graphql'
import UserResolver from '../../api/users/resolvers'
import GoalSchema from '../../api/goals/Goal.graphql'
import GoalResolvers from '../../api/goals/resolvers'

const hiSchema = `
type Query {
  hi: String
}
`
const hiResolver = {
  Query: {
    hi: () => 'Hello World',
  },
}

const typeDefs = [hiSchema, ResolutionSchema, UsersSchema, GoalSchema]
const resolvers = merge(
  hiResolver, ResolutionResolvers, UserResolver, GoalResolvers,
)

// ...
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
