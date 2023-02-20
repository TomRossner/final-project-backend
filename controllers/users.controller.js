const {User} = require("../models");
const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

async function addUser(req, res) {
    try {
        const {name, email, password, isBiz = false} = req.body;

        const alreadyRegistered = await User.findOne({email: email});
        if (alreadyRegistered) return res.status(400).send({error: "User already registered"});

        await new User({
            name,
            email,
            password: await hashPassword(password),
            isBiz
        }).save();

        return res.status(200).send(`Successfully added user '${name}'`);
    } catch {
        res.status(400).send({error: "Failed registering user"});
    }
}

async function loginUser(req, res) {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email: email});

        if (!user) return res.status(404).send({error: "User not found"});

        const isValidPassword = bcrypt.compare(password, user.password);

        if (!isValidPassword) return res.status(400).send({error: "Incorrect email or password"});
        
        const token = user.generateAuthToken();
        return res.status(200).send({token});
    } catch {
        res.status(400).send({error: "User authentication failed"});
    }
}

async function updateUser(req, res) {
    try {
        const {id} = req.params;
        const updatedUser = await User.findOneAndUpdate({_id: id}, req.body);
        console.log(updatedUser)
        return res.status(200).send(`Successfully updated user ${updatedUser.name}`);
    } catch {
        res.status(400).send({error: "Failed updating user"});
    }
}

async function getUser(req, res) {
    try {
        const {id} = req.params;
        const user = await User.findById(id);

        if (!user) return res.status(404).send({error: "User not found"});

        return res.status(200).send(user);
    } catch (error) {
        res.status(400).send({error: "Failed getting user"});
    }
}

module.exports = {
    addUser,
    loginUser,
    updateUser,
    getUser
};