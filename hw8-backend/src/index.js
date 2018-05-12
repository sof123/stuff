const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const qs = require('qs')
const app = express()
app.use(bodyParser.json())

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    console.log(req.headers.origin)
    res.setHeader('Access-Control-Allow-Origin', 'http://numberless-father.surge.sh');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();//
});

require('./serviceInteracter')(app)

app.use('/auth', login)
app.use('/callback', authCallback)
app.use('/get', get)
var authRequests = {}
var authTokens = {}
var LOCALHOST = "https://sof19backend.herokuapp.com"
var config = {
  consumer_key: "XTqRp2tBgkrKIsAtBUoR8JxtR",
  consumer_secret: "EGRVGXlZKndOMjLawLv0zDwmELtyo8IPm705qnccVvUzIttFXO"
}
var endpoints = {
  AUTHENTICATE: "https://api.twitter.com/oauth/authenticate",
  OA_REQ: "https://api.twitter.com/oauth/request_token",
  OA_ACCESS: "https://api.twitter.com/oauth/access_token",
  REST_ROOT: "https://api.twitter.com/1.1/"
}
var token = "blank"
function login(req, res){
  var oauth = {
    callback: LOCALHOST + '/callback',
    consumer_key: config.consumer_key,
    consumer_secret: config.consumer_secret
  }
  request.post({url: endpoints.OA_REQ, oauth:oauth}, function(err, req, body) {
    var req_data = qs.parse(body)
    console.log("req_data is", req_data)
    authRequests[req_data.oauth_token] = req_data
    var uri = endpoints.AUTHENTICATE + '?' + qs.stringify({oauth_token: req_data.oauth_token})
    console.log("uri is", uri)
    res.redirect(uri)
  })
}

function authCallback(req, res){
  var auth_data = req.query
  var oauth = {
    consumer_key: config.consumer_key,
    consumer_secret: config.consumer_secret,
    token: auth_data.oauth_token,
    token_secret: authRequests[auth_data.oauth_token].oauth_token_secret,
    verifier: auth_data.oauth_verifier
  }

  request.post({url: endpoints.OA_ACCESS, oauth: oauth}, function(err, req, body){
    console.log("in post")
    var perm_data = qs.parse(body)
    console.log("perm_data is", perm_data)
    console.log("perm_data.oauth_token is",perm_data.oauth_token)
    res.cookie('token', perm_data.oauth_token)
    token = perm_data.oauth_token
    authTokens[perm_data.oauth_token] = perm_data
    res.redirect(LOCALHOST + '/get')
  })
}

function get(req, res){
  console.log("req.cookies is", req.cookies)
  //var token = req.cookies['token']
  var perm_data = authTokens[token]
  console.log("user is ", perm_data)
  var oauth = {
    consumer_key: config.consumer_key,
    consumer_secret: config.consumer_secret,
    token: token,
    token_secret: perm_data.oauth_token_secret
  }

  var params = {
    screen_name: perm_data.screen_name,
    user_id: perm_data.user_id
  }
  var url = endpoints.REST_ROOT + 'users/show.json'
  request.get({url: url, oauth: oauth, qs:params, json:true}, function(err, req, user){
    console.log(user)
    res.send(user)
  })

}

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
