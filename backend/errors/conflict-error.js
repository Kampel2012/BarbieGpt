import { CONFLICT_ERROR_CODE } from '../utils/constants.js';

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT_ERROR_CODE;
  }
}

export default ConflictError;
