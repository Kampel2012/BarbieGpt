import { INTERNAL_SERVER_ERROR_CODE } from '../utils/constants.js';

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = INTERNAL_SERVER_ERROR_CODE;
  }
}

export default InternalServerError;
