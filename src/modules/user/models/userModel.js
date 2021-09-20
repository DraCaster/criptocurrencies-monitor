import mongoose from "mongoose";

const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is required!"],
    validate: {
      validator (value) {
        const regex = /^[a-zA-ZáâäãéêëíîïóôöõúûüūñçčšžÁÂÄÃĆÉÊËÍÎÏÓÔÖÕÚÛÜŪÑßÇ' .]+$/i;
        return regex.test(value);
      },
      message: "name must not contain numbers or symbols"
    }
  },
  lastname: {
    type: String,
    required: [true, "lastname is required!"],
    validate: {
      validator (value) {
        const regex = /^[a-zA-ZáâäãéêëíîïóôöõúûüūñçčšžÁÂÄÃĆÉÊËÍÎÏÓÔÖÕÚÛÜŪÑßÇ' .]+$/i;
        return regex.test(value);
      },
      message: "lastname must not contain numbers or symbols"
    }
  },
  username: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "username is required!"]
  },
  password: {
    type: String,
    required: [true, "password is required!"]
  },
  preferredCurrency: {
    type: String,
    enum: { values: ["ARS", "USD", "EUR"], message: "preferredCurrency must be ARG, USD or EUR" },
    required: [true, "preferredCurrency is required!"]
  },
  favoriteCoins: [{
    idProvider: { type: String },
    name: { type: String },
    symbol: { type: String }
  }]
});

userSchema.plugin(uniqueValidator);

const user = mongoose.model("user", userSchema);

module.exports = user;
