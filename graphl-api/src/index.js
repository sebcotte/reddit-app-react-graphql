const { GraphQLServer, PubSub } = require('graphql-yoga')
const { PrismaClient } = require('@prisma/client')

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Subscription = require('./resolvers/Subscription')
const User = require('./resolvers/User')
const Post = require('./resolvers/Post')
const Upvote = require('./resolvers/Upvote')
const Comment = require('./resolvers/Comment')
const Reply = require('./resolvers/Reply')
const Subreddit = require('./resolvers/Subreddit')

// Create Prisma Client
const prisma = new PrismaClient()

// It's used for user authentication
const pubsub = new PubSub()

// Declare all resolvers
const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Post,
  Upvote,
  Comment,
  Reply,
  Subreddit
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  // Attach instance of Prisma to GraphQL server
  context: request => {
    return {
      ...request,
      prisma,
      pubsub
    }
  },
})

server.start(() => console.log(`Server is running on http://localhost:4000`))