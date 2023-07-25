import { BAD_REQUEST_ERROR_CODE } from '../utils/constants.js';

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST_ERROR_CODE;
  }
}

export default BadRequestError;
