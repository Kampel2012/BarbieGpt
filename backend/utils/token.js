import jwt from 'jsonwebtoken';

const SECRET_KEY = '9b7ffcb7d93b826a3a90056cc476c55d';

export function generateToken(_id) {
  return jwt.sign({ _id }, SECRET_KEY, {
    expiresIn: '7d',
  });
}

export function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY);
}