const { ObjectId } = require("mongodb");
const database = require("../config/mongodb");
const { compareSync } = require("bcryptjs");
const { signToken } = require("../helper/jwt");
const isEmail = require("../helper/isEmail");

class User {
  static async validateUsername(username) {
    return await database.collection("users").findOne({ username: username });
  }
  static async validateEmail(email) {
    return await database.collection("users").findOne({ email: email });
  }

  static async create(newUser) {
    //JANGAN LUPA VALIDASI EMAIL PASSWORD DLL
    if (!newUser.username) throw new Error("Username required");
    const dataByUsername = await this.validateUsername(newUser.username);
    if (dataByUsername) throw new Error("Username must be unique!");

    if (!newUser.email) throw new Error("Email required");

    const emailFormat = isEmail(newUser.email);
    if (!emailFormat) throw new Error("Invalid email format");

    const dataByEmail = await this.validateEmail(newUser.email);
    if (dataByEmail) throw new Error("Email must be unique!");

    newUser.createdAt = new Date();
    newUser.updatedAt = new Date();

    const result = await database.collection("users").insertOne(newUser);
    return newUser;
  }

  static async findById(_id) {
    const agg = [
      {
        $match: {
          _id: new ObjectId(String(_id)),
        },
      },
      {
        $lookup: {
          from: "follows",
          localField: "_id",
          foreignField: "followerId",
          as: "following",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "following.followingId",
          foreignField: "_id",
          as: "followingDetail",
        },
      },
      {
        $lookup: {
          from: "follows",
          localField: "_id",
          foreignField: "followingId",
          as: "follower",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "follower.followerId",
          foreignField: "_id",
          as: "followerDetail",
        },
      },
    ];
    const user = await database.collection("users").aggregate(agg).toArray();

    if (user.length === 0) throw new Error("user not found");
    // console.log(user[0], "USER INDEK 0");
    return user[0];
  }

  static async login(loginUser) {
    const { username, password } = loginUser;
    const login = await database
      .collection("users")
      .findOne({ username: username });
    if (!login) {
      throw new Error("username not found");
    }
    const compPass = compareSync(password, login.password);
    if (!compPass) {
      throw new Error("username or Password is wrong");
    }
    const access_token = signToken(login);
    return access_token
  }

  static async findByUsername(searchUser) {
    const { name, username } = searchUser.user;
    // console.log(name, username, "USER<<<<<");
    if (name) {
      const users = await database.collection("users").find({ name: {$regex: name, $options: "i"} }).toArray();
      return users;
    }
    if (username) {
      const users = await database
        .collection("users")
        .find({ username: {$regex: username, $options: "i"} })
        .toArray();
      return users;
    }
  }
}

module.exports = User;
