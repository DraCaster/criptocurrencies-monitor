import User from "../models/userModel";
import { hashPassword } from "../../commons/utils/passwordUtils";
import {fetchTopNCryptocurrencies, findCryptocurrencyByID} from "../../cryptocurrency/services/cryptocurrencyService";

/**
 * @description This function searches an user in the database by id or username
 * @param {ObjectID} userID
 * @param {String} username
 * @return {Promise}
 */
export const findUser = ({ userID = null, username = null }) => {
  return new Promise((resolve, reject) => {
    let query = {};

    if (userID) { query = { ...query, _id: userID }; }

    if (username) { query = { ...query, username }; }

    User.findOne(query).exec((error, doc) => {
      if (error) {
        reject(error);
      } else {
        resolve(doc);
      }
    });
  });
};

/**
 * @description This function creates a new user and saves it in the database
 * @param {String} name
 * @param {String} lastname
 * @param {String} username
 * @param {String} password
 * @param {String} preferredCurrency
 * @return {Promise}
 */
export const createUser = (name, lastname, username, password, preferredCurrency) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newUser = new User({
        name,
        lastname,
        username,
        password: hashPassword(password),
        preferredCurrency,
        favoriteCoins: []
      });

      const doc = await newUser.save();

      resolve(doc);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * @description Add a cryptocurrency as a user's favorite and save on date base.
 * @param {ObjectID} userID
 * @param {String} coin
 * @return {Promise<>}
 */
export const updateUserCoinList = (userID, coin) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await findUser({ userID });

      if (user.favoriteCoins.find(item => item.idProvider.toLowerCase() === coin.toLowerCase())) {
        reject("Coin already exists in the database");
      }else{

        const { id, name, symbol } = await findCryptocurrencyByID(coin);

        const newCoin = { idProvider: id, name, symbol };
        user.favoriteCoins.push(newCoin);
        user.save();
        resolve(user);

      }

    } catch (error) {
      reject(error);
    }
  });
};

/**
 *
 * @param {ObjectID} userID
 * @param {Number} top
 * @param {String} order
 * @return {Promise<>}
 */
export const fetchUserTopCoinList = ({ userID, top, order = null }) => {

  return new Promise(async (resolve, reject) => {
    try {

      const {preferredCurrency, favoriteCoins} = await findUser({ userID });

      if(favoriteCoins.length === 0)
        resolve({message: "User has no favorite coins"})

      let coinsID = getCoinsID(favoriteCoins)

      let items = await fetchTopNCryptocurrencies({preferredCurrency, top, coinsID, order})

      resolve(items)
    } catch (error) {

      reject(error);
    }
  });
};

/**
 * Returns a String with the IDs cryptocurrencies.
 * @param {Array<Object>} favoriteCoins
 * @return String
 */
const getCoinsID = favoriteCoins => {

  return favoriteCoins.map(({idProvider}) => {return (idProvider)}).join(",")

}
