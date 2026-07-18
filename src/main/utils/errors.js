export class AppError extends Error {
  constructor(message, code = 'APP_ERROR', status = 400, details = null) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

export function toAppError(error) {
  if (error instanceof AppError) {
    return error;
  }

  if (error && typeof error === 'object' && 'message' in error) {
    return new AppError(error.message, 'UNEXPECTED_ERROR', 500);
  }

  return new AppError('Unexpected error', 'UNEXPECTED_ERROR', 500);
}