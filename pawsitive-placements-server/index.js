const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 3000;
require("dotenv").config();

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


    // Send a ping to confirm a successful connection

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
        console.error("Review submission error:", error);
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


