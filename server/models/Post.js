const { ObjectId } = require("mongodb");
const database = require("../config/mongodb");

class Post {
  static async create(newPost, authorId) {
    // console.log(authorId, "<<<");
    newPost.AuthorId = new ObjectId(String(authorId));
    const result = await database.collection("Posts").insertOne(newPost);
    return newPost;
  }

  static async getAll() {
    const agg = [

      {
        $lookup: {
          from: "users",
          localField: "AuthorId",
          foreignField: "_id",
          as: "Author",
        },
      },
      {
        $unwind: {
          path: "$Author",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unset: ["Author.password"],
      },
      {
        $sort: {
          _id: -1,
        },
      },
    ];
    // const posts = await database.collection("Posts").find().toArray();
    const posts = await database.collection("Posts").aggregate(agg).toArray();
    return posts;
  }

  static async findById(_id) {
    const agg = [
      {$match: {
        _id: new ObjectId(String(_id))
      }},
      {
        $lookup: {
          from: "users",
          localField: "AuthorId",
          foreignField: "_id",
          as: "Author",
        },
      },
      {
        $unwind: {
          path: "$Author",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unset: ["Author.password"],
      },
      {
        $sort: {
          _id: -1,
        },
      },
    ];
    // const post = await database
    //   .collection("Posts")
    //   .findOne({ _id: new ObjectId(String(_id)) });
    const post = await database.collection("Posts").aggregate(agg).toArray();
    return post[0];
  }

  static async addComment(data, postId){
    // console.log(data, '<<<');
    // console.log(postId, 'ID<<<<<<')
    data.createdAt = new Date()
    data.updatedAt = new Date()
    await database.collection("Posts").updateOne(
        {
            _id: new ObjectId(String(postId)),
        },
        {
            $push: {
                Comment: data
            }
        }
    )
    return "Success add comment"
  }

  static async addLike(data, postId){
    // console.log(data, 'LIKE <<<');
    // console.log(postId, 'ID<<<<<<')

    //KALO BISA BUAT DISLIKE
    
    data.createdAt = new Date()
    data.updatedAt = new Date()
    await database.collection("Posts").updateOne(
        {
            _id: new ObjectId(String(postId)),
        },
        {
            $push: {
                Like: data
            }
        }
    )
    return "Success Like"
  }
}

module.exports = Post;
