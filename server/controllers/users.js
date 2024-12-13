const User = require("../models/User");

const getAllUsers = async (req, res, next) => {
    try {
        const usersCount = await User.count();
        const users = await User.findAll();

        res.status(200).json({
            count: usersCount,
            users
        })
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
};

module.exports = {
    getAllUsers,
}