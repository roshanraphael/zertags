const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Item = {
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
}
// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  items: [Item],
  // items: [{
  //   type: Schema.Types.ObjectId,
  //   ref: "items"
  // }],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);
