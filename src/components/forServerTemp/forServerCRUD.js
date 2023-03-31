
// import { MongoClient } from "mongodb";
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();


const app = express();
const port = 6500;

// middleware
app.use(express.json());
app.use(cors());


// mongodb Credential // user: mongodb2 pass: mu6oxCCpw1UD6G72
// Mongodb user and pass for connecting
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kldnhad.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
  try {
    const database = client.db("database3");
    const usersCollection = database.collection("users");


    // GET API 
    app.get('/', (req, res) => {
      res.send("This is 'GET' request!!!")
    });

    // GET API - to see ALL
    app.get('/users', async (req, res) => {
      const cursor = usersCollection.find({});
      const users = await cursor.toArray();
      res.send(users);
    });

    // GET API - Find one
    app.get('/user/:id', async (req, res) => {
      const query = { _id: ObjectId(req.params.id) };
      const result = await usersCollection.findOne(query);
      res.json(result)
    });

    // GET API - find (one to update)
    app.get('/user/update/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await usersCollection.findOne(query);
      res.json(result);
    });




    // POST API 
    app.post('/users', async (req, res) => {
      const newUser = req.body;
      const result = await usersCollection.insertOne(newUser);

      console.log(`A document was inserted with the _id: ${result.insertedId}`);

      res.json(result)
    });


    // DELETE API 
    app.delete('/user/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await usersCollection.deleteOne(query);

      if (result.deletedCount === 1) {
        console.log("Successfully deleted one document.");
      } else {
        console.log("No documents matched the query. Deleted 0 documents.");
      };

      res.json(result);
    });


    ///// POST API - to UPDATE 
    app.put('/user/update/:id', async (req, res) => {
      const id = req.params;
      const newName = req.body.name;
      const newEmail = req.body.email;
      const newQuantity = req.body.quantity;

      const filter = { _id: ObjectId(id) };
      const updateDoc = {
        $set: {
          name: newName,
          email: newEmail,
          quantity: newQuantity,
          plot: `A harvest of random numbers, such as: ${Math.random()}`
        },
      };

      const result = await usersCollection.updateOne(filter, updateDoc);
      res.json(result);
    });




  } finally {
    // await client.close();
  };

};
run().catch(console.dir);



app.listen(port, () => {
  console.log(`Listening to port: ${port}`)
});