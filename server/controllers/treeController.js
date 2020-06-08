const Tree = require("../models/Tree");
const util = require("util");
const responseHandler = require("../utils/response-handler");
const config    = require('../config');
async function createRoot(req,res){
  let parent = req.body.parent ? req.body.parent : null;
  console.log(parent)

  const tree = new Tree({
    name: req.body.name,
    question:req.body.question
  });
  try {
    let newTree = await tree.save();
    buildAncestors(newTree._id, parent)
    //console.log(tree)
    res.status(201).send({ response: `Tree ${newTree._id}` });
  } catch (err) {
    res.status(500).send(err);
  }
}
const buildAncestors = async (id, parent_id) => {
    let ancest = [];
    try {
      let parent_category = await Tree.findOne({ "_id":parent_id },{ "name": 1, "slug": 1, "ancestors": 1,"question":1 }).exec();
      //console.log(parent_category)
    if( parent_category ) {
         const { _id, name, slug ,question} = parent_category;
         //console.log(_id,name,slug,question)
         const ancest = [...parent_category.ancestors];
         ancest.unshift({ _id, name, slug, question })
         //console.log(ancest);
         await Tree.findByIdAndUpdate(id, { $set: { 
           "ancestors": ancest,
           "parent":parent_id 
          } });
       }
    } catch (err) {
        console.log(err.message)
     }
}
async function displayTree(req,res){
  try {
    console.log(req.query.slug)
    const result = await Tree.find({ slug: req.query.slug })
      .select({
        "_id": true,
        "name": true,
        "ancestors._id":true,
        "ancestors.slug": true,
        "ancestors.name": true
      }).exec();
      console.log(result)
    res.status(201).send({ "status": "success", "result": result });
  } catch (err) {
    res.status(500).send(err);
  }
}
async function descendants(req,res){
  try {
    console.log(req.query.tree_id)
    const result = await Tree.find({ "ancestors._id":   req.query.tree_id })
     .select({ "_id": true, "name": true ,"expression":true})
     .exec();
     if(result.length !=0){
       console.log('1')
       res.status(201).send({ "status": "success", "result": result });
      }
     else{
        const rest=await Tree.find({_id:req.query.tree_id}).select({
          "expression":true
        }).exec();
        console.log(rest)
        res.status(200).send({"status":"success","result":rest})
     }
   } catch (err) {
     res.status(500).send(err);
   }
}
module.exports = {
    createRoot,
    displayTree,
    descendants
};


