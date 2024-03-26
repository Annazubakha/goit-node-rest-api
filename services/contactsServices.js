import { Contact } from "../models/contact.js";

export const listContacts = async (filter, options) => {
  return Contact.find({ owner: filter.owner })
    .skip(options.skip)
    .limit(options.limit)
    .populate("owner", "email");
};

export const getContactById = async (contactId) => {
  return Contact.findById(contactId);
};

export const removeContact = async (contactId) => {
  return Contact.findByIdAndDelete(contactId);
};

export const addContact = async (body) => {
  return Contact.create(body);
};

export const updatContactById = async (id, body) => {
  return Contact.findByIdAndUpdate(id, body, { new: true });
};

export const updatContactByFavorite = async (id, body) => {
  return Contact.findByIdAndUpdate(id, body, { new: true });
};
