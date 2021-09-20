import { findUser } from "../../user/services/userService";
import { comparePassword } from "../../commons/utils/passwordUtils";
import { getToken } from "../../commons/utils/jwtUtils";

/**
 * @description Checks if the credentials are valid and if so, authenticates the user
 * @param {String} username
 * @param {String} password
 * @return {Promise<>}
 */
export const authUser = (username, password) => {
  return new Promise((resolve, reject) => {
    if (!username) { reject("username is required!"); }

    if (!password) { reject("password is required!"); }

    findUserForAuth(username, password)
      .then(token => {
        resolve(token);
      })
      .catch(error => {
        reject(error);
      });
  });
};

/**
 * @description Searches the user and compares the data with the credentials saved in the database
 * @param {String} username
 * @param {String} password
 * @return {Promise<>}
 */
const findUserForAuth = (username, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userDoc = await findUser({ username });

      if (userDoc && comparePassword(password, userDoc.password)) { resolve(getToken(userDoc._id, userDoc.username)); } else { reject("Bad credentials"); }
    } catch (error) {
      reject(error);
    }
  });
};
