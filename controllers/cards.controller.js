const {Card} = require("../models");
const { validateNewCard } = require("../validations/card.validations");
const {generateBizNumber} = require("../models");

const getCards = async (req, res) => {
    try {
        const cards = await Card.find({});
        res.status(200).send(cards); // Could return empty array
    } catch {
        res.status(400).send({error: "Failed getting cards"});   
    }
}

const getCard = async (req, res) => {
    try {
        const {id} = req.params;
        const card = await Card.findById(id);
        return res.status(200).send(card);
    } catch {
        res.status(400).send({error: "Failed getting card"});
    }
}

const addCard = async (req, res) => {
    console.log(req.user)
    try {
        const {error} = validateNewCard(req.body);

        if (error) return res.status(400).send({error: error.details[0].message});

        const {bizName, bizImage} = req.body;
        const newCard = await new Card({
            ...req.body,
            bizImage: bizImage || 'https://cdn-icons-png.flaticon.com/512/17/17004.png?w=826&t=st=1676906823~exp=1676907423~hmac=a8d3123708849b9bc7d8d37ce49531eb317207ba2cae080c91017bcc98c0a487',
            bizNumber: await generateBizNumber(),
            user_id: req.user._id
        }).save();

        return res.status(200).send(`Successfully added card '${bizName}'`);
    } catch (error) {
        console.log(error)
        res.status(400).send({error: "Failed creating card"});
    }
}

const updateCard = async (req, res) => {
    try {
        const id = req.params.id;
        await Card.findByIdAndUpdate(id , req.body);
        return res.status(200).send("Successfully updated card");
    } catch {
        res.status(400).send({error: "Failed updating card"});
    }
}

const deleteCard = async (req, res) => {
    try {
        const id = req.params.id;
        await Card.findByIdAndDelete(id);
        return res.status(200).send("Successfully deleted card");
    } catch {
        res.status(400).send({error: "Failed deleting card"});
    }
}

module.exports = {
    getCards,
    getCard,
    addCard,
    updateCard,
    deleteCard
};