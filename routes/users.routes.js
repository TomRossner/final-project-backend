const express = require("express");
const UsersRouter = express.Router();
const {addUser, loginUser, updateUser, getUser} = require("../controllers/users.controller");
const auth_MW = require("../middlewares/auth");

UsersRouter.post("/auth/register", addUser);
UsersRouter.post("/auth/login", loginUser);
UsersRouter.put("/users/update/:id", auth_MW, updateUser);
UsersRouter.get("/users/:id", auth_MW, getUser);

module.exports = UsersRouter;