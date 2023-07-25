import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  getNotes,
  addNote,
  deleteNoteById,
} from '../controllers/note.js';

const router = Router();

router.get('/', getNotes);

router.post(
  '/',
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().length(24).hex(),
    }),
    body: Joi.object().keys({
      title: Joi.string().required(),
      date: Joi.string().required(),
      content: Joi.string().required()
    }),
  }),
  addNote,
);

router.delete(
  '/:noteId',
  celebrate({
    params: Joi.object().keys({
      noteId: Joi.string().length(24).hex(),
    }),
  }),
  deleteNoteById,
);

export default router;