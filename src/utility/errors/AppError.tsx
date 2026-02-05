export type AppErrorCode =
  | "NOT_FOUND"
  | "NETWORK_ERROR"
  | "MISSING_SERIES_ID"
  | "BOOK_NOT_FOUND"
  | "SERIES_LIST_MISSING";

export class AppError extends Error {
  code: AppErrorCode;
  meta?: Record<string, unknown>;

  constructor(code: AppErrorCode, meta?: Record<string, unknown>) {
    super(code);
    this.code = code;
    this.meta = meta;
  }
}
