const CollegeModel = require('../Model/CollegeModel')
const InternModel = require('../Model/InternModel')
const mongoose = require('mongoose')

const isValidEmail = function (value) {
  if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(value)) { return true }
  else return false
}
const isValidMobile = function (value) {
  if (/^(\+\d{1,3}[- ]?)?\d{10}$/.test(value)) { return true }
  else return false
}


const interns = async function (req, res) {
  try {
    const data = req.body
    const { name, email, mobile, collegeName } = data

    if (Object.keys(data).length === 0) return res.status(400).send({ status: false, msg: "Please fill the required" })

    if (!name) return res.status(400).send({ status: false, msg: "Name is required" })

    if (!email) return res.status(400).send({ status: false, msg: "Email is required" })

    if (!mobile) return res.status(400).send({ status: false, msg: "Mobile number is required" })

    if (!collegeName) return res.status(400).send({ status: false, msg: "CollegeName is required" })

    if (!isValidEmail(email)) return res.status(400).send({ status: false, msg: "Email is not valid" })

    if (!isValidMobile(mobile)) return res.status(400).send({ status: false, msg: "Mobile Number is not valid" })

    const findMobile = await InternModel.findOne({ mobile })
    if (findMobile) return res.status(409).send({ status: false, msg: "Existing Mobile NUmber" }) // 409 is for duplicate existing
    console.log(findMobile)   

    const findMail = await InternModel.findOne({ email })
    if (findMail) return res.status(409).send({ status: false, msg: "Existing Email" })
    console.log(findMail)

    const collegeDetails = await CollegeModel.findOne({ name: collegeName })
    if (!collegeDetails) return res.status(409).send({ status: false, msg: "college does not exist" })

    const collegeId = collegeDetails._id
    const condition = { name, email, mobile, collegeId }

    const internData = await InternModel.create(condition)
    res.status(201).send({ status: true, data: internData })
  } catch (error) {
    res.status(500).send({ msg: error.message })
  }  
}

module.exports.interns = interns