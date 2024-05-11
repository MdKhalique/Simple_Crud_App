const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model');
const app = express();

app.use(express.json());

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

//Updated Setup - Check DB connection first then server should run
app.get('/', (req,res) => {
    res.send("Hello from Node API Server");
});


app.post('/api/products', async (req,res)=>{
   try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
   } catch (error) {
        res.status(500).json({message: error.message});
   }
});


mongoose.connect('mongodb+srv://mdjkhalique:kRzuXy9rjqxiZaaX@backenddb.vkw0zww.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB')
.then(()=>{
    console.log('Connected to database!');
    app.listen(3000,() =>{
        console.log('Server is running on port 3000');
    });
})
.catch(()=>{
    console.log("Connection failed!");
});