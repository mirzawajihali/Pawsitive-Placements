const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.sk4ge.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();




    const petsCollection = client.db("PawsitivePlacements").collection("pets");
    const reviewsCollection = client.db("PawsitivePlacements").collection("reviews");


    // Send a ping to confirm a successful connection

    app.get('/pets', async (req, res) => {
        const cursor = petsCollection.find();
        const pets = await cursor.toArray();
        res.send(pets);
    });



    app.get("/reviews", async(req, res) =>{
      const cursor = reviewsCollection.find();
      const reviews = await cursor.toArray();
      res.send(reviews);
    }
    )

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Adopt animal nowwwwwww!!');
});



