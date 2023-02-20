const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectDB = async () => {
    mongoose
        .connect(process.env.MONGO_URL)
        .then(() => console.log("Connected to MongoDB"))
        .catch(() => console.log("Couldn't connect to MongoDB"));
}

module.exports = {
    connectDB
}