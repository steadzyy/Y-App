const Post = require("../models/Post");
const redis = require("../config/redis");

const typeDefs = `#graphql

    type AuthorDetail{
        name: String
        username: String
        email: String
        _id: ID
    }

    type Post{
        _id: ID
        content: String
        tags: [String]
        imgUrl: String
        AuthorId: String
        Author: AuthorDetail
        Comment: [Comment]
        Like: [Like]
    }


    type Comment{
        content: String
        username: String
        createdAt: String
        updatedAt: String
    }

    type Like{
        username: String
        createdAt: String
        updatedAt: String
    }

    type Query{
        posts: [Post],
        postsById(_id: ID) : Post
    }


    type Mutation{
        addPost(content: String, tags: [String], imgUrl: String) : Post
        addComment(content: String, postId: String) : String
        addLike(postId: String) : String
    }
`;

const resolvers = {
  Query: {
    posts: async (_, __, { auth }) => {
      auth();
      /**
       * 1. Cek apakah ada di redis/cache apa enggak
       * 2. Kalo ada -> return datanya
       * 3. Kalo gak ada -> ambil data ke mongoDB -> simpan ke redis/cache
       * 4. return data nya dari redis/cache
       */

      const postsCache = await redis.get("post:all");
      if (postsCache) {
        console.log("From cache");
        return JSON.parse(postsCache);
      }
      const posts = await Post.getAll();
      console.log("From MongoDB");
      await redis.set("post:all", JSON.stringify(posts));
      return posts;
    },
    postsById: async (_, args) => {
      const { _id } = args;
      const post = await Post.findById(_id);
      // console.log(user, '<<<<<POSTSSSSS');
      return post;
    },
  },

  Mutation: {
    addPost: async (_, args, contextValue) => {
      const user = contextValue.auth();
      const { content, tags, imgUrl } = args;

      const post = await Post.create({ content, tags, imgUrl }, user._id);
      await redis.del("post:all");
      //   console.log(user._id, 'ID<<<<');
      return post;
    },
    addComment: async (_, args, contextValue) => {
      // console.log(args, "ARGS<<<<<");
      const { content, postId } = args;
      const { username } = contextValue.auth();

      const result = await Post.addComment({ content, username }, postId);
      return result;
    },
    addLike: async (_, args, contextValue) => {
      // console.log(args, "LIKE ARGS<<<<<");
      const { postId } = args;
      const { username } = contextValue.auth();

      const result = await Post.addLike({ username }, postId);
      await redis.del("post:all");
      return result;
    },
  },
};

module.exports = { typeDefs, resolvers };
