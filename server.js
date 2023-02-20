const express = require("express");
const app = express();
const PORT = 3005;
const morgan = require("morgan");
const UsersRouter = require("./routes/users.routes");
const CardsRouter = require("./routes/cards.routes");
const {connectDB} = require("./db");
require("dotenv").config();

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan("dev"));

app.use("/", UsersRouter);
app.use("/cards", CardsRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));