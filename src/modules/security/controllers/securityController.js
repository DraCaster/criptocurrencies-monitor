import { authUser } from "../services/securityService";

export const authAction = (req, res) => {

  const { username, password } = req.body;

  if (!username || !password)
      return res.status(400).json({ message: "username or password is missing!" });

  authUser(username, password)
    .then(response => {return res.status(200).json(response)})
    .catch(error => {
      if (error === "Bad credentials")
          return res.status(400).json({ message: "Invalid username or password" });
      else
          return  res.status(500).json({ message: "Server error " + error });
    });
};
