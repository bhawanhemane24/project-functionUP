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
    
    const getBlog= async function(req,res){
        //if(!author_id)res.status(404).send("authors not found")
        try{
            // let allblog= await blogModel.find({isDeleted: false,isPublished: true});
            // if(!allblog){
            //     res.status(404).send({msg:'No blog is found!!'})
            // }
            let data = req.query;
            filter = {};
            // if(data.author_id!==null)
            // filter.author_id = data.author_id;
            if(data.category){
                filter.category = data.category;
                
            }
            if(data.author_id){
            filter.author_id = data.author_id;
        }
        if(data.tags){
            filter.tags = data.tags;
        }
        if(data.subcategory){
            filter.subcategory = data.subcategory;
        }
        if(data.author_id&&data.category){
            filter.author_id = data.author_id;
            filter.category = data.category;
        }
        if(data.author_id&&data.subcategory){
            filter.author_id = data.author_id;
            filter.subcategory = data.subcategory;
        }
        if(data.author_id&&data.tags){
            filter.author_id = data.author_id;
            filter.tags = data.tags;
        }
        if(data.category&&data.subcategory){
            filter.author_id = data.author_id;
            filter.tags = data.tags;
        }
        if(data.category&&data.tags){
            filter.author_id = data.author_id;
            filter.tags = data.tags;
        }
        if(data.tags&&data.subcategory){
            filter.author_id = data.author_id;
            filter.tags = data.tags;
        }
        if(data.author_id&&data.category&&data.tags&&data.subcategory){
            filter.author_id = data.author_id;
            filter.category = data.category;
            filter.tags = data.tags;
            filter.subcategory = data.subcategory;
        }
            let filteredBlog = await blogModel.find(filter)
            res.status(200).send({filteredBlog})
            if(!data.author_id||!data.category||!data.tags||!data.subcategory){
               return res.status(404).send("Data not found")
            }
            
           } 
           
            // if(_id === data.author_id){
            //     let allblog = await blogModel.findById(data.author_id);
            //     res.status(200).send({msg: allblog})
            // }
            // if(category === data.query.category){
            //     let allblog = await blogModel.find(data.query.category);
            //     res.status(200).send({msg: allblog})
            // }
            //res.status(200).send({msg: allblog})

        
        catch(err){
           return res.status(500).send({Error:err.message})
        }
    }

    const updateBlog= async function(req,res){
        try{
            const blogId = req.params.blogId;
            const blogDocument = req.body;
            let isBlogIdExists = await blogModel.findOne({$and:[{_id:blogId}, {isDeleted: false}]}).select({_id: 1});
            if(!isBlogIdExists){
               return res.status(404).send('Blog Id is required!!')
            }
            const updatedBlog = await blogModel.findByIdAndUpdate({_id: blogId}, blogDocument, {new: true} )
            if (!updatedBlog.isPublished) {
                let timeStamps = new Date(); //getting the current timeStamps
                let updateData = await blogModel.findOneAndUpdate(
                    { _id: blogId }, //finding the blogId in the database to update the publishedAt
                    { publishedAt: timeStamps }, //updating the publishedAt
                    { new: true } //returning the updated data
                )
                return res.status(200).send({ status: true, data: updateData });
            }
            //return res.status(200).send({msg: updateBlog})
            }
            catch(err){
                return res.status(500).send({error: err.message})
            }
        }

        const deleteBlog = async function(req,res){
            try{
          const blogId = req.params.blogId;
          const getblogId = await blogModel.findOne({$and:[{_id:blogId}, {isDeleted: false}]}).select({_id: 1});
          if(getblogId){
           let deletedBlog = await blogModel.findOneAndUpdate(
                                                {_id: getblogId},
                                                {$set: {isDeleted: true}},
                                                {new: true})
            return res.status(200).send({msg: deletedBlog})
          }
          return res.status(404).send({
            status: false,
            msg: "Blog not found"
            })
            }
            catch(err){
           return res.status(500).send({error: err.message})
            }
        }
     const deleteBlogsBySelection = async function(req,res){
        const document = req.query;
        let deleteBlog = await blogModel.updateMany({
                                        document,
                                        isDeleted: true,
                                        new: true
        })
        res.status(200).send({deleteBlog})
     }


module.exports.createBlog = createBlog;
module.exports.getBlog=getBlog
module.exports.updateBlog=updateBlog
module.exports.deleteBlog=deleteBlog
module.exports.deleteBlogsBySelection=deleteBlogsBySelection
