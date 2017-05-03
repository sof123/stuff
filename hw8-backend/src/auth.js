var database = []
var index = require('./index')
const md5 = require('md5')
var sid = []

const User = require('./model').User
const Profile = require('./model').Profile
defaultStatus = "default"


var models = require('./model.js')


function isLoggedIn(req, res, next){
    if (!index.globalUsername){
      res.status(403).json({err: "forbidden"})
    }
    next()
}





function login(req, res){
  var username = req.body.username;
  var password = req.body.password;
  if (!username || !password){
    res.sendStatus(400)
    return
  }
  var userObj
   User.findOne({username: username}).then(user => {
     userObj = user;
     console.log(userObj)
     //compare with salt
     if (!userObj ){
       res.sendStatus(401)
       return
     }
     if (md5(password.concat(userObj.salt)) !== userObj.hash)
     {
       res.sendStatus(401)
       return
     }

     //map sid to user in memory
     var msg = {username: username, result: 'sucess'}
     sid.push(username)
     loggedInUser = username
     index.globalUsername = username
     res.cookie(username, sid.length)
     res.send(msg)
   })
}

const register = (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  var zipcode = req.body.zipcode;
  var dob = req.body.dob;
  var avatar = req.body.avatar
  var salt = "thesaltthesaltsaltysalt"

  database.push({username: username, salt: salt, hash: md5(password.concat(salt))})

  var userObj = {username: username, salt: salt, hash: md5(password.concat(salt))}
  var profObj = {username: username, email: email, status: defaultStatus, headline: "default", dob:dob, zipcode:zipcode, following: [], avatar:avatar}
  User.create(userObj, function (err, small) {
  if (err)
  {
    console.log("ERROR")
    return handleError(err);
  }
  // saved!
  })
  Profile.create(profObj, function (err, small) {
  if (err)
  {
    console.log("ERROR")
    return handleError(err);
  }
  // saved!
  })
  msg = {result:'success', username: username}
  res.json(msg)
}

const putPassword = (req, res) => {
  msg = {username:index.globalUsername, status: 'will not change'}
  res.json(msg)
}

function logout(req, res){
  index.globalUsername = undefined
  res.send("OK")
}

function seeIfLoggedIn(req, res){
  if (!index.globalUsername)
  {
    res.send("Landing.js")
  }
  else {
    res.send("Main.js")
  }
}

module.exports = app => {
     app.get('/seeIfLoggedIn', seeIfLoggedIn)
     app.post('/login', login)
     app.post('/register', register)
     app.put('/logout', isLoggedIn, logout)
     app.put('/password', putPassword)
}
