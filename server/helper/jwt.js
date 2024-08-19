const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
// console.log(JWT_SECRET,"!!!!!!");
const signToken =  (user)=>{
    return jwt.sign ({_id: user._id, email: user.email, username: user.username}, JWT_SECRET)
}
const verifyToken = (token)=>{
    return jwt.verify(token, JWT_SECRET)
}
module.exports = {signToken, verifyToken}