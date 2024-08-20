const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors())

const corsOptions = {
  origin: ['http://localhost:5173'],
  credentials: true,
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

app.use(express.json());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://e-commerce:R456Z3qSxrbG8TGs@cluster0.begblt8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    const product_collection = client.db("e_commerce").collection("product_collection");

    app.get("/products", async(req, res)=>{
        const result = await product_collection.find().toArray( );
        res.send(result)
    })



    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send("Server is running")
})

app.listen(5000, () => {
    console.log("server is running on port 5000");
})