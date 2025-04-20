const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');

const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 3000;
require("dotenv").config();
const stripe =require('stripe')(process.env.STRIPE_SECRET_KEY);

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Your React app's URL
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 


const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed!'), false);
  }
};

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});




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
    const applicationCollection = client.db("PawsitivePlacements").collection("application");
    const usersCollection = client.db("PawsitivePlacements").collection("users");
    const paymentsCollection = client.db("PawsitivePlacements").collection("payments");


    // Send a ping to confirm a successful connection




    // middleware 
    const verifyToken = (req, res, next) => {
      console.log("inside verify token",req.headers.authorization);
      if(!req.headers.authorization){
        return res.status(401).send({message : "forbidden access"});
      }
      const token = req.headers.authorization.split(' ')[1];
      
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) =>{
        if(err){
          return res.status(401).send({message : "forbidden access"});
        }

        req.decoded = decoded;
        next();
      })
      
    
    }


    const verifyAdmin = async(req, res, next) =>{
      const email = req.decoded.email;
      const query = {email : email};
      const user = await usersCollection.findOne(query);
      const isAdmin = user?.role === "admin";
      if(!isAdmin){
        return res.status(403).send({message : 'forbidden access'});
      }
      next();
    }

    app.post('/jwt', async(req, res) =>{
      const user = req.body;
      
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn : '1h'
      })

      res.send({token});
    })


    app.post("/users", async(req, res) => {
      const user = req.body;

       // inser email is user doesnt exists;

      const query = {email : user.email}
      const existingUser = await usersCollection.findOne(query)

      if(existingUser){
        return res.send({message : "user already exists", insertedId : null})
      }


      const result = await usersCollection.insertOne(user);

    
      
      res.send(user)
    })

    app.get("/users",verifyToken, verifyAdmin, async(req, res) => {
      
      const users = await usersCollection.find().toArray();
      res.send(users);
    })

    app.get('/users/admin/:email', verifyToken, async(req, res) =>{
      const email = req.params.email;
      if(email != req.decoded.email){
        return res.status(403).send({message : 'Unauthorized Access'
        })      }

        const query = {email : email};

        const user = await usersCollection.findOne(query);
        let admin = false;
        if(user){
          admin = user?.role === "admin";
        }
        res.send({admin});

    } )

    app.delete("/users/:id", verifyToken, verifyAdmin, async(req, res) =>{
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await usersCollection.deleteOne(query);
      res.send(result);

    })

    app.patch('/users/admin/:id', verifyToken, verifyAdmin, async(req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          role: 'admin'
        }
      };
      const result = await usersCollection.updateOne(filter, updateDoc);
      res.send(result);
    })
  
  

    app.get('/pets', async (req, res) => {
      const searchBreed = req.query?.searchBreed;
      let query = {};

      if(searchBreed){
        query.breed = {
          $regex: searchBreed,
          $options: "i"
        }
      }

        const cursor = petsCollection.find(query);
        const pets = await cursor.toArray();
        res.send(pets);
    });

    app.post('/pets',verifyToken, verifyAdmin, async(req, res )=>{
      const pet = req.body;
      const result = await petsCollection.insertOne(pet);
      res.send(result);
    })

    app.get("/pets/:id", async(req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const pet = await petsCollection.findOne(query);
      res.send(pet);
  })



    app.get("/reviews", async(req, res) =>{
      const cursor = reviewsCollection.find();
      const reviews = await cursor.toArray();
      res.send(reviews);
    }
    )

    app.post("/reviews", upload.single('image'), async(req, res) => {
      try {
        if (!req.body.name || !req.body.reviewText) {
          return res.status(400).json({ success: false, message: "Missing required fields" });
        }
    
        const review = {
          name: req.body.name,
          role: req.body.role,
          adoptedPet: req.body.adoptedPet,
          rating: Number(req.body.rating),
          reviewText: req.body.reviewText,
          createdAt: new Date(),
          userImage : req.body.userImage
        };
    
        if (req.file) {
          const b64 = Buffer.from(req.file.buffer).toString("base64");
          let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
          const cloudinaryRes = await cloudinary.uploader.upload(dataURI, {
            folder: "pawsitive-placements/reviews",
            quality: "auto:good"
          });
          review.imageUrl = cloudinaryRes.secure_url;
        }
    
        const result = await reviewsCollection.insertOne(review);
        
        res.status(201).json({
          success: true,
          review: {
            ...review,
            _id: result.insertedId
          }
        });
      } catch (error) {
       
        res.status(500).json({
          success: false,
          message: "Internal server error",
          error: error.message
        });
      }
    });


    app.post("/application", async(req, res) =>{
      try {
        const newApplication = req.body;
        
        const result = await applicationCollection.insertOne(newApplication);
        res.send(result);
      } catch (error) {
        console.error("Error adding application:", error);
        res.status(500).send({ error: "Failed to add application" });
      }
    })

    app.get('/application', async(req, res)=>{
      const email = req.query.email;
      const query = {email: email};
     
      const result = await applicationCollection.find(query).toArray();

      for(const application of result){
          const petQuery = {_id: new ObjectId(application.petId)};
          const pet = await petsCollection.findOne(petQuery);
         if(pet){
         application.petName = pet.name;
         application.category = pet.category;
         application.location = pet.location;
         application.adoptionFee = pet.adoptionFee;
         application.image = pet.image;
         application.breed = pet.breed;
         }
      }
      
      res.send(result);
    })

    app.delete("/application/:id", async(req, res) =>{
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await applicationCollection.deleteOne(query);
      res.send(result);
    })

    app.post('/create-payment-intent', async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100);
      console.log(amount, 'amount inside the intent')

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        payment_method_types: ['card']
      });

      res.send({
        clientSecret: paymentIntent.client_secret
      })
    });

    app.post("/payments", async(req, res) => {
      const payment = req.body;
      const result = await paymentsCollection.insertOne(payment);
      res.send(result);
    })

    app.get("/payments/:email",verifyToken, async(req, res) => {
      const email = req.params.email;
      const query = {email: email};
      if(req.params.email !== req.decoded.email){
        return res.status(403).send({message : 'forbidden access'});
      }
      const result = await paymentsCollection.find(query).toArray();
      res.send(result);
    })


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


