const bcrypt = require("bcryptjs");
const User = require("../models/User");

const typeDefs = `#graphql
    type User{
        _id: ID
        name: String
        username: String!
        email: String!
        password: String!
        followingDetail: [FollowDetail]
        followerDetail: [FollowDetail]
    }

    type FollowDetail{
      _id: ID
      name: String
      username: String
    }

    input NewUser{
        name: String
        username: String
        email: String
        password: String
    }
    input loginUser{
        username: String
        password: String
    }
    input searchUser{
        name: String
        username: String
    }
    type Query{
        userById(_id: ID): User
        userByUsername(user: searchUser): [User]
    }
    type Mutation{
        register(user: NewUser): User
        login(login: loginUser): String
    }
`;

const resolvers = {
  Query: {
    userById: async (_, args, contextValue) => {
      const { _id } = args;
      const {auth} = contextValue
      const dataAuth = auth()
      // console.log(dataAuth, 'DataAUTH<<<<');
      const user = await User.findById(dataAuth._id);
      console.log(user, '<<<<<USERS');
      return user;
    },

    userByUsername: async (_, args) => {
      // console.log(args, "REQ BODY GES");
      const { name, username } = args;
      const searchUser = await User.findByUsername(args);
      return searchUser;
    },
  },

  Mutation: {
    register: async (_, args) => {
      const newUser = { ...args.user };
      if(!newUser.password) throw new Error('Password is required')
      if(newUser.password.length < 5) throw new Error('Password must be more than 5 characther')
      var salt = bcrypt.genSaltSync(10);
      newUser.password = bcrypt.hashSync(newUser.password, salt);

      const result = await User.create(newUser);
      return result;
    },

    login: async (_, args) => {
      const login = { ...args.login };
      const loginuser = await User.login(login);
      return loginuser;
    },
  },
};

module.exports = { typeDefs, resolvers };
