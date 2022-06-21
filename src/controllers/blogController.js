const { response } = require('express');
const blogModel = require('../models/blogModel')

    const createBlog = async function(req,res){
        try{
            let newBlogEntry = req.body;
            if(!newBlogEntry.author_id){
               return res.status(404).send("Author id is required!");
            }
            let newBlog = await blogModel.create(newBlogEntry);
            return res.status(201).send({msg: newBlog});
           }
           catch(err){
           return res.status(500).send({Error:err.message})
           }
        }
    // ********************************************
    // const getblog= async function(req,res){
    //     if(!author_id)res.status(404).send("authors not found")
    //     try{
    //         let allblog= await blogModel.find().select({author_id:1,category:1,});
    //         res.status.send({msg: allblog})

    //     }
    //     catch(err){
    //         res.status(500).send({Error:err.message})
    //     }
    // }

    const getblog= async function(req,res){
        try{
            let allblog= await blogModel.find({isDeleted: false,isPublished: true});
            if(!allblog){
              return  res.status(404).send({msg:'No blog is found!!'})
            }
             return res.status(200).send({msg: allblog})
        }
        catch(err){
          return  res.status(500).send({Error:err.message})
        }
    }

module.exports.createBlog = createBlog;
module.exports.getblog=getblog
