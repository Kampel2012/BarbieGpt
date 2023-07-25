import { FORBIDDEN_ERROR_CODE } from '../utils/constants.js';

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN_ERROR_CODE;
  }
}

export default ForbiddenError;
