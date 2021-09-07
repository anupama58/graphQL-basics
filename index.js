const express = require('express')

const { graphqlHTTP } = require('express-graphql')
const { GraphQLObjectType, graphql, GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLList,GraphQLSchema} = require('graphql')

const PORT = 5000

const app = express()

var Owners = [
  { id: 1, name: 'John Astle' },
  { id: 2, name: 'Gautam Sharma' },
  { id: 3, name: 'Kane Williamson' }
]

var Websites = [
  { id: 1, name: 'Facebook', ownerId: 1 },
  { id: 2, name: 'Google', ownerId: 2 },
  { id: 3, name: 'Amazon', ownerId: 3 },
  { id: 4, name: 'Github', ownerId: 1 },
  { id: 5, name: 'Medium', ownerId: 2 },
  { id: 6, name: 'Baidu', ownerId: 3 },
  { id: 7, name: 'Zapak', ownerId: 1 },
  { id: 8, name: 'Cricinfo', ownerId: 2 }
]


var websiteType = new GraphQLObjectType({
  name: 'website',
  description: 'website type',
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLInt)
    },
    name: {
      type: GraphQLNonNull(GraphQLString)
    },
    ownerId: {
      type: GraphQLNonNull(GraphQLString)
    }
  })
})

var ownerType = new GraphQLObjectType({
  name: 'owner',
  description: 'owner type',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) }
  })

})



const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    websites: {
      type: new GraphQLList(websiteType),
      description: 'List of All Websites',
      resolve: () => Websites
    },
    owners: {
      type: new GraphQLList(ownerType),
      description: 'List of All Owners', 
      resolve: () => Owners
    }
  })
})

const schema = new GraphQLSchema({
  query: RootQueryType
})

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema: schema
}))
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`)
})