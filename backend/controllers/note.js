import { constants as http2Constants } from 'node:http2';
import mongoose from 'mongoose';
import Note from '../models/note.js';
import {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} from '../errors/index.js';

function errorHandler(error, res, next) {
  if (error instanceof mongoose.Error.ValidationError) {
    next(new BadRequestError('Неправильно заполнены поля'));
  }

  if (error instanceof mongoose.Error.DocumentNotFoundError) {
    next(new NotFoundError('Запрашиваемая заметка не найдена'));
  }

  if (error instanceof mongoose.Error.CastError) {
    next(new BadRequestError('Некорректный id'));
  }

  next(error);
}

export const getNotes = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const notes = await Note.find({ owner: _id }).populate(['owner']);
    res.status(http2Constants.HTTP_STATUS_OK).send(notes);
  } catch (error) {
    errorHandler(error, res, next);
  }
};

export const addNote = async (req, res, next) => {
  try {
    const { title, date, content } = req.body;
    const { _id } = req.user;
    const note = await Note.create({ owner: _id, title, date, content });
    res.status(http2Constants.HTTP_STATUS_CREATED).send(note);
  } catch (error) {
    errorHandler(error, res, next);
  }
};

export const deleteNoteById = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.noteId).populate(['owner']).orFail();
    console.log(note);
    if (note.owner._id.toString() !== req.user._id) {
      throw new ForbiddenError('Недостаточно прав для данного действия');
    }
    await Note.deleteOne(note).orFail();
    res
      .status(http2Constants.HTTP_STATUS_OK)
      .send({ message: 'Успешно удалено!' });
  } catch (error) {
    errorHandler(error, res, next);
  }
};
