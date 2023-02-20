const express = require('express');
const app = express();
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient

//Adding middleware, ejs, etc

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())                                                                                                               
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

require('dotenv').config();
let db,
    dbConnectionStr = process.env.ATLAS_URI,
    dbName = 'gratitude_jar'

MongoClient.connect(dbConnectionStr, {  
    useNewUrlParser: true,
    useUnifiedTopology: true })
.then(client => {
    console.log(`Connected to ${dbName} Database`)
    db = client.db(dbName)
})
.catch(error => console.error(error))


  // app.get('/', (req, res) => {
  //   res.sendFile(__dirname + '/index.html')
    
  // })

  // app.get('/', (req, res) => {
  //   const cursor = db.collection('gratitudesInput').find().toArray()
  //   console.log(cursor)
  //   // ...
  // })
  app.get('/', (req, res) => {
    db.collection('gratitudesInput').find().toArray()
      .then(results => {
        res.render('index.ejs', { gratitudesInput: results })
      })
      .catch(error => console.error(error))
  })

  app.post('/quotes', (req, res) => {
    db.collection('gratitudesInput').insertOne(req.body)
      .then(result => {
        console.log(result)
        res.redirect('/')
      })
      .catch(error => console.error(error))
  })

  app.put('/quotes', (req, res) => {
    console.log(req.body)
  })

  app.put('/quotes', (req, res) => {
    db.collection('gratitudesInput').findOneAndUpdate(
      { name: 'Beenysh' },
      {
        $set: {
          name: req.body.name,
          quote: req.body.quote
        }
      },
      {
        upsert: true
      }
    )
      .then(result => {
        console.log(result)
       })
      .catch(error => console.error(error))
  })

 app.listen(3000, function() {
  console.log('listening on 3000')
})