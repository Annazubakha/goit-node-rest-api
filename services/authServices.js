import { User } from "../models/user.js";

export const register = async (body) => {
  return User.create(body);
};

export const findEmail = (email) => User.findOne(email);

export const updateSubscription = (id, body) =>
  User.findByIdAndUpdate(id, body);
