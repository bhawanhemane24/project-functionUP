const AuthorModel= require("../models/authorModel")
var validator = require("email-validator");
const authorModel = require("../models/authorModel");
 const jwt = require("jsonwebtoken");

const createAuthor= async function (req, res) {
    try{
        let author = req.body
        if (!author.fname || !author.lname || !author.title || !author.email || !author.password){
            return res.status(400).send({status: false,msg:'Mandatory Feilds required'})
        }
       let isEmailValid = validator.validate(author.email);
        if(!isEmailValid){
         return res.status(400).send({status: false,msg: 'Please enter valid Id'})
        }
          
        let authorCreated = await AuthorModel.create(author)
          return res.status(201).send({data: authorCreated})
           }
    catch(err) {
           return res.status(500).send({msg : err.message})
    }
}

const login = async function (req,res){
    try{
        let userName = req.body.email;
        let password = req.body.password;
        let logIn = await authorModel.findOne({email: userName, password: password});
        if(!logIn)
        return res.status(400).send({
                           status: false,
                           msg: 'username and password is not correct'
        })
        //Generating Token
         const token = jwt.sign({
                       authorId: logIn._id.toString()
         },'SECRET-OF-GROUP28')
         res.setHeader('x-api-key', token);
          res.status(200).send({
                     status: true,
                     msg: 'You are Logged in!!'
         })
    }
 
  catch(err){
    res.status(500).send({status: false, msh: err.message})
  }
  //res.send()
}

module.exports.createAuthor= createAuthor
module.exports.login= login

