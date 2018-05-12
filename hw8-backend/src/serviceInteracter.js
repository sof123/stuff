var currentId = 3
var index = require('./index')

const articles = [{ id: currentId, author: "author", text: "text", date: new Date(), comments: [ ]},
                 { id: currentId+1, author: "author2", text: "text2", date: new Date(), comments: [ ]},
                 { id: currentId+2, author: "author3", text: "text3", date: new Date(), comments: [ ]}]


function addArticle(req, res, callback) {
  //const newArticle = { id: currentId, author: 'Scotty', body: req.body.body };
  var articleObj = {id: parseInt(Math.random()* 10000), author: index.globalUsername, text: req.body.text, date: new Date(), comments:""}
  Article.find({}, function (err, docs) {
  // docs is an array
    Article.create(articleObj, function (err, small) {
    if (err)
    {
      console.log("ERROR")
      return handleError(err);
    }
    getFeedArticlesForUser(index.globalUsername)
      .then(articles => res.json({ articles }))
      .catch(err => res.status(500).json({ error: err.message }))
    })

  })

  }

const getArticles = (req, res) => {
  console.log('in get articles')

  array = [index.globalUsername]


  Article.find({author: {$in :array}}, (err, articles) => {
    if (!articles ){
      res.sendStatus(401)
    }
    console.log("articles is " + articles)
    res.json({articles:articles.map((article)=> ({
      id: article.id,
      author: article.author,
      text: article.body,
      date: article.date,
      comments: article.comments
    }
    ))})

  })
}

const hello = (req, res) => {
  console.log('in default')
  res.json({result: "Hello Tolunay"})
}

const getAccountBalance = (req, res) => {
  console.log('in getAccountBalance')
  res.json({result: {
    accountBalance: 0
  }})
}

const makePaymentGet = (req, res) => {
  console.log('in makePayment')
  res.json({result: "Payment made"})
}

const makePaymentPost = (req, res) => {
  console.log('in makePayment')
  res.json({result: "Payment made"})
}

const getConsumptionInfo = (req, res) => {
  console.log('in getConsumptionInfot')
  res.json({result: {
    consumptionInfo: []
  }})
}

const getPaymentHistory = (req, res) => {
  console.log('in getPaymentHistory')
  res.json({result: {
    paymentHistory: []
  }})
}

function getFeedArticlesForUser(username) {
  return new Promise((resolve, reject) => {
    Profile.findOne({ username }).then(user => {
      userObj = user;
      console.log(userObj)
      //compare with salt
      if (!userObj ){
        console.log("NO LOGGED IN USER?")
        return reject(new Error('No logged in user'))
      }
      loggedInUserFollowing = userObj.following

      Article
        .find({
          author: {
            $in: loggedInUserFollowing.concat(username)
          }
        })
        .sort('-date')
        .limit(10)
        .exec((err, articles) => {
          if (err) return reject(err)
          return resolve(articles)
        })
    })
  })
}

const getArticleById = (req, res) => {
  console.log(req.params.id)
  console.log("GETTING ARTICLES")
  var loggedInUserFollowing = {}
  //neither case
  if (!req.params.id)
  {
    console.log("in neither case")
    //get all users that the loggedinuser is following:
    getFeedArticlesForUser(index.globalUsername)
      .then(articles => {
          console.log("ARTILES ON BACKEND", articles)
          if (!articles){
            console.log("AINT NO ARTICLES TO FETCH")
            res.json({articles:[]})
          }
          res.json({ articles })
        })
      .catch(err => res.status(404).json({ error: err.message }))
  }

  //id case
  else if (!req.params.id.match(/[a-z]/i))
  {
    console.log("in id case")
    array = [req.params.id]
    Article.find({id: {$in :array}}, (err, articles) => {
      if (!articles ){
        res.sendStatus(401)
      }
      res.json({articles:articles.map((article)=> ({
        id: article.id,
        author: article.author,
        text: article.text,
        date: article.date,
        comments: article.comments
      }
      ))})

    })
  }
  //author case
  else {
    console.log("in author case")
    array = [req.params.id]
    Article.find({author: {$in :array}}, (err, articles) => {
      if (!articles ){
        res.sendStatus(401)
      }
      res.json({articles:articles.map((article)=> ({
        id: article.id,
        author: article.author,
        text: article.text,
        date: article.date,
        comments: article.comments
      }
      ))})

    })
  }

}

