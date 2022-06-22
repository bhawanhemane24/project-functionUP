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
    
    const getblog= async function(req,res){
        try{
            const {author_id , category , tags , subcategory} = req.query
            console.log(author_id , category ,tags , subcategory)

            let allblog= await blogModel.find({isDeleted: false,isPublished: true});
            if(author_id)
            if(!allblog){
              return  res.status(404).send({msg:'No blog is found!!'})
            }
             return res.status(200).send({msg: allblog})
        }
        catch(err){
          return  res.status(500).send({Error:err.message})
        }
    }
// ************************************************************
    const updateBlog= async function(req,res){
        try{
            const blogId = req.params.blogId;
            const blogDocument = req.body;
            let isBlogIdExists = await blogModel.find({_id: blogId,isDeleted: false}).select({_id: 1});
            if(!isBlogIdExists){
                res.status(404).send('Blog Id is required!!')
            }
            const updateBlog = await blogModel.findByIdAndUpdate({_id: blogId}, blogDocument, {new: true} )
            res.status(200).send({msg: updateBlog})
            }
            catch(err){
                res.status(500).send({error: err.message})
            }
        }
    
module.exports.createBlog = createBlog;
module.exports.getblog=getblog
module.exports.updateBlog=updateBlog
