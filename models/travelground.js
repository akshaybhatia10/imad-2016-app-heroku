//DB Schema for posts defined
var mongoose = require("mongoose");
var travelgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description:String,
    comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]

});
//DB Model
module.exports = mongoose.model("Travelground",travelgroundSchema);

