import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers/handleMongooseError.js";
import Joi from "joi";

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarURL: { type: String },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false }
);

export const registerSSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const emailSchema = Joi.object({
  email: Joi.string().required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const subscriptionSchema = Joi.object({
  subscription: Joi.string().required(),
});

userSchema.post("save", handleMongooseError);

export const User = model("user", userSchema);
