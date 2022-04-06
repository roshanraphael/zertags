const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotifSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    item: {
        type: Schema.Types.ObjectId,
        ref: "items"
    },
    latitude: {
        type: String
    },
    longitude: {
        type:String
    },
    message: {
        type: String
    },
    updated_at: { type: Date, default: Date.now }
})

module.exports = Notif = mongoose.model("notifs", NotifSchema);