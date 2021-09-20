import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

/**
 * @description This function generates a JWT
 * @param {ObjectID} id
 * @param {String} username
 * @return {{token: (*)}}
 */
export const getToken = (id, username) => {

  if (!process.env.JWT_SECRET) throw new Error("getToken process.env.JWT_SECRET is required!");

  if (!process.env.JWT_LOGIN_EXPIRED_IN) throw new Error("getToken process.env.JWT_LOGIN_EXPIRED_IN is required!");

  try {
    const payload = { id, username };

    const options = {
      expiresIn: process.env.JWT_LOGIN_EXPIRED_IN,
      jwtid: id.toString(),
      algorithm: "HS256"
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, options);

    return { token };
  } catch (error) {
    throw new Error(error);
  }
};
