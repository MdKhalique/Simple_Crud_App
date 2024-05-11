const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Updated Setup - Old Version Commented EOF

//Found server
app.get('/', (req, res) => {
    res.send("Hello from Node API Server");
});

//Get All Products
app.get('/api/products', async (req, res) => {

    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Get Specific Product by ID
app.get('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//Create Products
app.post('/api/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Update API/Product
app.put('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndUpdate(id, req.body);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        //Checking Again
        const updatedProduct = await Product.findById(id);
        res.status(200).json(product)

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Delete a Product
app.delete('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;

        //Saving it to check if it exists (if statement)
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product Delete Successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




//Checks Connection to DB then Server
mongoose.connect('mongodb+srv://mdjkhalique:kRzuXy9rjqxiZaaX@backenddb.vkw0zww.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB')
    .then(() => {
        console.log('Connected to database!');
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(() => {
        console.log("Connection failed!");
    });




//-------------------------------------------------------------------------------------------------------------------------------------
//Initial Setup
// app.listen(3000,() =>{
//     console.log('Server is running on port 3000');
// });

// app.get('/', (req,res) => {
//     res.send("Hello from Node API Server");
// });


// mongoose.connect('mongodb+srv://mdjkhalique:kRzuXy9rjqxiZaaX@backenddb.vkw0zww.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB')
// .then(()=>{
//     console.log('Connected to database!');
// })
// .catch(()=>{
//     console.log("Connection failed!");
// });
//-------------------------------------------------------------------------------------------------------------------------------------

