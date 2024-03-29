import * as contactsService from "../services/contactsServices.js";

import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const result = await contactsService.listContacts(
      { owner },
      {
        skip,
        limit,
      }
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { id } = req.params;
    const result = await contactsService.getContactById({ _id: id, owner });
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { id } = req.params;
    const result = await contactsService.removeContact({ _id: id, owner });
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const result = await contactsService.addContact({ ...req.body, owner });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { id } = req.params;
    const result = await contactsService.updatContactById(
      { _id: id, owner },
      req.body
    );
    if (!result) {
      throw HttpError(404);
    }
    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, "Body must have at least one field");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const result = await contactsService.updatContactByFavorite(
      { _id: id, owner },
      req.body
    );
    if (!result) {
      throw HttpError(404);
    }
    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, "Body must have at least one field");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};
