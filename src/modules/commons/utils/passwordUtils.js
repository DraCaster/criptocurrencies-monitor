import bcryptjs from "bcryptjs";

/**
 * @description Receive a password and encrypt it
 * @param {String} password
 * @return {*}
 */
export const hashPassword = password => {
  if (!password) {
    throw new Error("password is required!");
  }

  if (!passwordValidate(password)) {
    throw new Error("password must contain at least eight alphanumeric characters");
  }

  const salt = bcryptjs.genSaltSync(10);

  return bcryptjs.hashSync(password, salt);
};

/**
 * @description Returns if the received passwords match
 * @param {String} requestPassword
 * @param {String} userPassword
 * @return {*}
 */
export const comparePassword = (requestPassword, userPassword) => {
  return bcryptjs.compareSync(requestPassword, userPassword);
};

/**
 * @description Check if the password meets at least eight alphanumeric characters
 * @param {String} password
 * @return {boolean}
 */
const passwordValidate = password => {
  const regex = /^[a-zA-Z0-9áéíóú]\S{7,}$/g;
  return regex.test(password);
};
