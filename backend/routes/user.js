import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  getAllUsers,
  getUserById,
  getUserInfo,
} from '../controllers/user.js';

const router = Router();

router.get('/', getAllUsers);

router.get(
  '/me',
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().length(24).hex(),
    }),
  }),
  getUserInfo,
);

router.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().length(24).hex(),
    }),
  }),
  getUserById,
);

export default router;