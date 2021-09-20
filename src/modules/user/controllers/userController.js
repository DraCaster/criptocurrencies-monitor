import {createUser, fetchUserTopCoinList, updateUserCoinList} from "../services/userService";

export const createUserAction = (req, res) => {

    const {name, lastname, username, password, preferredCurrency} = req.body;

    if (!name || !lastname || !username || !password || !preferredCurrency)
        return res.status(400).json({message: "Missing required parameters!"});

    createUser(name, lastname, username, password, preferredCurrency)
        .then(response => res.status(201).json(response))
        .catch(error => {
            if (error.name === "ValidationError")
                return res.status(400).json({message: error.message});
            else
                return res.status(500).json({message: "Server error - " + error});
        });
};

export const addCryptocurrencyToUserAction = (req, res) => {

    if (!req.user)
        return res.status(401).json({message: "Unauthorized user!"});

    const userID = req.user.id;

    const {coin} = req.body;

    if (!coin)
        return res.status(400).json({message: "Missing required coin parameter!"});

    updateUserCoinList(userID, coin)
        .then(response => res.status(201).json(response))
        .catch(error => {
            if (error.status === 404)
                return res.status(404).json({message: "Could not find coin with the given id"});
            else
                return res.status(500).json({message: "Server error - " + error});
        });
};

export const fetchUserTopCryptocurrenciesAction = (req, res) => {
    if (!req.user)
        return res.status(401).json({message: "Unauthorized user!"});

    let userID = req.user.id;

    const {top, order} = req.query;

    if (!top)
        return res.status(400).json({message: "top parameter is required!"});

    if (isNaN(top))
        return res.status(400).json({message: "top must be integer!"});

    if (top < 1 || top > 25)
        return res.status(400).json({message: "Top value must be between 1 and 25"});

    fetchUserTopCoinList({userID, top, order})
        .then(response => {return res.status(200).json(response)})
        .catch(error => {return res.status(500).json({message: "Server error - " + error})})
};
