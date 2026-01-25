import type { ReactNode } from "react";

export function CardGrid({ children }: { children: ReactNode }) {
  return (
    <div className="card-grid-container">
      <div className="card-grid">{children}</div>
    </div>
  );
}
