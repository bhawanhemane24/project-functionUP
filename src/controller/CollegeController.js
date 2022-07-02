const { find } = require('../Model/CollegeModel')
const CollegeModel = require('../Model/CollegeModel')
const InternModel = require('../Model/InternModel')

const colleges = async function (req, res) {
    try {
        const data = req.body
        const { name, fullName, logoLink } = data

        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "Fill all the college requirement" })

        if (!name) return res.status(400).send({ status: false, msg: "Name is required" })

        if (!fullName) return res.status(400).send({ status: false, msg: "Fullname is required" })

        if (!logoLink) return res.status(400).send({ status: false, msg: "Logo link is required" })

      if (!/(https?:\/\/.*\.(?:jpg|jpeg|png|gif))/i.test(logoLink))return res.status(400).send({ status: false, msg: "Please Enter valid Url" })
      
        const findName = await CollegeModel.findOne({name})
        if (findName) return res.status(400).send({ status: false, msg: "Existing college Name try different" })

        const createdData = await CollegeModel.create(data)
        return res.status(201).send({ status: true, data: createdData })
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }

}

const collegeDetails = async function (req, res) {
    try {
        const  name = req.query.collegeName
        if (!name) return res.status(400).send({ status: false, msg: "CollegeName is required" })

        const college = await CollegeModel.findOne({ name: name, isDeleted: false })
        if (!college) return res.status(404).send({ status: false, msg: "College not found" })

        const  collegeData = {
            name: college.name,
            fullName: college.fullName,
            logolink: college.logoLink
        }
        const interns = await InternModel.find({ collegeId: college._id, isDeleted: false }).select
            ({ createdAt: 0, updatedAt: 0, __v: 0, collegeId: 0 ,isDeleted: 0})
        if (interns.length > 0) {
            collegeData.interns = interns
        }
        res.status(200).send({ status: true, data: collegeData })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

module.exports.colleges = colleges
module.exports.collegeDetails = collegeDetails