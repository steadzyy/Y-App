const Follow = require("../models/Follow")

const typeDefs = `#graphql
    type Follow{
        _id: ID
        followingId: String
        followerId: String
    }

    type Query{
        following: [Follow]
    }

    type Mutation{
        followUser(followingId:String): String
    }
`

const resolvers = {
    Query: {
        following: async (_, args, contextValue) => {
            const data = await Follow.getFollower()
            return data
        }
    },

    Mutation: {
        followUser: async (_, args, contextValue) => {
            const {followingId} = args //User yang ingin di follow
            const {auth} = contextValue
            const {_id: followerId} = auth() //User yang mem-follow

            const follow = await Follow.follow({followingId, followerId})

            return follow
        }
    }
}


module.exports = { typeDefs, resolvers };