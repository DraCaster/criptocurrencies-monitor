import { fetchCryptocurrencies } from "../services/cryptocurrencyService";

export const fetchCryptocurrenciesAction = (req, res) => {

  if (!req.user)
      return res.status(401).json({ message: "Unauthorized user!" });

  const userID = req.user.id;
  const { page, itemsPerPage, order } = req.query;

  if (isNaN(page))
      return res.status(400).json({ message: "page must be integer!" });
  if (isNaN(itemsPerPage))
      return res.status(400).json({ message: "itemsPerPage must be integer!" });
  if (itemsPerPage.page < 1 || itemsPerPage > 250)
      return res.status(400).json({ message: "itemsPerPage must be a number between 1 and 250" });

  fetchCryptocurrencies({ userID, page, itemsPerPage, order })
    .then(response => {return res.status(200).json(response)})
    .catch(error => {return res.status(500).json({ message: "Server error - " + error })});
};
