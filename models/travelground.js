//DB Schema for posts defined
var mongoose = require("mongoose");
var travelgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description:String,
    author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
    comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ],
   created:{ type:Date, default:Date.now }

});
//DB Model
module.exports = mongoose.model("Travelground",travelgroundSchema);

