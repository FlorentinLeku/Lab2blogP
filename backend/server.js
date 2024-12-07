require("dotenv").config();
const express = require("express");
const prompt = require('prompt-sync');
const Post = require("./models/Post/Post");
const cors = require("cors");
const connectDB = require("./utils/connectDB");
//call the db
connectDB();

const app = express();
//! PORT
const PORT = 5000;
//Middlewares
app.use(express.json());
//cors middleware
const corsOptions ={
    origin: ["http://localhost:5173"],
    credentials: true,
};
app.use(cors(corsOptions));

//! Create post
app.post('/api/v1/posts/create', async(req, res)=>{
    try{
        const postData = req.body;
        console.log(req.body);
        const postCreated = await Post.create(postData);
        res.json({
            status: "success",
            message: "Post created successfully",
            postCreated,
        });
    }catch(error){
        console.log(error);
        res.json(error);
    }
});

//! List posts
app.get("/api/v1/posts", async (req, res) => {
    try{
        const posts = await Post.find();
        res.json({
            status: "success",
            message: "Post fetched successfully",
            posts,
        });
    }catch(error){
        res.json(error);
    }
});

app.listen(PORT, console.log(`Server is up and running on port ${PORT}`));
