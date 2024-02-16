const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({extended:false} ));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");


mongoose
.connect("mongodb+srv://manoharjunga:manoharjunga@cluster0.h2ecxyq.mongodb.net/",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=> {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.log("Error connecting to MongoDb", err);
});

app.listen(port, () => {
    console.log("Server is running on port 8000")
})



app.post("/register", async(req,res) => {
    try{

    } catch(error){
        console.log("error registering user", error);
        res.status(500).json({message:"Registration failed"})
    }
})