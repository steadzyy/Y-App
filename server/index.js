require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const {
  typeDefs: userTypeDefs,
  resolvers: userResolvers,
} = require("./schemas/user");

const {
  typeDefs: postTypeDefs,
  resolvers: postResolvers,
} = require("./schemas/post");
const { verifyToken } = require("./helper/jwt");

const {
  typeDefs: followTypeDefs,
  resolvers: followResolvers,
} = require("./schemas/follow")

//Untuk setup Server dan untuk jalaninnya
const server = new ApolloServer({
  introspection: true,
  typeDefs: [userTypeDefs, postTypeDefs, followTypeDefs],
  resolvers: [userResolvers, postResolvers, followResolvers],
});

const { url } = startStandaloneServer(server, {
  listen: {port: process.env.PORT || 4000 } ,
  context: ({ req, res }) => {
    return {
      auth: () => {
        /*
        1. ambil token dari headers, kalau tidak ada throw error
        2. split, type token, check bearer
        3. check token -> jwt verify
        4. kirim ke controller
        */
        const auth = req.headers.authorization;
        if (!auth) throw new Error("unauthenticated");
        const [type, access_token] = auth.split(" ");
        if (type !== "Bearer") throw new Error("Invalid Token");
        const decoded = verifyToken(access_token);
        return decoded;
      },
    };
  },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
