const AuthorModel= require("../models/authorModel")

const createAuthor= async function (req, res) {
    try{
        let author = req.body
             if(!author.fname){
                res.status(400).send({msg : 'fname is required'})
             }
             if(!author.lname){
                res.status(400).send({msg : 'lname is required'})
             }
             if(!author.tittle){
                res.status(400).send({msg : 'tittle is required'})
             }
        
        else{
        let authorCreated = await AuthorModel.create(author)
        res.status(200).send({data: authorCreated})
    }
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
