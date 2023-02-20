const express = require("express");
const CardsRouter = express.Router();
const {getCards, getCard, addCard, updateCard, deleteCard} = require("../controllers/cards.controller");
const auth_MW = require("../middlewares/auth");

CardsRouter.get("/all", auth_MW, getCards);

CardsRouter.get("/find/:id", auth_MW, getCard);

CardsRouter.post("/new", auth_MW, addCard);

CardsRouter.put("/update/:id", auth_MW, updateCard);

CardsRouter.delete("/delete/:id", auth_MW, deleteCard);

module.exports = CardsRouter;