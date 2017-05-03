const express = require('express')
const bodyParser = require('body-parser')
const Headline = require('./model').Headline
const Profile = require('./model').Profile
var index = require('./index')

const defaultHeadline = {
        username: 'sep1',
        headline: 'defaultHeadline',
}

const indexA = (req, res) => {
    console.log(req.params.user)
    res.send({ hello: 'world' })
}

function removedArray(arr, element)
{
  console.log("arr before is " + arr)
  var index = arr.indexOf(element);
  if (index > -1) {
    arr.splice(index, 1);
  }
  console.log("arr after is " + arr)
  return arr;
}


const putHeadline = (req, res) => {
  console.log(index.globalUsername)
  Profile.update({ username: index.globalUsername}, { $set: { headline: req.body.headline }}, (err, zip)=>{
    //var retObj = {'username': index.globalUsername, 'headline': req.body.headline}
    res.json({'username': index.globalUsername, 'headline': req.body.headline})
  });
}

const getHeadlineUsers = (req, res) => {
  console.log(req.params.users)
  var array;
  if (req.params.users.includes(","))
  {
    array = req.params.users.split(',');
  }
  else {
    array = [req.params.users]
  }

  console.log("array length is " + array.length)
  console.log("array is " + array)
    Profile.find({username: {$in :array}}, (err, users) => {
      if (!users ){
        res.sendStatus(401)
      }
      res.json({headlines:users.map((user)=> ({
        username: user.username,
        headline: user.headline
      }
      ))})

    })
  }

const getEmailUser = (req, res) => {
  console.log("in get email user")
  //console.log(req.params.user)
  if (req.params.user){
    console.log("in username case")
    Profile.findOne({username: req.params.user}).then(user => {
      userObj = user;
      console.log(userObj)
      //compare with salt
      if (!userObj ){
        res.sendStatus(401)
        return
      }
      var msg = {username: req.params.user, email:userObj.email}
      res.send(msg)
    })
  }
  else {
    console.log("in blank case")
    Profile.findOne({username: index.globalUsername}).then(user => {
      userObj = user;
      console.log(userObj)
      //compare with salt
      if (!userObj ){
        res.sendStatus(401)
        return
      }
      var msg = {username: index.globalUsername, email:userObj.email}
      res.send(msg)
    })
  }
}


const putEmail = (req, res) => {
  console.log(index.globalUsername)
  Profile.update({ username: index.globalUsername}, { $set: { email: req.body.email }}, (err, zip)=>{
    var retObj = {username: index.globalUsername, email: req.body.email}
    res.json(retObj)
  });
}

const putZipcode = (req, res) => {
  console.log(index.globalUsername)
  Profile.update({ username: index.globalUsername}, { $set: { zipcode: req.body.zipcode }}, (err, zip)=>{
    var retObj = {username: index.globalUsername, zipcode: req.body.zipcode}
    res.json(retObj)
  });
}

const putAvatar = (req, res) => {
  console.log(req.body)
  console.log("Type of req.body in put avatar is ", typeof req.body)
  console.log("image of put avatar request is  ", req.body.get("image"))
  Profile.update({ username: index.globalUsername}, { $set: { avatar: req.body.avatar }}, (err, zip)=>{
    var retObj = {username: index.globalUsername, avatar: req.body.avatar}
    res.json(retObj)
  });
}

const getHeadline = (req, res) => {
  console.log(req.params.user)
  console.log('Payload received', req.body)
 var payload;
 /*
 if (//req.method == 'GET' && req.url == '/headlines')
 {
   payload = defaultHeadline;
 }
 */
 payload = defaultHeadline

 //res.setHeader('Content-Type', 'application/json')
 //res.statusCode = 200
 res.send(JSON.stringify(payload))
}

const getZipcodeUser = (req, res) => {
  console.log(req.params.user)
  Profile.findOne({username: req.params.user}).then(user => {
    userObj = user;
    console.log(userObj)
    //compare with salt
    if (!userObj ){
      res.sendStatus(401)
      return
    }
    var msg = {username: req.params.user, zipcode:userObj.zipcode}
    res.send(msg)
  })
}

const getDOB = (req, res) => {
  Profile.findOne({username: index.globalUsername}).then(user => {
    userObj = user;
    console.log(userObj)
    //compare with salt
    if (!userObj ){
      res.sendStatus(401)
      return
    }
    var msg = {username: index.globalUsername, dob:userObj.dob}
    res.send(msg)
  })
}

