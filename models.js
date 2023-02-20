const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

// User
const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    isBiz: {type: Boolean, default: false, required: true}
}, {collection: 'users'})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({
        _id: this._id,
        email: this.email,
        isBiz: this.isBiz
    }, process.env.JWT_SECRET);
    return token;
}


// Card
const cardSchema = new mongoose.Schema({
    bizName: {type: String, required: true},
    bizPhone: {type: String, required: true},
    bizAddress: {type: String, required: true},
    bizImage: {type: String},
    bizDescription: {type: String},
    bizNumber: {type: Number, min: 100, max: 999_999_999, unique: true},
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
}, {collection: 'cards'})

async function generateBizNumber() {
    while (true) {
        const randomNumber = _.random(100, 999_999_999);
        const alreadyUsed = await Card.findOne({bizNumber: randomNumber});

        if (!alreadyUsed) return randomNumber;
    }
}



const Card = mongoose.model("Card", cardSchema);
const User = mongoose.model("User", userSchema);

module.exports = {
    Card,
    User,
    generateBizNumber
}