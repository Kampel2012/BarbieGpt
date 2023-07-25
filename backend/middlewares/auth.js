import { verifyToken } from '../utils/token.js';
import { UnauthorizedError } from '../errors/index.js';

export default function auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = verifyToken(token);
  } catch (error) {
    console.log(error);
    throw new UnauthorizedError('Необходима авторизация');
  }

  req.user = payload;

  next();
}