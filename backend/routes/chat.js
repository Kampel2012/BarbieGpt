import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  getAllChats,
  // getChatById,
  updateChatHistory,
  addChat,
  deleteChatById,
} from '../controllers/chat.js';

const router = Router();

router.get('/', getAllChats);

// router.get(
//   '/:chatId',
//   celebrate({
//     params: Joi.object().keys({
//       chatId: Joi.string().length(24).hex(),
//     }),
//   }),
//   getChatById,
// );

router.patch(
  '/:chatId',
  celebrate({
    params: Joi.object().keys({
      chatId: Joi.string().length(24).hex(),
    }),
    body: Joi.object().keys({
      title: Joi.string().required(),
      messages: Joi.array().required()
    }),
  }),
  updateChatHistory
)

router.post(
  '/',
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().length(24).hex(),
    }),
    body: Joi.object().keys({
      title: Joi.string().required(),
      messages: Joi.array()
    }),
  }),
  addChat,
);

router.delete(
  '/:chatId',
  celebrate({
    params: Joi.object().keys({
      chatId: Joi.string().length(24).hex(),
    }),
  }),
  deleteChatById,
);

export default router;