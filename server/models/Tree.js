const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const tree=require('tree-model');

const Schema = mongoose.Schema;

const TreeSchema = new mongoose.Schema({
  name: String,
  expression: {
    type:String,
    default:''
  },
  slug: { type: String, index: true },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    ref: 'Tree'
  },
  ancestors: [{
       _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Tree",
          index: true
  },
       name: String,
       expression: String,
       slug: String
  }]
  });

  TreeSchema.pre('save', async function (next) {
    this.slug = slugify(this.name);
    next();
 });
  function slugify(string) {
    const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
    const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')
  
    return string.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
  }
const Tree = mongoose.model('Tree', TreeSchema);

// Export the model
module.exports = Tree;
