const { ObjectId } = require("mongodb");
const database = require("../config/mongodb");

class Follow {
  static async follow(payload) {
    const { followingId, followerId } = payload;

    // const check = await database.collection('users').findOne({_id: new ObjectId(String(id))})

    // if(check.username === user.username) throw new Error('Cannot follow yourself')

    let data = {};

    data.followingId = new ObjectId(String(followingId));
    data.followerId = new ObjectId(String(followerId));
    data.createdAt = new Date();
    data.updatedAt = new Date();

    await database.collection("follows").insertOne(data);
    return "Success follow";
  }
}

module.exports = Follow;
