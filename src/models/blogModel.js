const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const blogModel = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  author_id:{
    type: ObjectId,
    ref: "Author",
    required: true
  },
  tags:{
    type:[String],
    required:true
  },
    category: String,
  
  subcategory: {
    type: [String]
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  isPublished: {
    type: Boolean,
    default: false
  }
},{ timestamps: {createdAt: 'created_at', updatedAt: 'updated_at', deletedAt: 'deleted_at',publishedAt: 'published_at'} })

module.exports = mongoose.model('Problog',blogModel)