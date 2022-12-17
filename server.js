const express = require('express')
const app=express()
const bodyParser = require('body-parser');


app.use(bodyParser.json());

// MongoDB
const { connectToDb, getDb } = require('./db')
const { ObjectId } = require('mongodb')

// db connection
let db
const PORT=process.env.PORT
connectToDb((err) => {
    if (!err) {
        app.listen(PORT || 3010, () => {
         })
        db = getDb()
    }
})

app.use(express.json())

// app.listen(3010,console.log("Api Project-2 running on port 3010"))

app.get('/', (req, res) => {
   
    let blogs = []
     db.collection('blogs')
        .find()
        .sort({ _id: -1 })
        .forEach(blog => blogs.push(blog))
        .then(() => {
             
            res.json(blogs)
            // res.end(JSON.stringify(blogs))
            // res.writeHead(200, blogs) 
          
        })
        .catch((err) => {
             res.status(500).json({ error: 'could not get data' })
        })

})