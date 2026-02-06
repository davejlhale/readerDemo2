/* =============
required to allow app router (<RouteRenderer />)
 to route to here and allow throwing AppError(404)
 ============== */

import type { FC } from "react";
import { AppError } from "../AppError";

export const ThrowPageNotFound: FC = () => {
  throw new AppError("PAGE_NOT_FOUND");
};
