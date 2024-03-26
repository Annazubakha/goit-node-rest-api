import * as authService from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user.js";
dotenv.config();

const { SECRET_KEY } = process.env;

export const registerController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authService.findEmail({ email });

    if (user) {
      throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await authService.register({
      ...req.body,
      password: hashPassword,
    });

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authService.findEmail({ email });

    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password is wrong");
    }
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    user.token = token;
    await user.save();
    res.json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentController = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    res.json({
      email,
      subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const logOutController = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null });
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

export const UpdateSubcriptionController = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { subscription } = req.body;
    const result = await authService.updateSubscription(_id, { subscription });
    res.json(result);
  } catch (error) {
    next(error);
  }
};
