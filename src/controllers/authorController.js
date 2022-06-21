const authorModel = require('../models/authorModel')

const createAuthors = async function(req , res) {
   try{
    let authorData = req.body ;
    let authorDatacreated = await authorModel.create(authorData)
    res.status(200).send({data : authorDatacreated})
   } 
   catch(err){
        res.status(500).send(err.message)
   }
   
}

module.exports.createAuthors = createAuthors