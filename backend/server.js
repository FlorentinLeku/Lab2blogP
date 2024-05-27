require("dotenv").config();
const express = require("express");
const prompt = require('prompt-sync');
const Post = require("./models/Post/Post");
const connectDB = require("./utils/connectDB");

connectDB();

const app = express();

const PORT = 5000;

app.use(express.json());

app.post('/api/v1/posts/create', async(req, res)=>{
    try{
        const postData = req.body;
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

app.listen(PORT, console.log(`Server is up and running on port ${PORT}`));
