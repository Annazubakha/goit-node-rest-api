import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";

import { authenticate } from "../middlewares/authenticate.js";
import { isValidId } from "../helpers/isValidId.js";

import {
  createContactSchema,
  updateContactSchema,
  updateContactSchemaFavorite,
} from "../models/contact.js";

import validateBody from "../helpers/validateBody.js";

const contactsRouter = express.Router();
contactsRouter.use(authenticate);

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", isValidId, getOneContact);

contactsRouter.delete("/:id", isValidId, deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put(
  "/:id",
  isValidId,
  validateBody(updateContactSchema),
  updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  validateBody(updateContactSchemaFavorite),
  updateStatusContact
);
export default contactsRouter;
