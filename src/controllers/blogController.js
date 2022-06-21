const blogModel = require('../models/blogModel')

const createBlog = async function(req,res){
    try{
        let newBlogEntry = req.body;
        let newBlog = await blogModel.create(newBlogEntry);
        res.status(201).send({msg: newBlog});
       }
       catch(err){
        res.status(500).send({Error:err.message})
       }
    }
    


module.exports.createBlog = createBlog;