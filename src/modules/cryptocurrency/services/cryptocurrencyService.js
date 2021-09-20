import {
    fetchCryptocurrenciesPrice,
    fetchMarketCryptocurrencies,
    fetchTopNMarketCryptocurrencies,
    findCryptocurrency
} from "../providers/coingeckoService";
import {findUser} from "../../user/services/userService";

/**
 *
 * @param {ObjectID} userID
 * @param {Number} page
 * @param {Number} itemsPerPage
 * @param {String} order
 * @return {Promise<>}
 */
export const fetchCryptocurrencies = ({userID, page = 1, itemsPerPage = 10, order = null}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const preferredCurrency = await getUserPreferredCurrency(userID);

            const items = await fetchMarketCryptocurrencies({currency: preferredCurrency, page, itemsPerPage, order});

            resolve(filterDataForResponse(items));
        } catch (error) {
            reject(error);
        }
    });
};

/**
 * @description Returns the user's preferred quote.
 * Consumed by the "fetchCryptocurrencies" service.
 * @param {ObjectID} userID
 * @return {Promise<>}
 */
const getUserPreferredCurrency = userID => {
    return new Promise((resolve, reject) => {
        findUser({userID})
            .then(doc => {
                resolve(doc.preferredCurrency);
            })
            .catch(error => {
                reject(error);
            });
    });
};

/**
 * @description Function used to filter the data.
 * Consumed by the "fetchCryptocurrencies" service.
 * @param {Array} items
 * @return {Array}
 */
const filterDataForResponse = items => {
    return items.map(({id, name, symbol, image, current_price, last_updated}) => {
        return ({id, name, symbol, image, current_price, last_updated});
    });
};

/**
 * @description Returns name of the coin to search
 * @param {String} idCoin
 * @return {Promise<>}
 */
export const findCryptocurrencyByID = idCoin => {
    return new Promise((resolve, reject) => {
        findCryptocurrency(idCoin)
            .then(response => {
                const {id, name, symbol} = response;
                resolve({id, name, symbol});
            })
            .catch(error => reject(error));
    });
};

/**
 *
 * @param preferredCurrency
 * @param top
 * @param coinsID
 * @param order
 * @return {Promise<>}
 */
export const fetchTopNCryptocurrencies = ({preferredCurrency, top, coinsID, order = null}) => {

    return new Promise(async (resolve, reject) => {

        try {

            const coinsData = await fetchTopNMarketCryptocurrencies({currency: preferredCurrency, coinsID, order})

            const coinsDataTopN = getTopN(coinsData, top)

            const coinsPrices = await fetchCryptocurrenciesPrice(coinsID)

            resolve(mergeDataForResponseTopN(coinsDataTopN, coinsPrices))

        } catch (error) {
            reject(error)
        }

    })
}

/**
 *
 * @param coinsData
 * @param top
 * @return {*}
 */
const getTopN = (coinsData, top) => {
    return coinsData.slice(0, top)
}

/**
 *
 * @param {Array} coinsDataTopN
 * @param {Array} coinsPrices
 * @return {Array}
 */
const mergeDataForResponseTopN = (coinsDataTopN, coinsPrices) => {

    return coinsDataTopN.map(({id, name, symbol, image, last_updated}) => ({
        id,
        name,
        symbol,
        image,
        last_updated,
        prices: coinsPrices[id],
    }))

}

