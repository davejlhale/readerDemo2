import type { AppErrorCode } from "./AppError";
import { BookNotFound } from "./AppErrorLayoutChildren/BookNotFound";
import { NetworkError } from "./AppErrorLayoutChildren/NetworkError";
import { SeriesIndexMissing } from "./AppErrorLayoutChildren/SeriesIndexMissing";
import { PageNotFound } from "./AppErrorLayoutChildren/PageNotFound";
export const errorViewMap: Record<AppErrorCode, React.ComponentType<any>> = {
  BOOK_NOT_FOUND: BookNotFound,
  NETWORK_ERROR: NetworkError,
  SERIES_LIST_MISSING: SeriesIndexMissing,
  NOT_FOUND: SeriesIndexMissing,
  MISSING_SERIES_ID: SeriesIndexMissing,
  PAGE_NOT_FOUND: PageNotFound,
};
