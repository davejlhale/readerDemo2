import type { AppErrorCode } from "./AppError";
import { BookNotFound } from "./BookNotFound";
import { NetworkError } from "./NetworkError";
import { SeriesIndexMissing } from "./SeriesIndexMissing";

export const errorViewMap: Record<AppErrorCode, React.ComponentType<any>> = {
  BOOK_NOT_FOUND: BookNotFound,
  NETWORK_ERROR: NetworkError,
  SERIES_LIST_MISSING: SeriesIndexMissing,
  NOT_FOUND: SeriesIndexMissing,
  MISSING_SERIES_ID: SeriesIndexMissing,
};
