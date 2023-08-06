const express = require('express');
const mongoose  = require('mongoose');
const app = express();
app.use(express.urlencoded({extended: 'false'}))
app.use(express.json())
const fileupload = require("express-fileupload");
// Connect to database
const dotenv = require('dotenv');
dotenv.config({
    path:'./.env'
})

mongoose.connect(process.env.database_s,
{
    useNewUrlParser: true
})
.then(()=>{
    console.log('We arein')
})
.catch((err)=>{
    console.log(err)
})

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://fady:Fadygamil1212@cluster0.tqtjwes.mongodb.net/?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

const router = require('./routes/routes');
const session = require('express-session');
console.log(__dirname +'/public')
app.use(express.static(__dirname +'/public'));
app.use(express.static('public'));
app.use(session({
    secret: 'fadygamilhana'
}))
app.use(fileupload())
app.set('view engine', 'pug')

app.use("/",router);
app.use(
    session({
        secret:'fady',
        resve:false,
        saveUninitialized:false
    })
)
app.listen(5000, ()=> {
    console.log("App started")
})

