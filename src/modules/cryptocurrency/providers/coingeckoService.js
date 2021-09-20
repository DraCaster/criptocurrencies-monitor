import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const DEFAULT_ORDER_VALUE = "market_cap_desc"
const ORDER_VALUES_FOR_TOP_N = ["market_cap_asc","market_cap_desc"]
const ORDER_VALUES_FOR_FETCH_COINS = ["market_cap_asc", "market_cap_desc", "gecko_asc", "gecko_desc", "volume_asc", "volume_desc", "id_asc", "id_desc"];
const DEFAULT_CURRENCIES = "ARS,USD,EUR"

/**
 * Return all the cryptocurrencies data.
 * @param {String} currency
 * @param {Number} page
 * @param {Number} itemsPerPage
 * @param {String} order
 * @return {Promise<>}
 */
export const fetchMarketCryptocurrencies = ({ currency, page = 1, itemsPerPage = 10, order = null }) => {
  return new Promise((resolve, reject) => {

    if (!currency) { reject("currency is required!"); }

    if (!process.env.COINGECKO_URL) { reject("process.env.COINGECKO_URL is required!"); }

    const URL = process.env.COINGECKO_URL + "/coins/markets";

    const PARAMS = {
      vs_currency: currency,
      page: page,
      per_page: itemsPerPage,
      order: getOrder(order, ORDER_VALUES_FOR_FETCH_COINS, DEFAULT_ORDER_VALUE)
    };

    axios.get(URL, { params: PARAMS })
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
};

/**
 * Returns the data of a coin.
 * @param {String} idCoin
 * @return {Promise<>}
 */
export const findCryptocurrency = idCoin => {
  return new Promise((resolve, reject) => {
    if (!process.env.COINGECKO_URL) { reject("process.env.COINGECKO_URL is required!"); }

    const URL = process.env.COINGECKO_URL + "/coins/" + idCoin;

    axios.get(URL)
      .then(response => resolve(response.data))
      .catch(error => reject(error.response));
  });
};

/**
 *
 * @param {String} currency
 * @param {String} coinsID
 * @param {String} order
 * @return {Promise<>}
 */
export const fetchTopNMarketCryptocurrencies = ({currency, coinsID, order = null }) => {

  return new Promise((resolve,reject) => {

    if (!process.env.COINGECKO_URL) { reject("process.env.COINGECKO_URL is required!"); }

    const URL = process.env.COINGECKO_URL + "/coins/markets";

    const PARAMS = {
      vs_currency: currency,
      order: getOrder(order, ORDER_VALUES_FOR_TOP_N, DEFAULT_ORDER_VALUE),
      ids: coinsID
    }

    axios.get(URL, {params: PARAMS})
        .then(response => resolve(response.data))
        .catch(error => reject(error))
  })

}

/**
 * Returns the price on ARS, USD, EUR of the list of currenciesIDs.
 * @param {String} coinsID
 * @return {Promise<>}
 */
export const fetchCryptocurrenciesPrice = (coinsID) => {

  return new Promise((resolve, reject) => {

    if (!process.env.COINGECKO_URL) { reject("process.env.COINGECKO_URL is required!"); }

    const URL = process.env.COINGECKO_URL + "/simple/price";

    const PARAMS = {
      vs_currencies: DEFAULT_CURRENCIES,
      ids: coinsID
    };

    axios.get(URL, { params: PARAMS })
        .then(response => resolve(response.data))
        .catch(error => reject(error));
  })
}

/**
 * Checks if the order entered is valid.
 * Returns the same parameters or a default value.
 * @param {Array<String>} orderValuesList
 * @param {String} orderDefault
 * @param {String} order
 * @return {string}
 */
const getOrder = (order, orderValuesList, orderDefault) => {
  if (orderValuesList.includes(order))
    return order;
  else return orderDefault;
};


