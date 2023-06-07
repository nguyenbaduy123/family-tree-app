require("dotenv").config();
const knex = require("../config/connection");
const { comparePassword } = require("../utils/passwordUtils");

const User = {
  getAllUsers: () => {
    return knex("users").select();
  },
  getUserById: (id) => {
    return knex("users").where("id", id).first();
  },
  createUser: (userData) => {
    return knex("users").insert(userData).returning("*");
  },
  login: async (email, password) => {
    const user = await knex("users").where("email", email).first();
    if (user) {
      const isMatch = await comparePassword(password, user.hash_password);
      if (isMatch) return user;
    }
    return null;
  },
};

module.exports = User;
