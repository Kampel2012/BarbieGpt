import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { login, register } from '../controllers/user.js';
import auth from '../middlewares/auth.js';
import userRouter from './user.js';
import noteRouter from './note.js';
import chatRouter from './chat.js';
// import validationRegex from '../utils/constants.js';

const router = Router();

router.use(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

router.use(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  register,
);

router.use('/users', auth, userRouter);
router.use('/notes', auth, noteRouter);
router.use('/chats', auth, chatRouter);

export default router;