const getHeadline = (req, res) => {
  console.log(req.params.user)
  console.log('Payload received', req.body)
 var payload;
 if (req.method == 'GET' && req.url == '/headlines')
 {
   payload = defaultHeadline;
 }

 //res.setHeader('Content-Type', 'application/json')
 //res.statusCode = 200
 res.send(JSON.stringify(payload))
 console.log(JSON.stringify(payload))
}

function isLoggedIn(req, res, next){
    if (!index.globalUsername){
      res.status(403).json({err: "forbidden"})
      return
    }

    next()
}

const getThreeArticles = (req, res) => {
  res.json(articles)
}

const editArticles = (req, res) => {
  console.log("in edit articles")

  //if comment id is not supplied
  if (!req.body.commentId)
  {
    //get all users that the loggedinuser is following:
    getFeedArticlesForUser(index.globalUsername)
      .then(articles => {
          console.log("ARTILES ON BACKEND", articles)
          if (!articles){
            console.log("AINT NO ARTICLES TO FETCH")
            res.json({articles:[]})
          }
          articles.forEach(function(article) {
            if (article.id == req.params.id){
              //if article is owned by logged in user
              if (article.username === req.params.username){
                article.text = req.body.text;
                Article.update({ id: req.params.id}, { $set: { text: req.body.text }}, (err, zip)=>{
                  //var retObj = {'username': index.globalUsername, 'headline': req.body.headline}
                  res.json({articles})
                });
            }
            else {
                res.status(403).json({error: "Forbidden"})
            }
          }
        });
    })
      .catch(err => res.status(404).json({ error: err.message }))
  }

  //commentid is -1 case
  else if (req.body.commentId === "-1")
  {
    console.log("in -1 case")
    getFeedArticlesForUser(index.globalUsername)
      .then(articles => {
          if (!articles){
            console.log("AINT NO ARTICLES TO FETCH")
            res.json({articles:[]})
          }
          articles.forEach(function(article) {
            console.log(article.id == req.params.id);
            console.log("article.id is ",article.id)
            console.log("req.params.id is ", req.params.id)
            if (article.id == req.params.id){
              console.log("SHOULD BE EQUAL")
              //if article is owned by logged in user
                article.comments.push(req.body.text);
                Article.update({ id: req.params.id}, { $set: { comments: article.comments}}, (err, zip)=>{
                  //var retObj = {'username': index.globalUsername, 'headline': req.body.headline}
                  console.log("in update about to send articles")
                  res.json({articles})
                });
            }
          })
      })
  }
  //commentId is included case
  else {
    getFeedArticlesForUser(index.globalUsername)
      .then(articles => {
          console.log("ARTILES ON BACKEND", articles)
          if (!articles){
            console.log("AINT NO ARTICLES TO FETCH")
            res.json({articles:[]})
          }

          articles.forEach(function(article) {
            if (article.id == req.params.id){
              //if article is owned by logged in user
                article.comments[parseInt(req.body.commentId)] = req.body.text
                Article.update({ id: req.params.id}, { $set: { comments: article.comments}}, (err, zip)=>{
                  //var retObj = {'username': index.globalUsername, 'headline': req.body.headline}
                  res.json({articles})
                });
            }
          })
      })
    }

}


module.exports = app => {
     app.get('/', hello)
     app.get('/accountBalance', getAccountBalance)
     app.get('/paymentHistory', getPaymentHistory)
     app.get('/consumptionInfo', getConsumptionInfo)
     app.get('/makePayment', makePaymentGet)
     app.post('/makePayment', makePaymentPost)
     app.post('/article', addArticle)
     app.put('/articles/:id', editArticles)
     //app.get('/articles', getArticles)
     app.get('/headlines/', getHeadline)
     app.get('/articles/:id*?', getArticleById)
    // app.get('/articles', getThreeArticles)
}
