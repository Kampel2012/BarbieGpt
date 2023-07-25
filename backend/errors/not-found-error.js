import { NOT_FOUND_ERROR_CODE } from '../utils/constants.js';

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND_ERROR_CODE;
  }
}

export default NotFoundError;
