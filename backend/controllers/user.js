import { constants as http2Constants } from 'node:http2';
import validator from 'validator';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import { generateToken } from '../utils/token.js';
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from '../errors/index.js';

const SALT_ROUNDES = 10;

function errorHandler(error, res, next) {
  if (error instanceof mongoose.Error.ValidationError) {
    next(new BadRequestError('Неправильно заполнены поля'));
  }

  if (error instanceof mongoose.Error.DocumentNotFoundError) {
    next(new NotFoundError('Запрашиваемый пользователь не найден'));
  }

  if (error instanceof mongoose.Error.CastError) {
    next(new BadRequestError('Некорректный id'));
  }

  if (error.code === 11000) {
    next(new ConflictError('Пользователь с таким значением уже существует.'));
  }

  next(error);
}

export const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find({});
    res.status(http2Constants.HTTP_STATUS_OK).send(allUsers);
  } catch (error) {
    errorHandler(error, res, next);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId).orFail();
    res.status(http2Constants.HTTP_STATUS_OK).send(user);
  } catch (error) {
    errorHandler(error, res, next);
  }
};

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password || !validator.isEmail(email)) {
      throw new mongoose.Error.ValidationError();
    }

    const user = await User.findOne({ email })
      .select('+password')
      .orFail(() => {
        throw new UnauthorizedError('Неверный логин или пароль');
      });

    const compare = await bcrypt.compare(password, user.password);
    if (!compare) throw new UnauthorizedError('Неверный логин или пароль');

    const { _id } = user;
    const token = generateToken(_id);

    res
      .status(http2Constants.HTTP_STATUS_OK)
      .cookie('access_token', `Bearer ${token}`, {
        expires: new Date(Date.now() + 7 * 24 * 3600000),
        httpOnly: true,
      })
      .send({ jwt: token });
  } catch (error) {
    errorHandler(error, res, next);
  }
}

export async function register(req, res, next) {
  try {
    const newUser = req.body;
    if (
      !newUser.email
      || !newUser.password
      || !validator.isEmail(newUser.email)
      || (newUser.avatar && !validator.isURL(newUser.avatar))
    ) {
      throw new mongoose.Error.ValidationError();
    }

    newUser.password = await bcrypt.hash(newUser.password, SALT_ROUNDES);
    const user = await User.create(newUser);
    const {
      email, name, about, avatar,
    } = user;
    res.status(http2Constants.HTTP_STATUS_CREATED).send({
      email,
      name,
      about,
      avatar,
    });
  } catch (error) {
    errorHandler(error, res, next);
  }
}

export async function getUserInfo(req, res, next) {
  try {
    const user = await User.findById(req.user._id).orFail();
    res.status(http2Constants.HTTP_STATUS_OK).send(user);
  } catch (error) {
    errorHandler(error, res, next);
  }
}