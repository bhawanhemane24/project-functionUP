const AuthorModel= require("../models/authorModel")

const createAuthor= async function (req, res) {
    try{
        let author = req.body
        if (!author.fname || !author.lname || !author.tittle || !author.email || !author.password){
            return res.status(400).send({status: false,msg:'Mandatory Feilds required'})
        }
            //  if(!author.fname){
            //     return res.status(400).send({status: false,msg:'fname is required'})
            //  }
            //  if(!author.lname){
            //     return  res.status(400).send({status: false , msg : 'lname is required'})
            //  }
            //  if(!author.tittle){
            //     return res.status(400).send({status: false , msg : 'tittle is required'})
            //  }
            //  if(!author.email){
            //     return res.status(400).send({status: false ,msg : 'email is required'})
            //  }
            //  if(!author.password) {
            //     return  res.status(400).send({status: false, msg : 'password is required'})
            //  }
        
           let authorCreated = await AuthorModel.create(author)
           res.status(201).send({data: authorCreated})
           }
    catch(err) {
            res.status(500).send({msg : err.message})
    }
}

// const getAuthorsData= async function (req, res) {
//     let authors = await AuthorModel.find()
//     res.send({data: authors})
// }

module.exports.createAuthor= createAuthor
// module.exports.getAuthorsData= getAuthorsData
