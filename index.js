const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model');
const productRoute = require('./routes/product.route.js')
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/products", productRoute);





//Test response
app.get('/', (req, res) => {
    res.send("Hello from Node API Server");
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


