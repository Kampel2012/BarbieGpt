import { constants as http2Constants } from "node:http2";
import mongoose from "mongoose";
import Chat from "../models/chat.js";
import {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} from "../errors/index.js";

function errorHandler(error, res, next) {
  if (error instanceof mongoose.Error.ValidationError) {
    next(new BadRequestError("Неправильно заполнены поля"));
  }

  if (error instanceof mongoose.Error.DocumentNotFoundError) {
    next(new NotFoundError("Запрашиваемый чат не найден"));
  }

  if (error instanceof mongoose.Error.CastError) {
    next(new BadRequestError("Некорректный id"));
  }

  next(error);
}

export const getAllChats = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const allChats = await Chat.find({ owner: _id });
    res.status(http2Constants.HTTP_STATUS_OK).send(allChats);
  } catch (error) {
    errorHandler(error, res, next);
  }
};

export const getChatById = async (req, res, next) => {
  try {
    const chat = await Chat.findById(req.params.chatId);
    res.status(http2Constants.HTTP_STATUS_OK).send(chat);
  } catch (error) {
    errorHandler(error, res, next);
  }
};

export const updateChatHistory = async (req, res, next) => {
  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      req.params.chatId,
      { title: req.body.title, messages: req.body.messages },
      {
        new: true, // обработчик then получит на вход обновлённую запись
        runValidators: true, // данные будут валидированы перед изменением
      }
    ).orFail();
    res.status(http2Constants.HTTP_STATUS_OK).send(updatedChat);
  } catch (error) {
    errorHandler(error, res, next);
  }
};

export const addChat = async (req, res, next) => {
  try {
    const { title, mod = 1, messages = [] } = req.body;
    const { _id } = req.user;
    const chat = await Chat.create({ owner: _id, title, mod, messages });
    res.status(http2Constants.HTTP_STATUS_CREATED).send(chat);
  } catch (error) {
    errorHandler(error, res, next);
  }
};

export const deleteChatById = async (req, res, next) => {
  try {
    const chat = await Chat.findById(req.params.chatId)
      .populate(["owner"])
      .orFail();
    if (chat.owner._id.toString() !== req.user._id) {
      throw new ForbiddenError("Недостаточно прав для данного действия");
    }
    await Chat.deleteOne(chat).orFail();
    res
      .status(http2Constants.HTTP_STATUS_OK)
      .send({ message: "Успешно удалено!" });
  } catch (error) {
    errorHandler(error, res, next);
  }
};