const getAvatar = (req, res) => {
  Profile.findOne({username: index.globalUsername}).then(user => {
    userObj = user;
    console.log(userObj)
    //compare with salt
    if (!userObj ){
      res.sendStatus(401)
      return
    }
    var msg = {username: index.globalUsername, avatar:userObj.avatar}
    res.send(msg)
  })
}

const getFollowingUser = (req, res) => {
  //if there is parameter
  if (req.params.user)
  {
    Profile.findOne({username: req.params.user}).then(user => {
      userObj = user;
      console.log(userObj)
      //compare with salt
      if (!userObj ){
        res.json({username:req.params.user, following:[]})
        //res.sendStatus(401)
        return
      }
      var msg = {username: req.params.user, following:userObj.following}
      res.json(msg)
    })
  }

  //no params so get all users that the loggedinuser is following
  else{
    Profile.findOne({username: index.globalUsername}).then(user => {
      userObj = user;
      console.log(userObj)
      //compare with salt
      if (!userObj ){
        res.json({username:index.globalUsername, following:[]})
        //res.sendStatus(401)
        //return
      }
      var msg = {username: req.params.user, following:userObj.following}
      res.json(msg)
    })
  }
}

const follow = (req, res) => {
  console.log("in follow")
  //get current following array
  var currentFollowing;
  Profile.findOne({username: index.globalUsername}).then(user => {
    userObj = user;
    console.log("user object is " + userObj)
    //compare with salt
    if (!userObj ){
      res.sendStatus(401)
      return
    }
    currentFollowing = userObj.following;


    Profile.findOne({username: req.params.user}).then(user => {

    //if no user with that username in database
    if (!user){
      console.log("USER NOT FOUND CANNOT FOLLOW")
      res.status(404).json({error:"ERROR CANNOT FOLLOW UNKNOWN USER"})
      return
    }
    Profile.update({ username: index.globalUsername}, { $set: { following: currentFollowing.concat([req.params.user]) }}, (err, zip)=>{
      Profile.findOne({username: index.globalUsername}).then(user => {
        userObj = user;
        console.log(userObj)
        //compare with salt
        if (!userObj ){
          res.sendStatus(401)
          return
        }
        var msg = {username: index.globalUsername, following:currentFollowing.concat([req.params.user])}
        res.send(msg)
      })
    });
  })
})
}

const unfollow = (req, res) => {
  //get current following array
  var currentFollowing;
  Profile.findOne({username: index.globalUsername}).then(user => {
    userObj = user;
    console.log("user object is " + userObj)
    //compare with salt
    if (!userObj ){
      res.sendStatus(401)
      return
    }
    currentFollowing = userObj.following;
    Profile.update({ username: index.globalUsername}, { $set: { following: removedArray(currentFollowing,req.params.user) }}, (err, zip)=>{
      //var retObj = {username: index.globalUsername, headline: req.body.headline}
      //res.json(retObj)
      Profile.findOne({username: index.globalUsername}).then(user => {
        userObj = user;
        console.log(userObj)
        //compare with salt
        if (!userObj ){
          res.sendStatus(401)
          return
        }
        var msg = {username: index.globalUsername, following:removedArray(currentFollowing,req.params.user)}
        res.send(msg)
      })
    });

  })
}

const getHeadlines = (req, res) => {
  console.log(req.params.user)
  console.log('Payload received', req.body)
 var payload;
 payload = defaultHeadline
 res.send(JSON.stringify(payload))
}

const isLoggedIn = (req, res) => {
  console.log(req.params.user)
  console.log('Payload received', req.body)
 var payload;
 payload = defaultHeadline
 res.send(JSON.stringify(payload))
}

module.exports = app => {
     app.get('/', indexA)
     app.get('/headlines/', getHeadline)
     app.put('/headline', putHeadline)
     app.get('/headlines/:users?', getHeadlineUsers)
     app.get('/email/:user?', getEmailUser)
     app.get('/zipcode/:user?', getZipcodeUser)
     app.get('/avatar/', getAvatar)
     app.put('/avatar', putAvatar)
     app.get('/following/:user?', getFollowingUser)
     app.put('/zipcode', putZipcode)
     app.put('/email', putEmail)
     app.put('/following/:user', follow)
     app.delete('/following/:user', unfollow)
     app.get('/headlines/:users*?', isLoggedIn, getHeadlines)
     app.get('/dob', getDOB)
}
